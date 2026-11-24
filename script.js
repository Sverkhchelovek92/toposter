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

const posters = []

let draggedPoster = null

addPostersButton.addEventListener('click', () => {
  posterInput.click()
})

posterInput.addEventListener('change', () => {
  const files = posterInput.files

  for (const file of files) {
    const poster = {
      id: crypto.randomUUID(),
      file: file,
      url: URL.createObjectURL(file),
    }

    posters.push(poster)
  }

  renderPosters()

  posterInput.value = ''
})

// Settings

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

// Render

function renderPosters() {
  posterGrid.innerHTML = ''

  for (const posterData of posters) {
    const poster = document.createElement('div')

    poster.classList.add('poster')
    poster.draggable = true
    poster.dataset.id = posterData.id

    const image = document.createElement('img')
    image.src = posterData.url

    poster.append(image)
    posterGrid.append(poster)

    setupDragAndDrop(poster)
  }

  updateGrid()
}

// Drag & drop

function setupDragAndDrop(poster) {
  poster.addEventListener('dragstart', () => {
    draggedPoster = poster
    poster.classList.add('dragging')
  })

  poster.addEventListener('dragend', () => {
    draggedPoster = null
    poster.classList.remove('dragging')

    document.querySelectorAll('.poster').forEach((poster) => {
      poster.classList.remove('drag-over')
    })
  })

  poster.addEventListener('dragover', (event) => {
    event.preventDefault()

    if (poster !== draggedPoster) {
      poster.classList.add('drag-over')
    }
  })

  poster.addEventListener('dragleave', () => {
    poster.classList.remove('drag-over')
  })

  poster.addEventListener('drop', (event) => {
    event.preventDefault()

    if (poster === draggedPoster) {
      return
    }

    const draggedId = draggedPoster.dataset.id
    const targetId = poster.dataset.id

    const draggedIndex = posters.findIndex((poster) => poster.id === draggedId)

    const targetIndex = posters.findIndex((poster) => poster.id === targetId)

    const temp = posters[draggedIndex]

    posters[draggedIndex] = posters[targetIndex]
    posters[targetIndex] = temp

    poster.classList.remove('drag-over')

    renderPosters()
  })
}

// Update

function updateGrid() {
  posterGrid.style.gridTemplateColumns = `repeat(${settings.columns}, 180px)`

  posterGrid.style.gap = `${settings.gap}px`

  document.body.style.background = settings.background
}
