import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig'


const AuthHeader = ({ title }) => (
  <div className="py-3 hero-header modern-hero">
    <div className="container my-5 py-5 px-lg-5">
      <div className="row g-5">
        <div className="col-lg-12 text-center">
          <h1 className="display-4 text-white animated slideInDown">{title}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center animated slideInDown mb-4">
              <li className="breadcrumb-item">
                <Link className="text-white" to="/">Home</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">{title}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
);

function AuthPage({ defaultView = 'login' }) {
  const [isLoginView, setIsLoginView] = useState(defaultView === 'login');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLoginView) {
      try {
        const response = await apiClient.post('http://127.0.0.1:8000/api/token/', { username, password });
        
        const token = response.data.access; 
        
        if (token) {
          login(token);
          navigate('/');
        } else {
          setError('Token error.');
        }

      } catch (err) {
        setError('Username or password is incorrect.');
        console.error('Login error:', err);
      }
    } else {
      try {
        await apiClient.post('http://127.0.0.1:8000/api/register/', { username, email, password });
        alert('Account created successfully! Please log in.');
        setIsLoginView(true);
      } catch (err) {
        setError('Error creating account. Please try again.');
        console.error('Error: ', err);
      }
    }
  };

  const toggleView = (e) => {
    e.preventDefault();
    setIsLoginView(!isLoginView);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-white p-0">
      <div className="position-relative p-0">
        <Navbar />
        <AuthHeader title={isLoginView ? 'Login' : 'Sign Up'} />
      </div>

      <div className="py-5">
        <div className="container px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="auth-card wow fadeInUp" data-wow-delay="0.1s">
                <h1 className="text-center mb-4">{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                  {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="username">Username</label>
                    </div>
                {!isLoginView && (
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                )}
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <button className="btn btn-dark w-100 py-3 mt-3" type="submit">
                    {isLoginView ? 'Login' : 'Create Account'}
                  </button>
                </form>

                <div className="auth-toggle-link text-center mt-4">
                  {isLoginView ? (
                    <p>Don't have an account? <a href="#" onClick={toggleView}>Sign Up</a></p>
                  ) : (
                    <p>Already have an account? <a href="#" onClick={toggleView}>Login</a></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AuthPage;