const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const display = document.getElementById('display');

let timer;
let timeLeft = 0;
let isRunning = false; 

// Обновление
const updateDisplay = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Функция для старта
const startTimer = () => {
    if (!isRunning && timeLeft > 0) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                isRunning = false;
                alert('Время вышло!');
            }
        }, 1000);
    }
};

// Функция для паузы
const stopTimer = () => {
    if (isRunning) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
    }
};

// Функция для сброса 
const resetTimer = () => {
    stopTimer();
    timeLeft = 0;
    updateDisplay();
};

// Старт
startButton.addEventListener('click', () => {
    if (!isRunning) {
        // Если таймер не запущен
        if (timeLeft === 0) {
            const hours = parseInt(hoursInput.value, 10) || 0;
            const minutes = parseInt(minutesInput.value, 10) || 0;
            const seconds = parseInt(secondsInput.value, 10) || 0;

            if (hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
                alert('Введите корректное время!');
                return;
            }

            timeLeft = hours * 3600 + minutes * 60 + seconds;
        }
        startTimer();
    }
});

// Пауза
stopButton.addEventListener('click', stopTimer);

// Сброс
resetButton.addEventListener('click', resetTimer);