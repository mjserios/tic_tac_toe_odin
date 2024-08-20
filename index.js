const TicTacToe = (() => {
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    let promptX = prompt("Enter X's name", "Player One");
    let promptO = prompt("Enter O's name", "Player Two");
    let p1Score = 0;
    let p2Score = 0;

    const Player = (name, marker) => {
        return { name, marker  };
    }

    let playerX = Player(promptX, 'X');
    let playerO = Player(promptO, 'O');
    let currentPlayer = playerX;

    const winningCombi = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const cells = document.querySelectorAll('.cell');



    const init = () => {
        cells.forEach(cell => cell.addEventListener('click', handleCell));
        document.querySelector('#playAgain').addEventListener('click', restarter);
        document.querySelector('#p1').textContent = `${playerX.name}: ${p1Score}`;
        document.querySelector('#p2').textContent = `${playerO.name}: ${p2Score}`;
        document.querySelector('.commentary').textContent = `${currentPlayer.name}'s turn`;
    };

    const handleCell = (event) => {
        cellIndex = event.target.dataset.index;
        if (board[cellIndex] != '' || !gameActive) return;

        cellUpdate(event.target, cellIndex);
        checkWinner();
    }

    const cellUpdate = (cell, index) => {
        board[index] = currentPlayer.marker;
        cell.textContent = currentPlayer.marker;
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        document.querySelector('.commentary').textContent = `${currentPlayer.name}'s turn`;
    }

    const checkWinner = () => {
        let roundWin = false;

        for (let i = 0; i < winningCombi.length; i++) {
            const [a, b, c] = winningCombi[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                currentPlayer = currentPlayer === playerX ? playerO : playerX;
                alert(`${currentPlayer.name} has won!`);
                if (currentPlayer === playerX) {
                    p1Score += 1;
                }
                else {
                    p2Score += 1;
                }
                document.querySelector('#p1').textContent = `${playerX.name}: ${p1Score}`;
                document.querySelector('#p2').textContent = `${playerO.name}: ${p2Score}`;
            }
            else if (!board.includes('')) {
                gameActive = false;
                alert("It's a tie!");
            };
        }
    }

    const restarter = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = playerX;
        cells.forEach(cell => cell.textContent = '');
    };



    return { init };
}) ();

TicTacToe.init();