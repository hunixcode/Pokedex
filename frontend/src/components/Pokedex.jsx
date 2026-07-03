import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import './Pokedex.css';

export function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);

    const types = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    useEffect(() => {
        fetchPokemons();
    }, []);

    useEffect(() => {
        filterPokemons();
    }, [searchTerm, selectedTypes, pokemons]);

    const fetchPokemons = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemon`);
            const data = await response.json();
            setPokemons(data.data);
            setFilteredPokemons(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            setLoading(false);
        }
    };

    const filterPokemons = () => {
        let filtered = pokemons;

        if (searchTerm) {
            filtered = filtered.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedTypes.length > 0) {
            filtered = filtered.filter(pokemon =>
                selectedTypes.every(type => pokemon.types.includes(type))
            );
        }

        setFilteredPokemons(filtered);
    };

    const handleTypeSelect = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const removeType = (type) => {
        setSelectedTypes(selectedTypes.filter(t => t !== type));
    };

    return (
        <div className="pokedex-page">
            <Navbar activePage="pokedex" />
            
            <div className="pokedex-container">
                <div className="pokedex-header">
                    <div className="search-bar">
                        <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Recherchez un pokemon..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button 
                            className="filter-button"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 4.5H21M3 9.5H21M3 14.5H21M3 19.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    {showFilter && (
                        <div className="filter-dropdown">
                            <div className="filter-types">
                                {types.map(type => (
                                    <button
                                        key={type}
                                        className={`filter-type-btn ${selectedTypes.includes(type) ? 'active' : ''} type-${type}`}
                                        onClick={() => handleTypeSelect(type)}
                                    >
                                        {type.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedTypes.length > 0 && (
                        <div className="active-filters">
                            <span className="active-filters-label">Filtres actifs:</span>
                            <div className="active-filters-list">
                                {selectedTypes.map(type => (
                                    <button
                                        key={type}
                                        className={`active-filter-badge type-${type}`}
                                        onClick={() => removeType(type)}
                                    >
                                        {type}
                                        <span className="remove-icon">×</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pokedex-results">
                    <div className="results-count">{filteredPokemons.length} results</div>
                    
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : (
                        <div className="pokedex-grid">
                            {filteredPokemons.map(pokemon => (
                                <div key={pokemon.id} className="pokedex-card">
                                    <div className="pokemon-image-container">
                                        <img 
                                            src={pokemon.sprite} 
                                            alt={pokemon.name}
                                            className="pokemon-image"
                                        />
                                    </div>
                                    <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
                                    <div className="pokemon-type">
                                        {pokemon.types.map((type, index) => (
                                            <span key={index} className={`type-badge type-${type}`}>
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="know-more-btn">KNOW MORE</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
