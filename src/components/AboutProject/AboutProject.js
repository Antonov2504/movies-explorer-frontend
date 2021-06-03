import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject" id="about-project">
      <div className="aboutProject__container">
        <h2 className="page__title">О проекте</h2>
        <ul className="aboutProject__description">
          <li className="aboutProject__info">
            <p className="aboutProject__heading">Дипломный проект включал 5 этапов</p>
            <p className="aboutProject__subheading">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="aboutProject__info">
            <p className="aboutProject__heading">На выполнение диплома ушло 5 недель</p>
            <p className="aboutProject__subheading">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="aboutProject__infographics">
          <li className="aboutProject__section aboutProject__section_type_backend">
            <p className="aboutProject__section-heading aboutProject__section-heading_color_blue">1 неделя</p>
            <p className="aboutProject__section-subheading" lang="en">Back-end</p>
          </li>
          <li className="aboutProject__section">
            <p className="aboutProject__section-heading">4 недели</p>
            <p className="aboutProject__section-subheading" lang="en">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;