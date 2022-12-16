//1. Напишіть функцію printNumbers(from, to, interval),
// яка послідовно виводить у консоль цілі числа, починаючи з from 
// і закінчуючи to, з інтервалом між виведенням сусідніх чисел у interval мс.
//Реалізуйте перший або обидва варіанти рішення:

function printNumbers(from, to, interval) {
	// let i = from;
	// let timerId = setInterval(() => {
	//   if (i === to) clearInterval(timerId);
	//   console.log(i);
	//   i++;
	// }, 1000);
	let i = from;

	let timerId = setTimeout(
		function tick(to) {
			console.log(i);
			i++;
			if (i === to) {
				console.log(i);
			} else {
				timerId = setTimeout(tick, 1000, to);
			}
		},
		1000,
		to
	);
}
printNumbers(10, 20, 1000);

// let timerId = setTime
// out(function tick() {
//   alert('tick');
//   timerId = setTimeout(tick, 2000); 
// }, 2000);
printNumbers1 = (from, to, interval) => {
	for (let i = from; i <= to; i += 1) {
		setTimeout(() => console.log(i), interval * i);
	}
}
printNumbers1(30, 40, 2000);

//таймер1

document.getElementById("app").innerHTML

let kolichestvoMinut = 1;
let tekuscheyeVremya = new Date();
let deadlineTime = tekuscheyeVremya.setMinutes(tekuscheyeVremya.getMinutes() + 1);

obratniyOtschet = setInterval(function () {
	seychas = new Date().getTime();
	ostatokVremeni = deadlineTime - seychas;

	minuti = Math.floor((ostatokVremeni % (1000 * 60 * 60)) / (1000 * 60));
	secundi = Math.floor((ostatokVremeni % (1000 * 60)) / 1000);

	minuti = minuti < 10 ? "0" + minuti : minuti;
	secundi = secundi < 10 ? "0" + secundi : secundi;


	document.getElementById("deadline-timer").innerHTML = minuti + ":" + secundi;

	if (minuti == 0) {
		document.getElementById("min-or-sec").innerHTML = "секунд";
	}

	if (ostatokVremeni < 0) {
		clearInterval(obratniyOtschet);
		document.getElementById("time-remainer").innerHTML = "<h2>Время истекло!</h2>";
	}
}, 1000);

//таймер2
// Очень понравился этот пример с использования 
// векторной графики-немного разобралась ,
// все повторила как на примере -сложно,
// но надеюсь, что со временем научись.
// Этот код не для проверки -просто, что-бы было в одной папке.
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
	info: {
		color: "green"
	},
	warning: {
		color: "orange",
		threshold: WARNING_THRESHOLD
	},
	alert: {
		color: "red",
		threshold: ALERT_THRESHOLD
	}
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span></div>`;

startTimer();

function onTimesUp() {
	clearInterval(timerInterval);
}

function startTimer() {
	timerInterval = setInterval(() => {
		timePassed = timePassed += 1;
		timeLeft = TIME_LIMIT - timePassed;
		document.getElementById("base-timer-label").innerHTML = formatTime(
			timeLeft
		);
		setCircleDasharray();
		setRemainingPathColor(timeLeft);

		if (timeLeft === 0) {
			onTimesUp();
		}
	}, 1000);
}

function formatTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = time % 60;

	if (seconds < 10) {
		seconds = `0${seconds} `;
	}

	return `${minutes}:${seconds} `;
}

function setRemainingPathColor(timeLeft) {
	const { alert, warning, info } = COLOR_CODES;
	if (timeLeft <= alert.threshold) {
		document
			.getElementById("base-timer-path-remaining")
			.classList.remove(warning.color);
		document
			.getElementById("base-timer-path-remaining")
			.classList.add(alert.color);
	} else if (timeLeft <= warning.threshold) {
		document
			.getElementById("base-timer-path-remaining")
			.classList.remove(info.color);
		document
			.getElementById("base-timer-path-remaining")
			.classList.add(warning.color);

	}
}

function calculateTimeFraction() {
	const rawTimeFraction = timeLeft / TIME_LIMIT;
	return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
	const circleDasharray = `${(
		calculateTimeFraction() * FULL_DASH_ARRAY
	).toFixed(0)
		} 283`;
	document
		.getElementById("base-timer-path-remaining")
		.setAttribute("stroke-dasharray", circleDasharray);
} 
