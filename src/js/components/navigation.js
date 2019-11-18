function navigation() {
  // Nav
  const burgerNav = document.querySelector('.js-burger');
  // const nav = document.querySelector('nav');

  burgerNav.addEventListener('click', () => {
    burgerNav.classList.toggle('burger-active');
  });
}

export default navigation;
