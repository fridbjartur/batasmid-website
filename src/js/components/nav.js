export default function navigation() {
  /**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
  {
    setTimeout(() => document.body.classList.add('render'), 60);
    const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
    const total = navdemos.length;
    const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
    const navigate = (linkEl) => {
      document.body.classList.remove('render');
      document.body.addEventListener('transitionend', () => window.location = linkEl.href);
    };
    navdemos.forEach(link => link.addEventListener('click', (ev) => {
      ev.preventDefault();
      navigate(ev.target);
    }));
    document.addEventListener('keydown', (ev) => {
      const keyCode = ev.keyCode || ev.which;
      let linkEl;
      if (keyCode === 37) {
        linkEl = current > 0 ? navdemos[current - 1] : navdemos[total - 1];
      } else if (keyCode === 39) {
        linkEl = current < total - 1 ? navdemos[current + 1] : navdemos[0];
      } else {
        return false;
      }
      navigate(linkEl);
    });
  }


  // Easing


  //
  // these easing functions are based on the code of glsl-easing module.
  // https://github.com/glslify/glsl-easings
  //

  const ease = {
    exponentialIn: t => (t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))),
    exponentialOut: t => (t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)),
    exponentialInOut: t => (t == 0.0 || t == 1.0
      ? t
      : t < 0.5
        ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0),
    sineOut: (t) => {
      const HALF_PI = 1.5707963267948966;
      return Math.sin(t * HALF_PI);
    },
    circularInOut: t => (t < 0.5
      ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
      : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0)),
    cubicIn: t => t * t * t,
    cubicOut: (t) => {
      const f = t - 1.0;
      return f * f * f + 1.0;
    },
    cubicInOut: t => (t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0),
    quadraticOut: t => -t * (t - 2.0),
    quarticOut: t => Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0,
  };

  // nav
  class ShapeOverlays {
    constructor(elm) {
      this.elm = elm;
      this.path = elm.querySelectorAll('path');
      this.numPoints = 10;
      this.duration = 900;
      this.delayPointsArray = [];
      this.delayPointsMax = 300;
      this.delayPerPath = 250;
      this.timeStart = Date.now();
      this.isOpened = false;
      this.isAnimating = false;
    }

    toggle() {
      this.isAnimating = true;
      for (let i = 0; i < this.numPoints; i += 1) {
        this.delayPointsArray[i] = Math.random() * this.delayPointsMax;
      }
      if (this.isOpened === false) {
        this.open();
      } else {
        this.close();
      }
    }

    open() {
      this.isOpened = true;
      this.elm.classList.add('is-opened');
      this.timeStart = Date.now();
      this.renderLoop();
    }

    close() {
      this.isOpened = false;
      this.elm.classList.remove('is-opened');
      this.timeStart = Date.now();
      this.renderLoop();
    }

    updatePath(time) {
      const points = [];
      for (let i = 0; i < this.numPoints; i += 1) {
        points[i] = (1 - ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100;
      }

      let str = '';
      str += (this.isOpened) ? `M 0 0 V ${points[0]}` : `M 0 ${points[0]}`;
      for (let i = 0; i < this.numPoints - 1; i += 1) {
        const p = (i + 1) / (this.numPoints - 1) * 100;
        const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
        str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
      }
      str += (this.isOpened) ? 'V 100 H 0' : 'V 0 H 0';
      return str;
    }

    render() {
      if (this.isOpened) {
        for (let i = 0; i < this.path.length; i += 1) {
          this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
        }
      } else {
        for (let i = 0; i < this.path.length; i += 1) {
          this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
        }
      }
    }

    renderLoop() {
      this.render();
      if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
        requestAnimationFrame(() => {
          this.renderLoop();
        });
      } else {
        this.isAnimating = false;
      }
    }
  }

  const elmHamburger = document.querySelector('.js-burger');
  const gNavItems = document.querySelectorAll('.global-menu__item');
  const elmOverlay = document.querySelector('.shape-overlays');
  const overlay = new ShapeOverlays(elmOverlay);

  function toggleNav() {
    if (overlay.isAnimating) {
      return false;
    }
    overlay.toggle();
    if (overlay.isOpened === true) {
      elmHamburger.classList.add('is-opened-navi');
      for (let i = 0; i < gNavItems.length; i += 1) {
        gNavItems[i].classList.add('is-opened');
      }
    } else {
      elmHamburger.classList.remove('is-opened-navi');
      for (let i = 0; i < gNavItems.length; i += 1) {
        gNavItems[i].classList.remove('is-opened');
      }
    }
  }

  elmHamburger.addEventListener('click', toggleNav);
  for (let i = 0; i < gNavItems.length; i += 1) {
    gNavItems[i].addEventListener('click', toggleNav);
  }

  document.querySelector('#logo-top').addEventListener('click', () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  });
}
