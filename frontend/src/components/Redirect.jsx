import { useNavigate } from 'react-router-dom';
import './Redirect.css';

export function Redirect(){
    const navigate = useNavigate();
    
    const handleAccessPokedex = () => {
        navigate('/pokedex');
    };

    const stars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`
    }));

    return (
        <section className="redirect-section">
            <div className="redirect-stars">
                {stars.map(star => (
                    <div 
                        key={star.id} 
                        className="star" 
                        style={{ 
                            top: star.top, 
                            left: star.left,
                            animationDelay: star.delay 
                        }}
                    />
                ))}
            </div>

            <img 
                src="/magikarp.png" 
                alt="Magikarp" 
                className="redirect-pokemon left"
            />

            <div className="redirect-content">
                <button className="redirect-button" onClick={handleAccessPokedex}>
                    ACCESS POKEDEX
                </button>
            </div>

            <img 
                src="/leviathor-shiny.png" 
                alt="Gyarados" 
                className="redirect-pokemon right"
            />
        </section>
    );
}