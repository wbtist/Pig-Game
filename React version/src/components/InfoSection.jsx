import React from 'react';

const InfoSection = () => {
  return (
    <section className="info-section">
      <details>
        <summary>Please tell me what you think about this project!</summary>
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSe3YTVnHHJJ5eRIWxHgNNbsCdUrWZugszDI5jvbk6Gr0BP8oA/viewform?embedded=true" 
          width="640" 
          height="600" 
          frameBorder="0" 
          marginHeight="0" 
          marginWidth="0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title="Project Feedback Form"
        >
          Loading…
        </iframe>
      </details>
      
      <details>
        <summary>Game Rules</summary>
        <p>
          On your turn, keep rolling the die and adding to your score, but stop anytime to bank your points. 
          If you roll a 1, you lose all points from that turn.{' '}
          <a 
            className="summary-link"
            href="https://www.wikiwand.com/en/Pig_(dice_game)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </p>
      </details>
    </section>
  );
};

export default InfoSection;