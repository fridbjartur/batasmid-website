export default function progressIndicator() {
  let timer;
  const throttle = (callback, delay) => {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      callback();
      timer = undefined;
    }, delay);
  };

  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const processScroll = () => {
    const getScrollPercent = (document.documentElement.scrollTop || document.body.scrollTop) / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight);
    const percent = getScrollPercent * 100;
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  };

  document.addEventListener('scroll', (event) => {
    throttle(processScroll, 250);
  });

  document.querySelector('#progress-indicator').addEventListener('click', () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  });
}
