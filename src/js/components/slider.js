export default function sliderProjects(controller) {
  const sliderWrapper = document.querySelectorAll('.slider-wrapper');
  const slideIndex = document.querySelectorAll('.slide-index');

  // Index
  for (let i = 0; i < slideIndex.length; i += 1) {
    slideIndex[i].textContent = `${i + 1} / ${slideIndex.length}`;
  }


  // create scene for every slide
  for (let i = 0; i < sliderWrapper.length; i += 1) {
    const xVal = 65;
    const sliderTl = new TimelineMax();
    const sliderScene1 = TweenMax.fromTo(sliderWrapper[i].querySelector('.slider-item-right'), 2, { x: `${xVal}vw`, opacity: 0 }, { x: 0, opacity: 1 });
    const sliderScene2 = TweenMax.fromTo(sliderWrapper[i].querySelector('.slider-item-left'), 2, { x: `${-xVal}vw`, opacity: 0 }, { x: 0, opacity: 1 });
    const sliderScene3 = TweenMax.to(sliderWrapper[i].querySelector('.slider-item-right'), 2, { x: `${-xVal}vw`, opacity: 0 });
    const sliderScene4 = TweenMax.to(sliderWrapper[i].querySelector('.slider-item-left'), 2, { x: `${xVal}vw`, opacity: 0 });

    if (i !== 0 && i < sliderWrapper.length - 1) {
      sliderTl.add(sliderScene1, 'first').add(sliderScene2, 'first').add(sliderScene3, 'second').add(sliderScene4, 'second');
    } else if (i === sliderWrapper.length - 1) {
      sliderTl.add(sliderScene1, 'first').add(sliderScene2, 'first');
    } else {
      sliderTl.add(sliderScene3, 'first').add(sliderScene4, 'first');
    }

    new ScrollMagic.Scene({ triggerElement: sliderWrapper[i], triggerHook: 0, duration: '100%' })
      .setPin(sliderWrapper[i], { pushFollowers: false })
      .setTween(sliderTl)
      .setClassToggle(sliderWrapper[i], 'top-index')
      .addTo(controller);
  }
  new ScrollMagic.Scene({ triggerElement: sliderWrapper[0], triggerHook: 0, duration: `${100 * sliderWrapper.length}%` })
    .setTween('.map-loader', 1, { rotation: 360 })
    .setClassToggle('.map-bg', 'map-active')
    .addTo(controller);
}
