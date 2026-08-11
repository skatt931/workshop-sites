const modes = {
  intro: { label: 'Вступ і результат дня', description: 'Знайомимось, дивимось на готовий приклад і задаємо напрямок дня.', minutes: 15, color: '#102727' },
  html: { label: 'Що таке вебсайт і HTML', description: 'Створюємо просту сторінку й бачимо зв’язок між файлами та браузером.', minutes: 20, color: '#36ddd1' },
  product: { label: 'Як створюють продукт', description: 'Проходимо цикл: планування → імплементація → тестування → реліз.', minutes: 15, color: '#102727' },
  codex: { label: 'Знайомство з Codex і скілами', description: 'Вчимося чітко попросити, перевірити результат і уточнити зміну.', minutes: 20, color: '#36ddd1' },
  github: { label: 'Git і GitHub', description: 'Без зайвої техніки: історія змін, репозиторій і підготовка до публікації.', minutes: 20, color: '#102727' },
  build: { label: 'Основа сайту й дизайн', description: 'Створюємо структуру, дизайн і першу робочу версію сайту-візитки.', minutes: 60, color: '#102727' },
  break: { label: 'Перерва', description: '15 хвилин для відпочинку перед персоналізацією сайту.', minutes: 15, color: '#ff7045' },
  personalize: { label: 'Персоналізація й тестування', description: 'Змінюємо тексти, кольори, контакти та перевіряємо результат.', minutes: 60, color: '#102727' },
  release: { label: 'Реліз на GitHub Pages', description: 'Зберігаємо зміни, публікуємо сайт і перевіряємо публічне посилання.', minutes: 45, color: '#36ddd1' },
  'own-change': { label: 'Власна зміна й завершення', description: 'Кожен формулює власний запит до Codex і планує наступний крок.', minutes: 30, color: '#102727' }
};
const circumference = 2 * Math.PI * 139;
const ring = document.querySelector('#progressRing');
const display = document.querySelector('#timeDisplay');
const title = document.querySelector('#blockTitle');
const description = document.querySelector('#blockDescription');
const caption = document.querySelector('#clockCaption');
const statusText = document.querySelector('#statusText');
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const resetButton = document.querySelector('#resetButton');
const message = document.querySelector('#completionMessage');
const completionTitle = document.querySelector('#completionTitle');
let currentMode = 'intro'; let totalSeconds = 900; let remainingSeconds = totalSeconds; let intervalId = null; let completedSessions = Number(localStorage.getItem('aiWorkshopBlocks') || 0);
ring.style.strokeDasharray = circumference;
document.querySelector('#sessionCount').textContent = String(completedSessions).padStart(2, '0');

function render() {
  const minutes = Math.floor(remainingSeconds / 60); const seconds = remainingSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  display.dateTime = `PT${remainingSeconds}S`;
  ring.style.strokeDashoffset = circumference * (1 - remainingSeconds / totalSeconds);
}
function stopTimer() { clearInterval(intervalId); intervalId = null; document.body.classList.remove('is-running'); startButton.disabled = false; pauseButton.disabled = true; }
function startTimer() { if (!intervalId && remainingSeconds > 0) { intervalId = setInterval(tick, 250); document.body.classList.add('is-running'); startButton.disabled = true; pauseButton.disabled = false; statusText.textContent = 'ТРИВАЄ БЛОК'; }}
function tick() { remainingSeconds = Math.max(0, Math.ceil((Number(display.dataset.end || 0) - Date.now()) / 1000)); render(); if (!remainingSeconds) finish(); }
function setDeadline() { display.dataset.end = Date.now() + remainingSeconds * 1000; }
function soundSignal() { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); [0, .22, .44].forEach((delay, index) => { const oscillator = ctx.createOscillator(); const gain = ctx.createGain(); oscillator.connect(gain).connect(ctx.destination); oscillator.frequency.value = index === 2 ? 880 : 660; gain.gain.setValueAtTime(.001, ctx.currentTime + delay); gain.gain.exponentialRampToValueAtTime(.16, ctx.currentTime + delay + .02); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + delay + .16); oscillator.start(ctx.currentTime + delay); oscillator.stop(ctx.currentTime + delay + .18); }); } catch (_) {} }
function finish() { stopTimer(); document.body.classList.add('is-finished'); statusText.textContent = 'БЛОК ЗАВЕРШЕНО'; completionTitle.textContent = currentMode === 'break' ? 'Перерва завершена!' : 'Час рухатися далі!'; if (currentMode !== 'break') { completedSessions++; localStorage.setItem('aiWorkshopBlocks', completedSessions); document.querySelector('#sessionCount').textContent = String(completedSessions).padStart(2, '0'); } message.hidden = false; soundSignal(); }
function resetTimer() { stopTimer(); document.body.classList.remove('is-finished'); message.hidden = true; remainingSeconds = totalSeconds; render(); statusText.textContent = 'ГОТОВІ ДО СТАРТУ'; }
function chooseMode(mode) { currentMode = mode; const data = modes[mode]; totalSeconds = data.minutes * 60; remainingSeconds = totalSeconds; title.textContent = data.label; description.textContent = data.description; caption.textContent = `З ${data.minutes} хвилин`; ring.style.stroke = data.color; document.querySelectorAll('.mode-card').forEach(card => { const active = card.dataset.mode === mode; card.classList.toggle('is-active', active); card.setAttribute('aria-pressed', active); }); resetTimer(); }
startButton.addEventListener('click', () => { setDeadline(); startTimer(); });
pauseButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
document.querySelectorAll('.mode-card').forEach(card => card.addEventListener('click', () => chooseMode(card.dataset.mode)));
document.querySelector('#closeMessage').addEventListener('click', () => { message.hidden = true; document.body.classList.remove('is-finished'); });
render();
