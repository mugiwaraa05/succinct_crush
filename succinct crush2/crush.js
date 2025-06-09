document.addEventListener('DOMContentLoaded', () =>{
const gameOverBox = document.getElementById('game-over-box');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const reactionText = document.getElementById('reaction-text');
const reactions = ['Crab Rush!', 'Prover Crush!', 'Proofer Rush!', 'Prooove!', 'GCrush!'];
restartBtn.addEventListener('click', () => {
  gameOverBox.classList.add('hidden');
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 120;
  timerDisplay.textContent = `Time: ${timeLeft}`;
  sqaures.forEach(square => {
    square.setAttribute('draggable', true);
  }); 
  sqaures.forEach(square => {
    const randomColor = Math.floor(Math.random() * crabColors.length);
    square.style.backgroundImage = crabColors[randomColor];
  });
  timerInterval = setInterval(updateTimer, 1000);
  gameLoopInterval = setInterval(() => {
    moveDown();
    checkColumnForFour();
    checkRowForFour();
    checkColumnForThree();
    checkRowForThree();
  }, 100);
  if (localStorage.getItem('bgMusicPlaying') === 'true') {
  bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
}


});
let lastReactionTime = 0;

function showReaction() {
  const now = Date.now();
  if (now - lastReactionTime < 1500) return; 

  lastReactionTime = now;
  const random = reactions[Math.floor(Math.random() * reactions.length)];
  reactionText.textContent = random;
  reactionText.classList.remove('hidden');

  reactionText.classList.remove('reaction');
  void reactionText.offsetWidth;
  reactionText.classList.add('reaction');

  setTimeout(() => {
    reactionText.classList.add('hidden');
  }, 3000);
}




 const grid = document.querySelector('.grid')
 const width = 8
 const scoreDisplay = document.getElementById('score')
 const sqaures = []
 let timeLeft = 120; 
 const timerDisplay = document.getElementById('timer');
 const popSound = new Audio('sound/pop3.m4a'); 
 popSound.playbackRate = 0.7;
 const bgMusic = new Audio('sound/background.mp3');
bgMusic.loop = true;  
bgMusic.volume = 0.3; 
bgMusic.play();

 let matchedThisCycle = false;



 let score = 0
 const crabColors =[
    'url(crabs/Green.png)',
    'url(crabs/Pink.png)',
    'url(crabs/Blue.png)',
    'url(crabs/Purple.png)',
    'url(crabs/Orange.png)'
 ]
 let canPlaySound = true;

function playMatchSound() {
  if (!canPlaySound) return; // skip if still cooling down

  popSound.currentTime = 0;
  popSound.play();
  canPlaySound = false;

  setTimeout(() => {
    canPlaySound = true;
  }, 400); // adjust cooldown to sound length if needed
}


 function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}`;
    } else {
      clearInterval(timerInterval);
      endGame();
    }
  }

  let timerInterval = setInterval(updateTimer, 1000);

  function endGame() {
  finalScore.textContent = `Your score is ${score}`;
  gameOverBox.classList.remove('hidden');
  sqaures.forEach(square => {
  square.setAttribute('draggable', false);
  bgMusic.pause();

  });

  clearInterval(timerInterval);
  clearInterval(gameLoopInterval);
}


 function createBoard() {
    for (let i = 0; i < width*width; i++) {
      const sqaure = document.createElement('div')
      sqaure.setAttribute('draggable', true)
      sqaure.setAttribute('id', i)
      let randomColor =Math.floor(Math.random()* crabColors.length)
      sqaure.style.backgroundImage = crabColors[randomColor]
      grid.appendChild(sqaure)
      sqaures.push(sqaure)
    }
 }
 createBoard()

 let colorBeingDragged
 let colorBeingReplaced
 let sqaureIdBeingDragged
 let sqaureIdBeingReplaced 
sqaures.forEach(sqaure => sqaure.addEventListener('dragstart', dragStart))
sqaures.forEach(sqaure => sqaure.addEventListener('dragend', dragEnd))
sqaures.forEach(sqaure => sqaure.addEventListener('dragover', dragOver))
sqaures.forEach(sqaure => sqaure.addEventListener('dragenter', dragEnter))
sqaures.forEach(sqaure => sqaure.addEventListener('dragleave', dragLeave))
sqaures.forEach(sqaure => sqaure.addEventListener('drop', dragDrop))

function dragStart(){
colorBeingDragged= this.style.backgroundImage
sqaureIdBeingDragged = parseInt (this.id)
this.classList.add('dragging');
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
   
}

function dragLeave(){
   
}
function dragEnd(){
  this.classList.remove('dragging')
  
 let validMoves = [
    sqaureIdBeingDragged -1,
    sqaureIdBeingDragged -width,
    sqaureIdBeingDragged +1,
    sqaureIdBeingDragged +width
    
    ]
    let validMove = validMoves.includes(sqaureIdBeingReplaced) 


    if (sqaureIdBeingReplaced && validMove){
        sqaureIdBeingReplaced = null   
    } 
    else if (sqaureIdBeingReplaced && !validMove){
        sqaures[sqaureIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        sqaures[sqaureIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
    else sqaures[sqaureIdBeingDragged].style.backgroundImage = colorBeingDragged
}


function moveDown(){
    for (i=0; i< 55; i++){
        if (sqaures[i+width].style.backgroundImage === ''){
            sqaures[i+width].style.backgroundImage = sqaures[i].style.backgroundImage
            sqaures[i].style.backgroundImage = ''
            const firstRow = [1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && sqaures[i].style.backgroundImage === ''){
                let randomColor = Math.floor(Math.random()*crabColors.length)
                sqaures[i].style.backgroundImage = crabColors[randomColor]
                squares[i].classList.add('refill-animation');
            }
        }
    }
}


function checkRowForFour() {
    for (let i = 0; i < 64; i++){
      if(i % width > width -4)continue;
        let rowOfFour = [i, i+1, i+2, i+3]
        let decidedColor = sqaures[i].style.backgroundImage
        const isBlank = sqaures[i].style.backgroundImage === ''
        if (i % width > width - 4) continue // skip last 3 columns

        if (rowOfFour.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
            score+= 4
            scoreDisplay.innerHTML = score
             matchedThisCycle = true;
            
            rowOfFour.forEach(index =>{
                sqaures[index].classList.add('matched')

setTimeout(() => {
  sqaures[index].style.backgroundImage = ''
  sqaures[index].classList.remove('matched')
}, 800) // match animation duration

            })
        }
    }
}
checkRowForFour()


function checkColumnForFour() {
    for (let i = 0; i < 64 - width*3; i++){
        let columnOfFour = [i, i+width, i+width*2, i+width*3]
        let decidedColor = sqaures[i].style.backgroundImage
        const isBlank = sqaures[i].style.backgroundImage === ''

        if (columnOfFour.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
             matchedThisCycle = true;
            columnOfFour.forEach(index =>{
                sqaures[index].classList.add('matched')

setTimeout(() => {
  sqaures[index].style.backgroundImage = ''
  sqaures[index].classList.remove('matched')
}, 800) // match animation duration

            })
        }
    }
}
checkColumnForFour()


//dont encroach mf
function checkRowForThree() {
    for (i = 0; i < 64; i++){
      if (i % width>width -3)continue;
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = sqaures[i].style.backgroundImage
        const isBlank = sqaures[i].style.backgroundImage === ''
        if (i % width > width - 3) continue // skip last 2 columns

        if (rowOfThree.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
            score+= 3
            scoreDisplay.innerHTML = score
            matchedThisCycle = true;
            rowOfThree.forEach(index =>{
                sqaures[index].classList.add('matched')

setTimeout(() => {
  sqaures[index].style.backgroundImage = ''
  sqaures[index].classList.remove('matched')
}, 800) // match animation duration

            })
        }
    }
}
checkRowForThree()


function checkColumnForThree() {
    for (let i = 0; i < 64 - width* 2; i++){
        let columnOfThree = [i, i+width, i+width*2]
        if (i + width * 2 >= sqaures.length) continue; // safely skip invalid columns
        let decidedColor = sqaures[i].style.backgroundImage
        const isBlank = sqaures[i].style.backgroundImage === ''

        if (columnOfThree.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
            score+= 3
            scoreDisplay.innerHTML = score
            matchedThisCycle = true;
            columnOfThree.forEach(index =>{
                sqaures[index].classList.add('matched')

setTimeout(() => {
  sqaures[index].style.backgroundImage = ''
  sqaures[index].classList.remove('matched')
}, 800) // match animation duration

            })
        }
    }
}
checkColumnForThree()





gameLoopInterval = setInterval(() => {
  matchedThisCycle = false; 

  moveDown();
  checkColumnForFour();
  checkRowForFour();
  checkColumnForThree();
  checkRowForThree();

  if (matchedThisCycle) {
    playMatchSound();
    showReaction();
  }
}, 100);







function dragDrop(){
 
 colorBeingReplaced = this.style.backgroundImage 
 sqaureIdBeingReplaced = parseInt(this.id) 
 this.style.backgroundImage = colorBeingDragged
 sqaures[sqaureIdBeingDragged].style.backgroundImage = colorBeingReplaced
}


})