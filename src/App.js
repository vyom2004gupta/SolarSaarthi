import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './SignupPage';
import AuthCallback from './AuthCallback';
import SignupOptions from './SignupOptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupOptions />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
