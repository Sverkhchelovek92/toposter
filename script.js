const addPostersButton = document.getElementById('addPostersButton')
const posterInput = document.getElementById('posterInput')
const posterGrid = document.getElementById('posterGrid')

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
