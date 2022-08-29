import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('[type="submit"]'),
}

refs.btn.addEventListener('click', onClickPromise);

function onClickPromise(event) {
  event.preventDefault();
  const inputDelay = Number(refs.delay.value);
  const inputDelayStep = Number(refs.delayStep.value);
  const inputAmount = Number(refs.amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    createPromise(i, inputDelay + (i-1) * inputDelayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify
          .success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify
          .failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })
  }
};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}
