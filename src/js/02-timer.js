import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector("button[data-start]");
let days = document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let minutes = document.querySelector('span[data-minutes]');
let seconds = document.querySelector('span[data-seconds]');

startBtn.setAttribute("disabled", "");
startBtn.addEventListener('click', startTimer);

const TIMER_INTERVAL = 1000;
let intervalID = null;
let userDate = null;
let remainingTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ckeckUserInputDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function ckeckUserInputDate (date) {
  userDate = date.getTime();
  const currentDate = new Date();

  if (userDate < currentDate) {
    Notify.failure('Please pick the date in future', {showOnlyTheLastOne: true,});
    startBtn.setAttribute("disabled", "");
    return
  }
  Notify.success('Timer is ready to Start!', {showOnlyTheLastOne: true,});
  startBtn.removeAttribute("disabled");
}

function startTimer () {
  intervalID = setInterval(timer, TIMER_INTERVAL);
  inputTime.setAttribute("disabled", "");
  startBtn.setAttribute("disabled", "");
}

function timer () {
  remainingTime = userDate - Date.now();

  if (remainingTime <= 0) {
    clearInterval(intervalID);
    inputTime.removeAttribute("disabled");
    return
  }
  timerMarkup(remainingTime);
}

function timerMarkup(time) {
  days.textContent = addLeadingZero(convertMs(time).days);
  hours.textContent = addLeadingZero(convertMs(time).hours);
  minutes.textContent = addLeadingZero(convertMs(time).minutes);
  seconds.textContent = addLeadingZero(convertMs(time).seconds);
}

function addLeadingZero(number) {
  return String(number).padStart(2, '0');
}

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
