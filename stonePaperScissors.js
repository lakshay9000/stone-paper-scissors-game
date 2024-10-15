        let computerMove = '';
        let userMove = '';
        let result = '';
        const scores = JSON.parse(localStorage.getItem('scores'))|| {
            wins: 0,
            losses: 0,
            ties: 0
        }
        updateScoreOnWebPage();
        function computerMoveGenerator(){
            const randInt = Math.random();
            if (randInt > 0 && randInt < 1/3){
                computerMove = 'Rock';
            }
            else if(randInt >= 1/3 && randInt < 2/3){
                computerMove = 'Paper';
            }
            else if(randInt >= 2/3 && randInt < 1){
                computerMove = 'Scissors';
            }
            return computerMove;
        }
        let isAutoPlaying = false;
        let intervalId;
        function autoplay(){
            if (!isAutoPlaying){
                intervalId = setInterval(function() {
                    const playerMove = computerMoveGenerator();
                    playGame(playerMove);
                }, 1000)
                isAutoPlaying = true;
            }
            else{
                clearInterval(intervalId);
                isAutoPlaying = false;
            } 
        }
        function playGame(playerMove){
            userMove = playerMove;
            computerMove = computerMoveGenerator();
            if(userMove === 'Rock'){
                if(computerMove === 'Rock'){
                    result = 'Tie';
                }
                else if(computerMove === 'Paper'){
                    result = 'You Lose!';
                }
                else if(computerMove === 'Scissors'){
                    result = 'You Win!';
                }
            }
            else if(userMove === 'Paper'){
                if(computerMove === 'Rock'){
                    result = 'You Win!';
                }
                else if(computerMove === 'Paper'){
                    result = 'Tie';
                }
                else if(computerMove === 'Scissors'){
                    result = 'You Lose!';
                }
            }
            else if(userMove === 'Scissors'){
                if(computerMove === 'Rock'){
                    result = 'You Lose!';
                }
                else if(computerMove === 'Paper'){
                    result = 'You Win!';
                }
                else if(computerMove === 'Scissors'){
                    result = 'Tie'
                }
            }
            if(result === 'You Win!'){
                scores.wins += 1;
            }
            else if(result === 'You Lose!'){
                scores.losses += 1;
            }
            else if(result === 'Tie'){
                scores.ties += 1;
            }
            localStorage.setItem('scores', JSON.stringify(scores))
            updateScoreOnWebPage();
        }
        function updateScoreOnWebPage(){
            document.querySelector('.winning-score').innerHTML = `${scores.wins}`;
            document.querySelector('.losing-score').innerHTML = `${scores.losses}`;
            document.querySelector('.tie-score').innerHTML = `${scores.ties}`;
            document.querySelector('.result').innerHTML = `${result}`;
            let userMoveEmoji = userMove === 'Rock' ? '&#9994;' : userMove === 'Paper' ? '&#9995;' : '&#9996;';
            let computerMoveEmoji = computerMove === 'Rock' ? '&#9994;' : computerMove === 'Paper' ? '&#9995;' : '&#9996;';
            document.querySelector('.selected-move').
            innerHTML = `Your Move: ${userMoveEmoji}  Computer Move: ${computerMoveEmoji}`;
        }
