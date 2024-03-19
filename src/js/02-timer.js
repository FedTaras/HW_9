// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const ref = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('input#datetime-picker'),
};
ref.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    } else {
      ref.startBtn.disabled = false;

      ref.startBtn.addEventListener('click', () => {
        setInterval(() => {
          const date = new Date();
          ref.startBtn.disabled = true;
          ref.input.disabled = true;

          const difMS = selectedDates[0] - date.getTime();
          if (difMS <= 0) {
            return;
          }
          ref.days.textContent = convertMs(difMS)
            .days.toString()
            .padStart(2, '0');
          ref.hours.textContent = convertMs(difMS)
            .hours.toString()
            .padStart(2, '0');
          ref.minutes.textContent = convertMs(difMS)
            .minutes.toString()
            .padStart(2, '0');
          ref.seconds.textContent = convertMs(difMS)
            .seconds.toString()
            .padStart(2, '0');
        }, 1000);
      });
    }
  },
};

flatpickr(ref.input, options);

ref.startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(date.getTime())); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
