import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item"><a target="_blank" rel="noreferrer" href="https://antonov2504.github.io/YP-woodies/" className="portfolio__link">Статичный сайт</a></li>
          <li className="portfolio__item"><a target="_blank" rel="noreferrer" href="https://antonov2504.github.io/russian-travel/" className="portfolio__link">Адаптивный сайт</a></li>
          <li className="portfolio__item"><a target="_blank" rel="noreferrer" href="https://antonov2504.github.io/react-mesto-auth" className="portfolio__link">Одностраничное приложение</a></li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;