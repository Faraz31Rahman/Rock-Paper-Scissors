let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoplaying = false;
let intervalId;

//const autoplay = () => {

//};
const html = `Are you sure you want to reset the score? <button class="js-yes yes">Yes</button> <button class="js-no no">No</button>`;
const confirmText = document.querySelector('.js-confirm');
const box = document.querySelector('.overlay');
  document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
      
      confirmText.innerHTML = html;
        box.classList.add('overlayCSS');
        document.querySelector('.js-yes').addEventListener('click', () => {
          deleteButton();
          clearText();
            box.classList.remove('overlayCSS');
        })
        document.querySelector('.js-no').addEventListener('click', () => {
          clearText();
            box.classList.remove('overlayCSS');
        })
    });


const autoButton = document.querySelector('.js-auto-button');
 autoButton
  .addEventListener('click', () => {
    autoplay();
    clearText();
  });
function autoplay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoplaying = true;
    autoButton.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
    autoButton.innerHTML = 'Auto-Play';
  }
}

  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('Rock');
      clearText();
    });

  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('Paper');
      clearText();
    });

  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('Scissors');
      clearText();
    });


  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('Rock');
      clearText();
    } else if (event.key === 'p') {
      playGame('Paper');
      clearText();
    } else if (event.key === 's') {
      playGame('Scissors');
      clearText();
    } 
      else  if (event.key === 'a') {
      autoplay();
      clearText();
    }
      else if (event.key === 'Backspace') {
        confirmText.innerHTML = html;
        box.classList.add('overlayCSS');
        document.querySelector('.js-yes').addEventListener('click', () => {
          deleteButton();
          clearText();
            box.classList.remove('overlayCSS');
        });
        document.querySelector('.js-no').addEventListener('click', () => {
            clearText();
            box.classList.remove('overlayCSS');
        });
      }
  });

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You Lose.'
    } else if (computerMove === 'Paper') {
      result = 'You Win.'
    } else if (computerMove === 'Scissors') {
      result = 'Tie.'
    }

  } else if (playerMove === 'Paper') {
      if (computerMove === 'Rock') {
      result = 'You Win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You Lose.';
    }

  } else if (playerMove === 'Rock') {
      if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You Lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You Win.';
    }
  }

  if (result === 'You Win.') {
    score.wins += 1;
  } else if (result === 'You Lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You

      <img class="move-icon" src="${playerMove}-emoji.png" alt="Player-Move-icon">

      <img class="move-icon" src="${computerMove}-emoji.png" alt="Computer-Move-icon">

      Computer`;

  updateScoreElement();


  };



  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  
  }



function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber > 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
  }

  function deleteButton() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
  };

  function clearText() {
    confirmText.innerHTML = '';
  }
