const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const display = document.getElementById('display');
// ХУЙХУЙХУЙХУЙУХЙ
let timer;
let timeLeft = 0;
let isRunning = false; // Флаг для отслеживания состояния таймера

// Функция для обновления отображения таймера
const updateDisplay = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Функция для запуска таймера
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

// Функция для остановки таймера
const stopTimer = () => {
    if (isRunning) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
    }
};

// Функция для сброса таймера
const resetTimer = () => {
    stopTimer();
    timeLeft = 0;
    updateDisplay();
};

// Обработчик для кнопки "Старт"
startButton.addEventListener('click', () => {
    if (!isRunning) {
        // Если таймер не запущен, устанавливаем новое время
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

// Обработчик для кнопки "Стоп"
stopButton.addEventListener('click', stopTimer);

// Обработчик для кнопки "Сброс"
resetButton.addEventListener('click', resetTimer);