import { Navbar } from './Navbar';
import './About.css';

export function About() {
    return (
        <div className="about-page">
            <Navbar activePage="about" />
            
            <div className="about-container">
                <section className="about-hero">
                    <h1 className="about-title">ABOUT POKEDEX</h1>
                    <p className="about-subtitle">
                        Redécouvrez les origines de Pokémon avec notre Pokédex complet des 151 premiers Pokémon
                    </p>
                </section>

                <section className="about-content">
                    <div className="about-card">
                        <h2 className="card-title">Notre Mission</h2>
                        <p className="card-text">
                            Ce projet permet aux utilisateurs de revoir les origines de Pokémon, 
                            en ayant accès à toutes les informations pour pouvoir se rappeler de bons souvenirs, 
                            ou pour les nouveaux, de découvrir le monde des Pokémon de la première génération.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2 className="card-title">Pokédex Complet</h2>
                        <p className="card-text">
                            Explorez les 151 premiers Pokémon avec des informations détaillées incluant 
                            les types, statistiques, taille, poids et bien plus encore. Utilisez nos filtres 
                            avancés pour trouver exactement ce que vous cherchez.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2 className="card-title">Thème Mensuel</h2>
                        <p className="card-text">
                            Chaque mois, découvrez une nouvelle sélection de Pokémon mise en avant avec 
                            un thème différent. Ce mois-ci, plongez dans l'univers aquatique avec Kyogre 
                            et les Pokémon de type Eau.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2 className="card-title">Système de Combat</h2>
                        <p className="card-text">
                            Prochainement : Créez votre équipe de 6 Pokémon et affrontez d'autres dresseurs 
                            ou des bots dans des combats stratégiques. Suivez vos victoires et défaites 
                            dans votre historique personnel.
                        </p>
                    </div>
                </section>

                <section className="about-tech">
                    <h2 className="tech-title">Technologies Utilisées</h2>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React</li>
                                <li>Vite</li>
                                <li>React Router</li>
                            </ul>
                        </div>
                        <div className="tech-item">
                            <h3>Backend</h3>
                            <ul>
                                <li>Node.js</li>
                                <li>Express</li>
                                <li>MongoDB</li>
                                <li>Passport.js</li>
                            </ul>
                        </div>
                        <div className="tech-item">
                            <h3>API</h3>
                            <ul>
                                <li>PokéAPI</li>
                                <li>RESTful API</li>
                            </ul>
                        </div>
                        <div className="tech-item">
                            <h3>DevOps</h3>
                            <ul>
                                <li>Docker</li>
                                <li>Docker Compose</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="about-footer">
                    <p className="footer-text">
                        Fait par <a href="https://github.com/hunixcode" target="_blank" rel="noopener noreferrer">hunixcode</a>
                    </p>
                    <p className="footer-disclaimer">
                        Pokémon et tous les personnages associés sont des marques déposées de Nintendo, 
                        Game Freakpassiont Creatures. Ce site est un projet éducatif non commercial.
                    </p>
                    <a href="/terms" className='terms'>Terms & Conditions</a>
                </section>
            </div>
        </div>
    );
}
