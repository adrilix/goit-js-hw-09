import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    spanDays: document.querySelector('[data-days]'),
    spanHours: document.querySelector('[data-hours]'),
    spanMinutes: document.querySelector('[data-minutes]'),
    spanSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onClickBtn);

refs.startBtn.disabled = true;
let selectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();

        if (selectedDate < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
        }
        console.log(selectedDate);
    },
};

flatpickr(refs.inputDate, options);

const timer = {
    start() { 
        const timerId = setInterval(() => {
            const startTime = Date.now();
            const deltaTime = selectedDate - startTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            setSpan({ days, hours, minutes, seconds });
            if(deltaTime < 1000){
                clearInterval(timerId);
                refs.startBtn.disabled = false;
            }
        }, 1000);
    },
};

function onClickBtn(event) {
    refs.startBtn.disabled = true;
    timer.start();
}

function setSpan({ days, hours, minutes, seconds }) {
    refs.spanDays.textContent = `${days}`;
    refs.spanHours.textContent = `${hours}`;
    refs.spanMinutes.textContent = `${minutes}`;
    refs.spanSeconds.textContent = `${seconds}`;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
