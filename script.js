const addPostersButton = document.getElementById('addPostersButton')
const posterInput = document.getElementById('posterInput')
const posterGrid = document.getElementById('posterGrid')

const columnsInput = document.getElementById('columnsInput')
const gapInput = document.getElementById('gapInput')
const backgroundInput = document.getElementById('backgroundInput')

const settings = {
  columns: 5,
  posterSize: 180,
  gap: 10,
  background: '#202020',
}

addPostersButton.addEventListener('click', () => {
  posterInput.click()
})

posterInput.addEventListener('change', () => {
  const files = posterInput.files

  for (const file of files) {
    const imageUrl = URL.createObjectURL(file)

    const poster = document.createElement('div')
    poster.classList.add('poster')

    const image = document.createElement('img')
    image.src = imageUrl

    poster.append(image)
    posterGrid.append(poster)
  }
})

columnsInput.addEventListener('input', () => {
  settings.columns = Number(columnsInput.value)
  updateGrid()
})

gapInput.addEventListener('input', () => {
  settings.gap = Number(gapInput.value)
  updateGrid()
})

backgroundInput.addEventListener('input', () => {
  settings.background = backgroundInput.value
  updateGrid()
})

function updateGrid() {
  posterGrid.style.gridTemplateColumns = `repeat(${settings.columns}, ${settings.posterSize}px)`

  posterGrid.style.gap = `${settings.gap}px`

  document.body.style.background = settings.background

  const posters = document.querySelectorAll('.poster')

  posters.forEach((poster) => {
    poster.style.width = `${settings.posterSize}px`
    poster.style.height = `${settings.posterSize * 1.5}px`
  })
}
