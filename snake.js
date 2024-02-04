const grid = document.querySelector('#grid')

const snake = [
  { x: 9, y: 9 },
  { x: 9, y: 10 },
  { x: 10, y: 10 },
]

let direction = "right"

document.onkeydown = setDirection

function setDirection(e) {
  if (e.key === 'ArrowDown') {
    if (direction !== 'up') direction = 'down'
  } else if (e.key === 'ArrowUp') {
    if (direction !== 'down') direction = 'up'
  } else if (e.key === 'ArrowLeft') {
    if (direction !== 'right') direction = 'left'
  } else if (e.key === 'ArrowRight') {
    if (direction !== 'left') direction = 'right'
  }
}

const apple = [
  { x: 7, y: 1 }
]

render()

// setTimeout(() => {
//   snake.push({ x: 5, y: 1 })
//   snake.shift()

//   render()
// }, 1000)

// setTimeout(() => {
//   snake.push({ x: 6, y: 1 })
//   snake.shift()

//   render()
// }, 2000)

// setTimeout(() => {
//   snake.push({ x: 7, y: 1 })
//   apple.shift()
//   render()
// }, 3000)

// setTimeout(() => {
//   snake.push({ x: 8, y: 1 })
//   snake.shift()

//   render()
// }, 4000)

// setTimeout(() => {
//   snake.push({ x: 9, y: 1 })
//   snake.shift()

//   render()
// }, 5000)



setInterval(() => {

  let targetToPush = getTargetToPush(snake.at(-1), direction)

  if (targetToPush.x == apple[0].x && targetToPush.y == apple[0].y) apple.shift()
  else snake.shift()

  snake.push(targetToPush)
  render()
}, 1000)


function getTargetToPush(snakeHead, dir) {
  let result = {}
  const gridSize = 20
  if (dir == 'right') {
    result = { x: (snakeHead.x + 1 === gridSize ? (snakeHead.x + 1) % gridSize : snakeHead.x + 1), y: snakeHead.y }
  } else if (dir == 'left') {
    result = { x: (snakeHead.x - 1 < 0 ? snakeHead.x - 1 + gridSize : snakeHead.x - 1), y: snakeHead.y }
  } else if (dir == 'down') {
    result = { x: snakeHead.x, y: (snakeHead.y + 1 === gridSize ? (snakeHead.y + 1) % gridSize : snakeHead.y + 1) }
  } else if (dir == 'up') {
    result = { x: snakeHead.x, y: snakeHead.y - 1 < 0 ? snakeHead.y - 1 + gridSize : snakeHead.y -1 }
  }
  return result
}

function render() {
  clearBoard()
  addApple()
  renderApple()
  renderSnake()
}

function clearBoard() {
  const cells = grid.querySelectorAll('[class]')
  cells.forEach(cell => {
    cell.removeAttribute('class')
  });
}

function addApple() {
  if (apple.length > 0) return
  let x = Math.floor(Math.random() * 20)
  let y = Math.floor(Math.random() * 20)

  if (snake.some(cell => cell.x == x && cell.y == y)) addApple()
  else apple.push({ x, y })
}

function renderSnake() {
  for (const cell of snake) {
    const yRow = grid.rows[+cell.y]
    const xCell = yRow.cells[+cell.x]
    xCell.classList.add('snake')
  }
}

function renderApple() {
  for (const cell of apple) {
    const yRow = grid.rows[+cell.y]
    const xCell = yRow.cells[+cell.x]
    xCell.classList.add('apple')
  }
}
