import smoothscroll from 'smoothscroll-polyfill';
import navigation from './components/nav';
import progressIndicator from './components/progress-indicator';
import sliderProjects from './components/slider';
import linkSMoothScroll from './components/smooth-scroll-link';
import simpleSlider from './components/simple-slider';

if (module.hot) {
  module.hot.accept();
}

function loadFallback() {
  document.getElementById('loading').style.display = 'none';
}
setTimeout(loadFallback, 5000);


window.addEventListener('load', () => {
  document.getElementById('loading').style.display = 'none';
});

// Elements
const paragraph = document.querySelectorAll('p');
const sections = document.querySelectorAll('section');


// Helpers
const controller = new ScrollMagic.Controller();

smoothscroll.polyfill();
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

function scrollStatus() {
  new ScrollMagic.Scene({ triggerElement: paragraph[0], triggerHook: 'onEnter' })
    .setTween('#hero video', 1, { opacity: 0, scale: 0.5 })
    .setClassToggle('.js-hero-btn', 'hidden-opacity')
    .addTo(controller);

  const showHeaderTl = new TimelineMax();
  showHeaderTl.add(TweenMax.fromTo('#progress-indicator', 0.5, { opacity: 0 }, { opacity: 1 }), 'first').add(TweenMax.fromTo('#logo-top', 0.5, { opacity: 0 }, { opacity: 1 }), 'first');
  new ScrollMagic.Scene({ triggerElement: sections[0], triggerHook: 0 })
    .setTween(showHeaderTl)
    .addTo(controller);
}

function init() {
  // Slider
  sliderProjects(controller);

  // progressIndicator
  progressIndicator();

  // Nav
  navigation();

  // Smooth scroll on links
  linkSMoothScroll();

  // Simple slider
  simpleSlider(controller);

  scrollStatus();

  const txtReveal = document.querySelectorAll('.txt-reveal');
  for (let i = 0; i < txtReveal.length; i += 1) {
    new ScrollMagic.Scene({ triggerElement: txtReveal[i], triggerHook: 'onEnter', reverse: false })
      .setTween(txtReveal[i], 0.6, { backgroundSize: '0% 100%', ease: Power0.easeNone, delay: 0.4 })
      .addTo(controller);
  }

  function revealImg() {
    const imgRevealTrigger = document.querySelectorAll('.img-container img');
    for (let i = 0; i < imgRevealTrigger.length; i += 1) {
      new ScrollMagic.Scene({ triggerElement: imgRevealTrigger[i], triggerHook: 'onEnter', duration: '100%' })
        .setTween(imgRevealTrigger[i], 1, { scale: 0.91, ease: Power0.easeNone })
        .addTo(controller);
    }
  }

  revealImg();
}

window.addEventListener('DOMContentLoaded', init);
