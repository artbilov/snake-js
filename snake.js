const grid = document.querySelector('#grid')

const snake = [
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 1 },
]

let direction = 'right'

const apple = [
  { x: 7, y: 1 }
]

render()

setTimeout(() => {
  snake.push({x: 5, y: 1})
  snake.shift()

  render()
}, 1000)

setTimeout(() => {
  snake.push({x: 6, y: 1})
  snake.shift()

  render()
}, 2000)

setTimeout(() => {
  snake.push({x: 7, y: 1})

  render()
}, 3000)





function render() {
  clearBoard()
  renderApple()
  renderSnake()
}

function clearBoard() {
  const cells = grid.querySelectorAll('[class]')
  cells.forEach(cell => {
    cell.removeAttribute('class')
  });
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
