import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import waterBackground from '../assets/water-background.mp4';
import { Navbar } from './Navbar';

export function Auth(){
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isSignIn ? '/api/users/login' : '/api/users/register';
            const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                if (isSignIn) {
                    navigate('/profile');
                } else {
                    setIsSignIn(true);
                    setPassword('');
                    setError('');
                }
            } else {
                setError(data.data || 'An error occurred');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return(
        <section className="auth-container">

            <div className="navbar-transparent">
                <Navbar activePage="auth" />
            </div>
            
            <video 
                className="auth-background-video" 
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src={waterBackground} type="video/mp4" />
            </video>

            <div className="auth-form-wrapper">
                <img 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png" 
                    alt="Starmie" 
                    className="auth-decoration starmie"
                />
                <h1 className="auth-title">{isSignIn ? 'LOG IN' : 'SIGN UP'}</h1>
                
                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">username :</label>
                        <input 
                            type="text" 
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">password :</label>
                        <input 
                            type="password" 
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {isSignIn ? (
                        <span className="form-link">forgot password ?</span>
                    ) : (
                        <p className="form-terms">
                            by creating an account, you clearly confirm your consent to the <a href="/terms">terms & conditions</a>
                        </p>
                    )}

                    <button type="submit" className="auth-button">
                        {isSignIn ? 'LOG IN' : 'SIGN UP'}
                    </button>
                </form>

                <div className="auth-toggle">
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}
                    <span 
                        className="auth-toggle-link" 
                        onClick={() => {
                            setIsSignIn(!isSignIn);
                            setError('');
                            setUsername('');
                            setPassword('');
                        }}
                    >
                        {isSignIn ? 'Sign Up' : 'Sign In'}
                    </span>
                </div>

                <img 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" 
                    alt="Great Ball" 
                    className="auth-decoration pokeball"
                    style={{ width: '100px' }}
                />
            </div>
        </section>
    )
}