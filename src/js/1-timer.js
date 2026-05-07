import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css"


import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const btn = document.querySelector("button")
const dateTime = document.querySelector("#datetime-picker");
const timer = document.querySelector(".timer")
const field = document.querySelector(".field");
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')


let userSelectedDate = null
let intervalId = null

btn.disabled = true
dateTime.disabled = false

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now()
    userSelectedDate = selectedDates[0].getTime()
    

    if (userSelectedDate <= currentDate) {
iziToast.show({
    color: 'red',
  message: "Please choose a date in the future",
  position: 'topRight'
});
       btn.disabled = true
      return
    }

    btn.disabled = false
    
  },
};

flatpickr(dateTime, options) 


btn.addEventListener('click', handleStart)

function handleStart() {

  btn.disabled = true;
dateTime.disabled = true
  
  
  intervalId = setInterval(() => {
    const currentTime = Date.now()
    const deltaTime = userSelectedDate - currentTime;
    
    if (deltaTime <= 0) {
      clearInterval(intervalId)

      createMarkap({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      })
      dateTime.disabled = false;
      return
    }

    const objTime = convertMs(deltaTime)
createMarkap(objTime)
 
  }, 1000)
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


function createMarkap({ days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, '0')
  hoursEl.textContent = String(hours).padStart(2, '0')
  minutesEl.textContent = String(minutes).padStart(2, '0')
  secondsEl.textContent = String(seconds).padStart(2, '0')
}