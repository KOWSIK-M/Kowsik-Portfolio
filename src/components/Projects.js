import React from 'react';
import './Projects.css';
import CityPulse from '../images/CityPulse.png'
import ShipIt from '../images/ShipIt.png'
import Artazon from '../images/Artazon.jpg'

export default function Projects() {
  return (
    <div>
      <h1 style={{color:"white",marginLeft:"45vw"}}>Projects</h1>
      <div className="iframe-container">
        <iframe
          title="BidX-website"
          src="https://kowsik-m.github.io/BidX/"
          height={600}
          width={1000}
          className="iframe-glow"
        ></iframe>
      </div>
      
      <h2 className="projects-title">View My Other Projects</h2>
      
      <div className="projects-grid">
        <div className="project-card" onClick={() => window.open("https://github.com/KOWSIK-M/Citizo", "_blank")}>
          <img src={CityPulse} alt="Project 1" className="project-image" />
          <p className="project-name">CityPulse</p>
        </div>
        
        <div className="project-card" onClick={() => window.open("https://github.com/KOWSIK-M/ShipIt", "_blank")}>
          <img src={ShipIt} alt="Project 2" className="project-image" />
          <p className="project-name">ShipIt</p>
        </div>
        
        <div className="project-card" onClick={() => window.open("https://github.com/KOWSIK-M/Online-Art-Gallery", "_blank")}>
          <img src={Artazon} alt="Project 3" className="project-image" />
          <p className="project-name">Artazon</p>
        </div>
      </div>
    </div>
  );
}
