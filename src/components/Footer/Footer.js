import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <section className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__copyright">&#169; 2021</p>
          <ul className="socials socials_type_footer">
            <li className="socials__item socials__item_type_footer"><a target="_blank" rel="noreferrer" href="https://praktikum.yandex.ru/" className="socials__link socials__link_type_footer">Яндекс.Практикум</a></li>
            <li className="socials__item socials__item_type_footer"><a target="_blank" rel="noreferrer" href="https://github.com/Antonov2504" className="socials__link socials__link_type_footer" lang="en">Github</a></li>
            <li className="socials__item socials__item_type_footer"><a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="socials__link socials__link_type_footer" lang="en">Facebook</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;