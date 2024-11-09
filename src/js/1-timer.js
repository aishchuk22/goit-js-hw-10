import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button");

const timerDays = document.querySelector(".value[data-days]");
const timerHours = document.querySelector(".value[data-hours]");
const timerMins = document.querySelector(".value[data-minutes]");
const timerSecs = document.querySelector(".value[data-seconds]");

startBtn.addEventListener("click", handleStart);
startBtn.disabled = true;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

        startBtn.disabled = false;
        userSelectedDate = selectedDates[0];

        if (options.defaultDate >= userSelectedDate) {
            iziToast.show({
                title: "Hey!",
                message: "Please choose a date in the future",
                backgroundColor: "#EF4040",
                messageColor: "#FFFFFF",
                titleColor: "#FFFFFF",
                titleSize: "16px",
                closeOnClick: true,
                position: "topRight",
            });

            startBtn.disabled = true;
            return;
        } 
    },
};

flatpickr("#datetime-picker", options);
const addLeadingZero = value => value.toString().padStart(2, "0");

function handleStart() {
    startBtn.disabled = true;
    input.disabled = true;

    const ticker = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(userSelectedDate - Date.now());

        timerDays.textContent = addLeadingZero(days);
        timerHours.textContent = addLeadingZero(hours);
        timerMins.textContent = addLeadingZero(minutes);
        timerSecs.textContent = addLeadingZero(seconds);

        const arr = [days, hours, minutes, seconds];
        const arrCleared = arr.every(item => item === 0);

        if (arrCleared) {
            clearInterval(ticker);
            input.disabled = false;
        }
        
    }, 1000)
};

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

