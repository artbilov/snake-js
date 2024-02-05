const body = document.body
const playground = document.createElement('section')
const title = document.createElement('h1')
const score = document.createElement('h2')
const table = document.createElement('table')
const grid = document.createElement('tbody')
const gridSize = 20

const snake = [
  { x: 9, y: 9 },
  { x: 9, y: 10 },
  { x: 10, y: 10 },
]

const apple = [
  { x: 7, y: 1 }
]

let dir = "right"

setSize()

createPlayground(gridSize)

render()

document.onkeydown = setDirection

let intervalId = setInterval(runSnake, 3000 / snake.length)

function setDirection(e) {
  if (e.key === 'ArrowDown' && dir !== 'up') dir = 'down'
  else if (e.key === 'ArrowUp' && dir !== 'down') dir = 'up'
  else if (e.key === 'ArrowLeft' && dir !== 'right') dir = 'left'
  else if (e.key === 'ArrowRight' && dir !== 'left') dir = 'right'
  else return

  clearInterval(intervalId)
  intervalId = setInterval(runSnake, 3000 / snake.length)
  runSnake()
}

function setSize() {
  const width = innerWidth - 16 - 3 * (gridSize - 1)
  const height = innerHeight - 8 - table.offsetTop - 3 * (gridSize - 1) - 100
  const space = Math.min(width, height)
  const size = space / gridSize

  table.style.setProperty('--size', size + 'px')
}

function createPlayground(gridSize) {
  title.textContent = 'Snake game'
  score.textContent = 'Length of Snake is: ' + snake.length
  grid.id = 'grid'

  body.append(playground)
  playground.append(title, score, table)
  table.append(grid)

  for (let i = 0; i < gridSize; i++) {
    const tr = document.createElement('tr')
    grid.append(tr)
    for (let j = 0; j < gridSize; j++) {
      const td = document.createElement('td')
      tr.append(td)
    }
  }
}

function runSnake() {
  let targetToPush = getTargetToPush()

  if (targetToPush.x == apple[0].x && targetToPush.y == apple[0].y) {
    apple.shift()
    addApple()
    clearInterval(intervalId)
    intervalId = setInterval(runSnake, 3000 / snake.length)
  } else {
    snake.shift()
  }
  if (snake.some(snakeCell => snakeCell.x === targetToPush.x && snakeCell.y === targetToPush.y)) {
    clearInterval(intervalId)
    console.log('game over')
    // return
  } else {
    snake.push(targetToPush)
    render()
  }
}

function getTargetToPush() {
  const snakeHead = snake.at(-1)
  let result = {}

  if (dir == 'right') {
    result = { x: (snakeHead.x + 1 === gridSize ? (snakeHead.x + 1) % gridSize : snakeHead.x + 1), y: snakeHead.y }
  } else if (dir == 'left') {
    result = { x: (snakeHead.x - 1 < 0 ? snakeHead.x - 1 + gridSize : snakeHead.x - 1), y: snakeHead.y }
  } else if (dir == 'down') {
    result = { x: snakeHead.x, y: (snakeHead.y + 1 === gridSize ? (snakeHead.y + 1) % gridSize : snakeHead.y + 1) }
  } else if (dir == 'up') {
    result = { x: snakeHead.x, y: snakeHead.y - 1 < 0 ? snakeHead.y - 1 + gridSize : snakeHead.y - 1 }
  }
  return result
}

function render() {
  clearBoard()
  renderApple()
  renderSnake()

  score.textContent = score.textContent.replace(/\d*$/, snake.length)
}

function clearBoard() {
  const cells = grid.querySelectorAll('[class]')
  cells.forEach(cell => {
    cell.removeAttribute('class')
  });
}

function addApple() {
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
