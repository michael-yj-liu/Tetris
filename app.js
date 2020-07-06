// The DOMContentLoaded event fires when the inital HTML document has been completed loaded and passed
document.addEventListener('DOMContentLoaded', () => {
  // Use querySelector to look through HTML document and find the elment with class name of grid. Note that the "." is used because we are looking for a class name
  // Now our JavaScript knows evertime we type grid or do something to grid we want it to affect the element with the classname of grid in our HTML file
  const grid = document.querySelector('.grid')
  // We want our JavaScript to talk to all the squares in our grid. Use the querySelectorAll to collect all the divs inside the element of classname, grid
  // Array.from colects all the divs in our grid (200) and turns them into an array we can work with. Now each div will have a specific index number.
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-butto n')
  // Width of our grid in squares
  const width = 10

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

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  // What about 8 and 9?? They cut off/wrap over to the next row
  let currentPosition = 4
  // Always draw the first rotation of the radnomly drawn tetromino
  let currentRotation = 0

  // Randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)
  // console.log(random)
  let current = theTetrominoes[random][currentRotation]

  // Draw the Tetromino
  function draw() {
    // For each item in the array we want to add the class, tetrimino (found in style.css) which would color the item. forEach adds logic to each item of the array
    current.forEach(index => {
      // We access the CSS style sheet by using classList.add
      squares[currentPosition + index].classList.add('tetromino')
      // console.log(index)
      // console.log(squares)
      console.log(currentPosition+index)
    })
  }
draw()

})
