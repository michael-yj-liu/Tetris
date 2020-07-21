// The DOMContentLoaded event fires when the inital HTML document has been completed loaded and passed
document.addEventListener('DOMContentLoaded', () => {
  // Use querySelector to look through HTML document and find the elment with class name of grid. Note that the "." is used because we are looking for a class name
  // Now our JavaScript knows evertime we type grid or do something to grid we want it to affect the element with the classname of grid in our HTML file
  const grid = document.querySelector('.grid')
  // We want our JavaScript to talk to all the squares in our grid. Use the querySelectorAll to collect all the divs inside the element of classname, grid
  // Array.from colects all the divs in our grid (200) and turns them into an array we can work with. Now each div will have a specific index number.
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  // Width of our grid in squares
  const width = 10
  let nextRandom = 0
  let timerId

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [width * 2, width * 2 + 1, width + 1, 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width * 2, width * 2 + 1, width + 1, width + 2],
    [0, width, width + 1, width * 2 + 1],
    [width * 2, width * 2 + 1, width + 1, width + 2]
  ]

  const tTetromino = [
    [1, width + 1, width, width + 2],
    [1, width + 1, width * 2 + 1, width + 2],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width + 1, width, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  // What about 8 and 9?? They cut off/wrap over to the next row
  let currentPosition = 4
  // Always draw the first rotation of the radnomly drawn tetromino
  let currentRotation = 0

  // Randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * tetrominoes.length)
  // console.log(random)
  let current = tetrominoes[random][currentRotation]

  // Draw the Tetromino
  function draw () {
    // For each item in the array we want to add the class, tetrimino (found in style.css) which would color the item. forEach adds logic to each item of the array
    current.forEach(index => {
      // We access the CSS style sheet by using classList.add
      squares[currentPosition + index].classList.add('tetromino')
      // console.log(index)
      // console.log(squares)
      // console.log(currentPosition+index)
    })
  }

  // Undraw the tetromino
  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // Make the tetromino move down every second
  // timerId = setInterval(moveDown, 1000)

  // Assign functions to keyCodes. Listen for anytime we press a key on our keyboard
  // we are going to listen out which one was clicked and invoke the control function
  function control (event) {
    // If we press the key that equals keycode 37 we want our tetrmoino to incoke moveLeft()
    if (event.keyCode === 37) {
      moveLeft()
    } else if (event.keyCode === 38) {
      rotate()
    } else if (event.keyCode === 39) {
      moveRight()
    } else if (event.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  // stop function checks if the tetromino has entered a position that is occupied.
  // If so the tetrmonio stops and the next one begins to fall.
  function stop () {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('occupied'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('occupied'))
      // Start a new Tetromino
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      current = tetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayNext()
    }
  }

  // We need a set of rules so JavaScript knows when any of our tetrominos are in a certain index square.
  // We need a rule that will stop our squares if they are in the square with index 10, 20, 30, etc.

  // moveLeft function will visual move the tetromino left by drawing it and then undrawing it
  // in the squares
  function moveLeft () {
    // We start by removing any trace of the shape in it's current location before we start so we have a clean slate
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    // Our shape can only move left or -1 from it's current position in the array
    // if the shape is not at the left edge
    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('occupied'))) {
      currentPosition += 1
    }
    draw()
  }

  // moveRight function
  function moveRight () {
    // We start by removing any trace of the shape in it's current location before we start so we have a clean slate
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    // Our shape can only move right or +1 from it's current position in the array
    // if the shape is not at the right edge already
    if (!isAtRightEdge) currentPosition += 1
    // If some of the squares that make up the tetromino are suddenly in a square that
    // contains the class, 'occupied' we have to push it back a space in the array making
    // them visually appear like they have not moved at all
    if (current.some(index => squares[currentPosition + index].classList.contains('occupied'))) {
      currentPosition -= 1
    }
    // Finally we redraw the tetromino in it's new position
    draw()
  }

  // moveDown function
  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    // stop function gets invoked to check every second
    stop()
  }

  // Rotate the tetromino
  function rotate () {
    undraw()
    currentRotation++
    if (currentRotation === current.length) { // If current rotation is 4, reset back to 0
      currentRotation = 0
    }
    current = tetrominoes[random][currentRotation]
    draw()
  }

  // Show the "up next" tetromino in the mini grid
  const displaySquares = document.querySelectorAll('.mini-grid div') // Note here Array.from is not used like above for variable, squares
  const displayWidth = 4
  let displayIndex = 0

  // The tetrominoes without rotations for our mini grid to display
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // l tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // z tetromino
    [1, displayWidth + 1, displayWidth, displayWidth + 2], // t tetromino
    [0, 1, displayWidth, displayWidth + 1], // o tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // i tetromino
  ]

  // Function to display the "up next" tetromino in the mini grid
  function displayNext () {
    // Remove any trace of a tetrmonio from the mini grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

  // Adding functionality to start/stop button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      displayNext()
    }
  })
})
