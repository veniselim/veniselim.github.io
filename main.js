// start fade-in animation
window.addEventListener("load", function () {
document.getElementById("header").classList.add("fade-in");
});
window.addEventListener("load", function () {
document.getElementById("nav").classList.add("fade-in");
});
window.addEventListener("load", function () {
document.getElementById("main").classList.add("fade-in");
});
//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
page4btn.addEventListener("click", function () {
show(4);
});
page5btn.addEventListener("click", function () {
show(5);
});
hideall();
//game
const rounds = [
  {
    images: [
      { src: 'images/entp.png', id: 'red' },
      { src: 'images/infj.png', id: 'red2' },
      { src: 'images/istp.png', id: 'red3' },
      { src: 'images/enfp.png', id: 'green' }
    ],
    oddIndex: 3
  },
  {
    images: [
      { src: 'images/estj.png', id: 'blue' },
      { src: 'images/intj.png', id: 'blue2' },
      { src: 'images/isfp.png', id: 'blue3' },
      { src: 'images/estp.png', id: 'yellow' }
    ],
    oddIndex: 3
  },
  {
    images: [
      { src: 'images/infj.png', id: 'pink' },
      { src: 'images/istp.png', id: 'pink2' },
      { src: 'images/estp.png', id: 'pink3' },
      { src: 'images/intp.png', id: 'cyan' }
    ],
    oddIndex: 3
  }
];

let score = 0;
let currentRound = 0;
const totalRounds = rounds.length;

const scoreEl = document.getElementById('score');
const roundInfo = document.getElementById('roundinf');
const grid = document.getElementById('layout');
const result = document.getElementById('outcome');
const nextBtn = document.getElementById('next');
const replayBtn = document.getElementById('replay');

const popAudio = new Audio("audio/pop.mp3");

function updateScore() {
  scoreEl.textContent = `Score: ${score} / ${totalRounds}`;
}

function updateRoundInfo() {
  roundInfo.textContent = `Round: ${currentRound + 1} of ${totalRounds}`;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let correctImageId = null;

function startRound() {
  result.textContent = '';
  grid.innerHTML = '';

  const roundData = rounds[currentRound];
  const images = [...roundData.images];

  // Determine the odd one out
  correctImageId = images[roundData.oddIndex].id;

  // Shuffle images
  shuffle(images);

  // Create image elements
  for (let img of images) {
    const container = document.createElement('div');
    container.className = 'imagesbox';
    container.dataset.id = img.id;

    const imagee = document.createElement('img');
    imagee.src = img.src;
    imagee.width = 150;
    imagee.height = 150;
	imagee.className = 'bounce';

    container.appendChild(imagee);
    grid.appendChild(container);

    container.addEventListener('click', () => {
      if (container.classList.contains('correct') || container.classList.contains('wrong')) {
        return; // already clicked
      }
	   // Play pop sound on click
		popAudio.play();
  
      if (img.id === correctImageId) {
        container.classList.add('correct');
        result.textContent = 'Correct! You found the odd one out!';
        if (score < totalRounds) { // prevent score > total
          score++;
        }
        updateScore();
        disableClicks();
      } else {
        container.classList.add('wrong');
        result.textContent = 'Try again!';
      }
    });
  }

  updateRoundInfo();
}

// Disable further clicks after correct answer
function disableClicks() {
  const containers = document.querySelectorAll('.imagesbox');
  containers.forEach(c => {
    c.style.pointerEvents = 'none';
  });
}

// Handle "Next" button clicks
document.getElementById('next').addEventListener('click', () => {
currentRound++;
if (currentRound >= totalRounds) {
// End of game
result.textContent = 'Game over! Thanks for playing!';
document.getElementById('next').style.display = 'none';
} else {
startRound();
}
});

// Handle "Replay" button clicks
document.getElementById('replay').addEventListener('click', () => {
  score = 0;
  currentRound = 0;
  updateScore();
  startRound();
  document.getElementById('next').style.display = 'inline-block';
  result.textContent = '';
});

// Initialize game
updateScore();
startRound();

//quiz
document.getElementById("btnSubmit").addEventListener("click", () => {
  let quizscore = 0;

  const q1 = document.querySelector("input[name='q1']:checked");
  const q2 = document.querySelector("input[name='q2']:checked");

  // Check if answers are selected
  if (q1 && q1.value === "aux1") quizscore++;
  if (q2 && q2.value === "se3") quizscore++;

  document.getElementById("scorebox").textContent = "Score: " + quizscore + "/2";
});

//fullscreen
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);
function enterFullscreen() { //must be called by user generated event
if (document.documentElement.requestFullscreen) {
document.documentElement.requestFullscreen();
} else if (document.documentElement.mozRequestFullScreen) { // Firefox
document.documentElement.mozRequestFullScreen();
} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
document.documentElement.webkitRequestFullscreen();
} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
document.documentElement.msRequestFullscreen();
}
}
function exitFullscreen() {
if (document.exitFullscreen) {
document.exitFullscreen();
} else if (document.mozCancelFullScreen) { // Firefox
document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { // IE/Edge
document.msExitFullscreen();
}
}

//mobile
const hamBtn=document.querySelector("#hamIcon");
const menuItemsList=document.querySelector("nav ul");
hamBtn.addEventListener("click",toggleMenus);
function toggleMenus(){ /*open and close menu*/
//if menuItemsList dont have the class "menuShow", add it, else remove it
menuItemsList.classList.toggle("menuShow");
//if menu is showing (has the class “menuShow”)
if(menuItemsList.classList.contains("menuShow")){
hamBtn.innerHTML="Close Menu"; //change button text to chose menu
}else{ //if menu NOT showing
hamBtn.innerHTML="Open Menu"; //change button text open menu
}
}
