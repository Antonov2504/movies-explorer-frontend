import React from 'react';
import promo__image from '../../images/promo__image.svg';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__info">
          <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subheading">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="#about-project"><button type="button" className="promo__button">Узнать больше</button></a>
        </div>
        <img
          src={promo__image}
          alt="Планета Земля составленная из аббревиатур Всемирной сети WEB"
          className="promo__image" />
      </div>
    </section>
  );
}

export default Promo;