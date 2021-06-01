import React from 'react';
import aboutMe__image from '../../images/aboutMe__image.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__container">
        <h2 className="page__title aboutMe__title">Студент</h2>
        <div className="aboutMe__info">
          <h1 className="aboutMe__name">Виталий</h1>
          <p className="aboutMe__about">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <ul className="socials">
            <li className="socials__item"><a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="socials__link" lang="en">Facebook</a></li>
            <li className="socials__item"><a target="_blank" rel="noreferrer" href="https://github.com/Antonov2504" className="socials__link" lang="en">Github</a></li>
          </ul>
        </div>
        <img
          src={aboutMe__image}
          alt="Фотография студента"
          className="aboutMe__image" />
      </div>
    </section>
  );
}

export default AboutMe;