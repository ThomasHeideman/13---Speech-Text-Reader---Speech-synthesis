'use strict';
const main = document.getElementById('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './src/img/blij.jpg',
    text: 'Ik ben blij',
  },
  {
    image: './src/img/boos.jpg',
    text: 'Ik ben boos',
  },
  {
    image: './src/img/GOMEOW.jpg',
    text: 'Ik ga mauw',
  },
  {
    image: './src/img/huis.jpg',
    text: 'Ik wil naar huis',
  },
  {
    image: './src/img/eten.jpg',
    text: 'Ik heb honger',
  },
  {
    image: './src/img/drinken.jpg',
    text: 'Ik heb dorst',
  },
  {
    image: './src/img/op_reis.jpg',
    text: 'Ik wil op reis',
  },
  {
    image: './src/img/buiten.jpg',
    text: 'Ik wil naar buiten',
  },
  {
    image: './src/img/slaap.jpg',
    text: 'Ik ben moe',
  },
  {
    image: './src/img/vervelen.jpg',
    text: 'Ik verveel me',
  },
  {
    image: './src/img/verdrietig.jpg',
    text: 'Ik ben verdrietig',
  },
  {
    image: './src/img/spelen.jpg',
    text: 'Ik wil spelen',
  },
];

data.forEach(createBox);

// create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}" />
  <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

// get voices
let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle textbox
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);
// Select Voice
voicesSelect.addEventListener('change', setVoice);
// Read  custom text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
