var scores, roundScore,activePlayer, dice, gamePlaying;
newGame();

dice = Math.floor(Math.random()*6) +1;
var diceDom =  document.querySelector('.dice')




document.querySelector('.btn-roll').addEventListener('click', rollDice)
document.querySelector('.btn-hold').addEventListener('click', hold)
document.querySelector('.btn-new').addEventListener('click', ()=>{
    window.confirm('Começar um novo jogo?') ? newGame() : ''})


function rollDice(){

    if (gamePlaying) {
                //ramdom number
        dice = Math.floor(Math.random()*6) +1;

        //display the result
    
        diceDom.style.display = 'block';
        diceDom.src = '/my/pig-game/resources/images/dice-' + dice + '.png';

        document.querySelector('#current-' + activePlayer).textContent = dice;

        //Update the round score if the rolled number was not a 1

            if (dice !== 1){
                //add score
                roundScore += dice
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            } else {
                nextPlayer();
            }
    }

}

function hold(){
    if (gamePlaying){
            //Add current score to current player global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer]
    //Check if player won the game
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer).classList.toggle('player-winner');
        document.querySelector('.btn-roll').classList.add('hidden')
        document.querySelector('.btn-hold').classList.add('hidden')

        gamePlaying = false
    } else {
    //Next player
    nextPlayer();

    }
    }
}

function nextPlayer(){
    //next player
    document.querySelector('#current-' + activePlayer).textContent = 0
    document.querySelector('.player-' + activePlayer).classList.toggle('player-active');

    roundScore = 0;
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector('.player-' + activePlayer).classList.toggle('player-active');

    diceDom.style.display = 'none';
}

function newGame(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    document.getElementById('score-0').innerText = 0;
    document.getElementById('score-1').innerText = 0;
    document.getElementById('current-0').innerText = 0;
    document.getElementById('current-1').innerText = 0;

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0').classList.remove('player-winner');
    document.querySelector('.player-1').classList.remove('player-winner');

    document.querySelector('.btn-roll').classList.remove('hidden')
    document.querySelector('.btn-hold').classList.remove('hidden')

    document.querySelector('.player-0').classList.remove('player-active')
    document.querySelector('.player-1').classList.remove('player-active')
    document.querySelector('.player-0').classList.add('player-active')

    gamePlaying = true
   
}
