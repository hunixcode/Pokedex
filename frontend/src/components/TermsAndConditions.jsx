import { Navbar } from './Navbar';
import './TermsAndConditions.css';

export function TermsAndConditions() {
    return (
        <>
            <Navbar activePage="terms" />
            <div className="terms-container">
                <div className="terms-content">
                    <h1 className="terms-title">Termes et Conditions</h1>
                    
                    <section className="terms-section">
                        <h2>1. Mentions Légales - Version Étudiant / Projet Non Commercial</h2>
                        
                        <h3>Éditeur du site</h3>
                        <p>
                            Ce site est réalisé dans le cadre d'un projet éducatif par :<br />
                            <strong>hunixcode</strong> — Développeur ( étudiant )<br />
                            Email : Non spécifié
                        </p>
                        
                        <p>
                            <strong>Responsable de la publication :</strong><br />
                            hunixcode
                        </p>
                        
                        <h3>Hébergement du site</h3>
                        <p>
                            Nom de l'hébergeur : Non Spécifié<br />
                            Adresse : Non Spécifié<br />
                            Site : Non Spécifié
                        </p>
                        
                        <h3>Nature du site</h3>
                        <p>
                            Ce projet est un prototype pédagogique, réalisé dans le cadre d'un stage en entreprise, 
                            et ne fait l'objet d'aucune exploitation commerciale. Le site n'a pas vocation à être rendu public.
                        </p>
                        
                        <h3>Propriété intellectuelle</h3>
                        <p>
                            Les images, noms et éléments appartenant à l'univers Pokémon sont la propriété de 
                            Nintendo / Game Freak / The Pokémon Company et sont utilisés à des fins strictement 
                            éducatives et non commerciales.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>2. CGU — Version Adaptée aux Projets Étudiants</h2>
                        
                        <h3>Article 1 — Objet</h3>
                        <p>
                            Les présentes Conditions Générales d'Utilisation encadrent l'accès et l'utilisation 
                            de ce site dans un cadre exclusivement éducatif, dans le cadre d'un projet étudiant.
                        </p>
                        
                        <h3>Article 2 — Accès au site</h3>
                        <p>
                            Le site est accessible uniquement aux encadrants, formateurs, et personnes autorisées.
                        </p>
                        
                        <h3>Article 3 — Responsabilité de l'éditeur</h3>
                        <p>L'éditeur :</p>
                        <ul>
                            <li>ne garantit pas l'exactitude des données affichées ;</li>
                            <li>ne pourra être tenu responsable de tout dommage, direct ou indirect, lié à l'utilisation du site ;</li>
                            <li>ne garantit pas la disponibilité, la sécurité ou la stabilité du service.</li>
                        </ul>
                        
                        <h3>Article 4 — Propriété intellectuelle</h3>
                        <p>
                            Les contenus Pokémon (images, logos, sprites, noms) sont protégés par copyright.
                        </p>
                        <p>
                            Leur usage est strictement éducatif, non commercial, et effectué dans un cadre fermé.
                        </p>
                        <p>
                            L'utilisateur s'engage à ne pas réutiliser ces contenus en dehors du périmètre pédagogique.
                        </p>
                        
                        <h3>Article 5 — Contenus tiers</h3>
                        <p>
                            Toute demande de retrait (copyright, image non libre, contenu inapproprié) peut être adressée à :<br />
                            <strong>Non spécifié</strong>
                        </p>
                        <p>
                            L'éditeur s'engage à supprimer immédiatement les contenus concernés.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>3. Politique de Confidentialité (RGPD)</h2>
                        
                        <p>Seules les données suivantes peuvent être collectées :</p>
                        <ul>
                            <li>Username</li>
                            <li>Mot de passe hashé</li>
                        </ul>
                        
                        <p>
                            <strong>Finalité :</strong> authentification des utilisateurs dans le cadre du projet éducatif.
                        </p>
                        
                        <p>
                            <strong>Base légale :</strong> article 6.1.f du RGPD (intérêt légitime dans un cadre pédagogique non public).
                        </p>
                        
                        <p>
                            Aucune donnée n'est transmise, vendue ou partagée.
                        </p>
                        
                        <p>Les utilisateurs peuvent demander :</p>
                        <ul>
                            <li>accès,</li>
                            <li>suppression,</li>
                            <li>modification.</li>
                        </ul>
                        
                        <p>
                            <strong>Contact :</strong> Non spécifié
                        </p>
                        
                        <p>
                            Les données sont supprimées dès la fin du projet/stage.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>4. Clause Spéciale — Utilisation d'Images Pokémon (Copyright)</h2>
                        
                        <h3>Clause d'usage des images protégées</h3>
                        <p>
                            Le site utilise certaines images issues de l'univers Pokémon (illustrations, sprites, logos). 
                            Ces éléments sont protégés par copyright appartenant à Nintendo / Game Freak / The Pokémon Company.
                        </p>
                        
                        <p>Leur utilisation se fait exclusivement :</p>
                        <ul>
                            <li>dans un cadre éducatif,</li>
                            <li>non commercial,</li>
                            <li>non destiné à une diffusion publique,</li>
                            <li>dans le cadre d'un travail étudiant,</li>
                            <li>sans générer aucun revenu direct ou indirect.</li>
                        </ul>
                        
                        <p>
                            Si vous êtes titulaire des droits et que vous estimez qu'une image ne doit pas apparaître 
                            dans ce projet, vous pouvez contacter l'éditeur afin d'obtenir le retrait immédiat du contenu.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2>5. Procédure de Retrait (Obligation LCEN)</h2>
                        
                        <h3>Signalement et retrait</h3>
                        <p>
                            Conformément à l'article 6-I-3 de la LCEN, toute personne peut signaler un contenu illicite 
                            ou portant atteinte aux droits d'auteur.
                        </p>
                        
                        <p>Il suffit d'envoyer un message via le formulaire de contact.</p>
                        <ul>
                            <li>la description du contenu,</li>
                            <li>son emplacement,</li>
                            <li>la justification du droit d'auteur,</li>
                            <li>votre identité.</li>
                        </ul>
                        
                        <p>
                            L'éditeur s'engage à retirer le contenu dans les plus brefs délais.
                        </p>
                    </section>

                    <div className="terms-footer">
                        <p>Dernière mise à jour : Décembre 2025</p>
                    </div>
                </div>
            </div>
        </>
    );
}
