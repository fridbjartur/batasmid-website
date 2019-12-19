export default function simpleSlider(controller) {
  const imageData = document.querySelectorAll('.js-simple-slider img');
  let currentImage = 0;

  const handleImageChange = (direction) => {
    currentImage = (currentImage + imageData.length + ((direction === 'next') ? 1 : -1)) % imageData.length;
    const callback = () => {
      if (currentImage === 0) {
        imageData[currentImage + 1].hidden = true;
        imageData[imageData.length - 1].hidden = true;
        imageData[currentImage].hidden = false;
      }

      if (currentImage === imageData.length - 1) {
        imageData[currentImage - 1].hidden = true;
        imageData[0].hidden = true;
        imageData[currentImage].hidden = false;
      }

      if (currentImage !== 0 && currentImage < imageData.length - 1) {
        imageData[currentImage - 1].hidden = true;
        imageData[currentImage + 1].hidden = true;
        imageData[currentImage].hidden = false;
      }
    };

    const tl = new TimelineMax();
    tl.to('.simple-slider-overlay', 0.3, { opacity: 1, onComplete: callback })
      .to('.simple-slider-overlay', 0.3, { opacity: 0 });
  };

  document.querySelector('[data=next]').addEventListener('click', () => {
    handleImageChange('next');
  });
  document.querySelector('[data=prev]').addEventListener('click', () => {
    handleImageChange('prev');
  });
}
