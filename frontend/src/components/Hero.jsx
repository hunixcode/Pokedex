import { useEffect, useRef } from 'react';
import './Hero.css';
import waterBackground from '../assets/landing-page.mp4';

export function Hero() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    return (
        <section className="hero">
            <div className="hero-background">
                <video 
                    ref={videoRef}
                    className="hero-bg-video" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={waterBackground} type="video/mp4" />
                </video>
                <img src="/kyogre-bg.png" alt="" className="hero-bg-image" />
            </div>
            <div className="hero-content">
                <h1 className="hero-title">
                    WELCOME TO THE<br />
                    POKE<span className="pokedex">DEX</span>
                </h1>
                <button className="hero-button">FEATURED POKEMONS</button>
            </div>
        </section>
    );
}
