import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';


function App() {
    return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:slug" element={<CompanyProfilePage />} />
        <Route path="/login" element={<AuthPage defaultView="login" />} />
        <Route path="/signup" element={<AuthPage defaultView="signup" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;