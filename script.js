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

    removeDropIndicator()
  })

  poster.addEventListener('dragover', (event) => {
    event.preventDefault()

    if (poster === draggedPoster) {
      return
    }

    const rect = poster.getBoundingClientRect()
    const mouseX = event.clientX

    const isLeftHalf = mouseX < rect.left + rect.width / 2

    showDropIndicator(poster, isLeftHalf)
  })

  poster.addEventListener('dragleave', (event) => {
    if (!poster.contains(event.relatedTarget)) {
      removeDropIndicator()
    }
  })

  poster.addEventListener('drop', (event) => {
    event.preventDefault()

    if (poster === draggedPoster) {
      return
    }

    const rect = poster.getBoundingClientRect()
    const mouseX = event.clientX

    const isLeftHalf = mouseX < rect.left + rect.width / 2

    movePoster(poster, isLeftHalf)

    removeDropIndicator()
    renderPosters()
  })
}

// Indicator

function showDropIndicator(poster, isLeft) {
  removeDropIndicator()

  const indicator = document.createElement('div')
  indicator.classList.add('drop-indicator')

  const rect = poster.getBoundingClientRect()
  const gridRect = posterGrid.getBoundingClientRect()

  if (isLeft) {
    indicator.style.left = `${rect.left - gridRect.left - 2}px`
  } else {
    indicator.style.left = `${rect.right - gridRect.left - 1}px`
  }

  indicator.style.top = `${rect.top - gridRect.top}px`

  posterGrid.append(indicator)
}

// Update

function updateGrid() {
  posterGrid.style.gridTemplateColumns = `repeat(${settings.columns}, 180px)`

  posterGrid.style.gap = `${settings.gap}px`

  document.body.style.background = settings.background
}
