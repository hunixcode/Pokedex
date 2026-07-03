import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export function Navbar({ activePage = 'home' }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const result = await response.json();
                setUser(result.data);
            }
        } catch (error) {
            console.error('Error checking auth:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null);
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/kyogre-logo.png" alt="Pokedex Logo" />
                </div>
                <ul className="navbar-menu">
                    <li><a href="/" className={`navbar-link ${activePage === 'home' ? 'active' : ''}`}>Home</a></li>
                    <li><a href="/pokedex" className={`navbar-link ${activePage === 'pokedex' ? 'active' : ''}`}>Pokedex</a></li>
                    <li><a href="/about" className={`navbar-link ${activePage === 'about' ? 'active' : ''}`}>About</a></li>
                </ul>
                {!isLoading && (
                    user ? (
                        <div className="navbar-user-section">
                            <div className="navbar-profile" onClick={() => navigate('/profile')}>
                                <img 
                                    src={user.profilePhoto} 
                                    alt="Profile" 
                                    className="navbar-profile-img"
                                    onError={(e) => {
                                        e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
                                    }}
                                />
                            </div>
                            <button className="navbar-logout" onClick={handleLogout} title="Logout">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="logout-icon">
                                    <path d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"/>
                                    <path d="M16.174 12l-4.95 4.95l-.707-.707L14.76 12l-4.242-4.243l.707-.707L16.174 12z"/>
                                    <path d="M16 11.5h-7v1h7v-1z"/>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <button className={`navbar-signin ${activePage === 'auth' ? 'active' : ''}`} onClick={() => navigate('/auth')}>Sign In</button>
                    )
                )}
            </div>
        </nav>
    );
}
