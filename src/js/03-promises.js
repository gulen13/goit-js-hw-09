import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};
let formData = {};

refs.form.addEventListener('input', handleFormInputs);
refs.form.addEventListener('submit', onFormSubmit);

function handleFormInputs(event) {
formData[event.target.name] = Number(event.target.value);
}

function onFormSubmit(event) {
  event.preventDefault();
  let {elements: { delay, step, amount }} = event.currentTarget;

  if(delay.value <= 0 || step.value <= 0 || amount.value <= 0) {
    Notify.failure('Заборонено вносити відємні числа або "0" ', {showOnlyTheLastOne: true,});
    return
  }

  delay = formData.delay;

  for (let i = 1; i <= amount.value; i += 1) {

    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += formData.step;
  }
  refs.form.reset();
}


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      };
    }, delay);
});
};