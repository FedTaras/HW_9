import { Notify } from 'notiflix';

// const ref = {
//   form: document.querySelector('.form'),
//   // submitBtn: document.querySelector('button'),
//   delay: document.querySelector('input[name="delay"]'),
//   step: document.querySelector('input[name="step"]'),
//   amount: document.querySelector('input[name="amount"]'),
// };

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   if (shouldResolve) {
//     // Fulfill
//     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   } else {
//     // Reject
//     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   }
// }

// ref.form.addEventListener('submit', onBtnSubmitFn);

// function onBtnSubmitFn(evt) {
//   evt.preventDefault();

//   const delay = Number(ref.delay.value);

//   setTimeout(() => {
//     for (
//       let i = 1, j = delay;
//       i <= ref.amount.value;
//       i++, j = j + Number(ref.step.value)
//     ) {
//       setTimeout(() => {
//         createPromise(i, j);
//       }, j);
//     }
//   }, delay);
// }

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  let position = 1;
  let delay = Number(ev.target.delay.value);
  const step = Number(ev.target.step.value);
  const amount = Number(ev.target.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      });

    position++;
    delay += step;
  }
  // ev.currentTarget.reset();
}
