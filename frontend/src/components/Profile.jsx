import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import './Profile.css';
import waterBackground from '../assets/medusa-bg.mp4';

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showPokemonSelector, setShowPokemonSelector] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        fetchProfile();
        fetchPokemon();
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/profile', {
                credentials: 'include'
            });
            const result = await response.json();
            if (response.ok) {
                setUser(result.data);
                setEditedUsername(result.data.username);
            } else {
                navigate('/auth');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            navigate('/auth');
        }
    };

    const fetchPokemon = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pokemon');
            const result = await response.json();
            if (response.ok) {
                setPokemonList(result.data);
            }
        } catch (error) {
            console.error('Error fetching pokemon:', error);
        }
    };

    const handleSave = async () => {
        try {
            setError('');
            const updateData = {};
            
            if (editedUsername !== user.username) {
                updateData.username = editedUsername;
            }
            
            if (selectedPokemon) {
                updateData.profilePhoto = selectedPokemon.sprite;
            }

            const response = await fetch('http://localhost:3000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updateData)
            });
            const result = await response.json();
            if (response.ok) {
                setUser(result.data);
                setEditedUsername(result.data.username);
                setIsEditing(false);
                setShowPokemonSelector(false);
                setSelectedPokemon(null);
            } else {
                setError(result.data || 'Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <video 
                    ref={videoRef}
                    className="profile-bg-video" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={waterBackground} type="video/mp4" />
                </video>
                <div className="profile-card">
                    <div className="profile-left">
                        <div 
                            className="avatar-container"
                            onClick={() => setShowPokemonSelector(!showPokemonSelector)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={selectedPokemon ? selectedPokemon.sprite : user.profilePhoto} 
                                alt="Profile" 
                                className="avatar"
                                onError={(e) => {
                                    e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
                                }}
                            />
                        </div>
                        {showPokemonSelector && (
                            <>
                                <div 
                                    className="pokemon-selector-overlay"
                                    onClick={() => setShowPokemonSelector(false)}
                                />
                                <div className="pokemon-selector">
                                    <h3>Choose your Pokémon</h3>
                                    <div className="pokemon-grid">
                                        {pokemonList.map(pokemon => (
                                            <div 
                                                key={pokemon.id}
                                                className={`pokemon-option ${selectedPokemon?.id === pokemon.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedPokemon(pokemon)}
                                            >
                                                <img src={pokemon.sprite} alt={pokemon.name} />
                                                <span>{pokemon.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {isEditing ? (
                            <input 
                                type="text"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)}
                                className="username-input"
                            />
                        ) : (
                            <h2 className="username">{user.username}</h2>
                        )}
                        {error && <div className="error-message">{error}</div>}
                        <button 
                            className="edit-button"
                            onClick={() => {
                                if (isEditing) {
                                    setIsEditing(false);
                                    setEditedUsername(user.username);
                                    setSelectedPokemon(null);
                                    setShowPokemonSelector(false);
                                    setError('');
                                } else {
                                    setIsEditing(true);
                                }
                            }}
                        >
                            {isEditing ? 'cancel' : 'edit'}
                        </button>
                        {isEditing && (
                            <button className="save-button-left" onClick={handleSave}>
                                Save
                            </button>
                        )}
                    </div>

                    <div className="profile-right">
                        <h2 className="stats-title">STATS</h2>
                        
                        <div className="stat-item">
                            <label className="stat-label">win rate %</label>
                            <div className="stat-value">{user.winRate}%</div>
                        </div>

                        <div className="stat-item">
                            <label className="stat-label">total games played</label>
                            <div className="stat-value">{user.totalGames}</div>
                        </div>

                        <div className="stat-item">
                            <label className="stat-label">favorite type</label>
                            <div className="stat-value">{user.favoriteType}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
