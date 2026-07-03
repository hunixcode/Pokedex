import { useState, useEffect } from 'react';
import './FeaturedSection.css';

export function FeaturedSection() {
    const [featuredPokemons, setFeaturedPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedPokemons = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/monthlySelection/active`);
                const data = await response.json();
                
                if (data.data && data.data.featured_pokemons) {
                    const pokemonPromises = data.data.featured_pokemons.map(id => 
                        fetch(`${import.meta.env.VITE_API_URL}/api/pokemon/${id}`)
                            .then(res => res.json())
                            .then(result => result.data)
                    );
                    
                    const pokemonData = await Promise.all(pokemonPromises);
                    const pokemonsWithPosition = pokemonData.map((pokemon, index) => ({
                        ...pokemon,
                        imagePosition: index % 2 === 0 ? 'left' : 'right'
                    }));
                    
                    setFeaturedPokemons(pokemonsWithPosition);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured Pokemon:', error);
                setLoading(false);
            }
        };

        fetchFeaturedPokemons();
    }, []);

    if (loading) {
        return (
            <section className="featured-section">
                <h2 className="featured-title">THIS MONTH'S SELECTION</h2>
                <div className="featured-loading">Loading...</div>
            </section>
        );
    }

    return (
        <section className="featured-section">
            <h2 className="featured-title">THIS MONTH'S SELECTION</h2>
            <div className="featured-list">
                {featuredPokemons.map((pokemon, index) => (
                    <div 
                        key={pokemon.id} 
                        className={`featured-card ${pokemon.imagePosition === 'right' ? 'reverse' : ''}`}
                    >
                        <div className="featured-image">
                            <img src={pokemon.sprite} alt={pokemon.name} />
                        </div>
                        <div className="featured-info">
                            <h3 className="featured-name">{pokemon.name?.toUpperCase()}</h3>
                            <div className="featured-types">
                                {pokemon.types?.map((type, idx) => (
                                    <span key={idx} className={`type-badge type-${type}`}>
                                        {type?.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                            <p className="featured-description">
                                Height: {pokemon.height / 10}m • Weight: {pokemon.weight / 10}kg
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
