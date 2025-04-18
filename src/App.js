import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/SignupPage';
import AuthCallback from './AuthCallback';
import SignupOptions from './Pages/SignupOptions';
import LoginPage from './Pages/LoginPage' ;
import ChatBotPage from './Pages/ChatBotPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBotPage />} />
        {/* <Route path="/" element={<SignupOptions />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>                 
    </Router>                   
  );
}

export default App;