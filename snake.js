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
  snake.push({ x: 5, y: 1 })
  snake.shift()

  render()
}, 1000)

setTimeout(() => {
  snake.push({ x: 6, y: 1 })
  snake.shift()

  render()
}, 2000)

setTimeout(() => {
  snake.push({ x: 7, y: 1 })
  apple.shift()
  render()
}, 3000)

setTimeout(() => {
  snake.push({ x: 8, y: 1 })
  snake.shift()

  render()
}, 4000)

setTimeout(() => {
  snake.push({ x: 9, y: 1 })
  snake.shift()

  render()
}, 5000)



setInterval( () => {
   
  snake.push(targetToPush)
  snake.shift()

  render()
}, 1000, direction)




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
