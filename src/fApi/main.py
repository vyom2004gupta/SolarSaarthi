from fastapi import FastAPI, Header, HTTPException, Depends # type: ignore
from pydantic import BaseModel # type: ignore
from typing import Optional
import os
from dotenv import load_dotenv # type: ignore
import jwt  # type: ignore # PyJWT
import psycopg2 # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from jose import jwt, jwk # type: ignore
from jose.utils import base64url_decode # type: ignore

app = FastAPI()

# ✅ CORS middleware is correctly added here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
DATABASE_URL = os.getenv("DATABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

print("SUPABASE_JWT_SECRET:", SUPABASE_JWT_SECRET)
print("DATABASE_URL:", DATABASE_URL)
print("SUPABASE_ANON_KEY:", SUPABASE_ANON_KEY)


JWKS_URL = "http://hzrljopjhghhabwohmop.supabase.co/auth/v1/.well-known/jwks.json"


class UserProfile(BaseModel):
    firstName: str
    lastName: str
    mobileNumber: str
    password: str


def get_current_user(authorization: Optional[str] = Header(None)):
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",  # or whatever your Supabase token's aud is
        )

        print("Decoded token payload:", payload)

        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        return user_id

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")





@app.post("/api/save-user")
def save_user(profile: UserProfile, user_id: str = Depends(get_current_user)):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO profiles (id, first_name, last_name, number, password)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name,
                number = EXCLUDED.number,
                password = EXCLUDED.number;
        """, (user_id, profile.firstName, profile.lastName, profile.mobileNumber,profile.password))

        conn.commit()
        cursor.close()
        conn.close()

        return {"message": "User saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")