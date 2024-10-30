import React, { useEffect } from 'react';
import './Skills.css';

export default function Skills() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.credly.com/assets/utilities/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="skills-container">
            <div className="skills-card">
                <span className="title">My Skills</span>
                <div className="card__tags">
                    <ul className="tag">
                        <li className="tag__name">uiverse</li>
                        <li className="tag__name">Css</li>
                        <li className="tag__name">html</li>
                        <li className="tag__name">java</li>
                        <li className="tag__name">C</li>
                        <li className="tag__name">Python</li>
                        <li className="tag__name">ux/ui</li>
                        <li className="tag__name">Tableau</li>
                        <li className="tag__name">SQL</li>
                    </ul>
                </div>
            </div>
            <div className="badges-section">
                <h2>My Badges</h2>
                <div className="badge" data-iframe-width="150" data-iframe-height="270" data-share-badge-id="ef9f0e22-e49a-426a-87de-fd8b16fcb048" data-share-badge-host="https://www.credly.com"></div>
                <div className="badge" data-iframe-width="150" data-iframe-height="270" data-share-badge-id="49c86be3-2a0e-48ce-a04a-44f5c29be4e8" data-share-badge-host="https://www.credly.com"></div>
                <div className="badge" data-iframe-width="150" data-iframe-height="270" data-share-badge-id="00ea3a7b-9639-42f7-8d40-4dcaa31fe1eb" data-share-badge-host="https://www.credly.com"></div>
            </div>
        </div>
    );
}
