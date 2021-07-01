// carousel
import Splide from '@splidejs/splide'

// filepond
import * as FilePond from 'filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageFilter from 'filepond-plugin-image-filter'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

// filepond
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageFilter,
  FilePondPluginFileValidateType
)

// Create a FilePond instance
const pond = FilePond.create({
  name: 'filepond',
  allowImagePreview: true,
  imagePreviewMaxHeight: 200,
  acceptedFileTypes: ['image/*'],
  credits: false
})


// Preselected DOM elements and variables
const carousel = document.getElementById('carousel')
const uploadArea = document.getElementById('uploadArea')
const downloadArea = document.getElementById('downloadArea')
const downloadButton = document.getElementById('download')
const restartButton = document.getElementById('restart')


// Add uploadArea including UploadField(FilePond Instance) to the DOM
uploadArea.appendChild(pond.element)


// method to add selected image to slider
const addImage = () => {
  const image = document.querySelector('canvas')
  const slide = document.createElement('div')
  carousel.classList.remove('hidden')
  slide.classList.add('splide__slide')
  const slideList = document.getElementsByClassName('splide__list')[0]
  // if (!image) return
  slide.appendChild(image)
  slideList.appendChild(slide)
}


// Add uploadButton to uploadArea
const uploadButton = document.createElement('button')
uploadButton.innerHTML = 'Upload'
uploadButton.classList.add('upload')
uploadArea.appendChild(uploadButton)


uploadButton.addEventListener('click', () => {
  addImage()

  const carousel = document.getElementById('carousel')
  carousel.classList.remove('hidden')

  const uploadArea = document.getElementById('uploadArea')
  uploadArea.classList.add('hidden')

  downloadArea.classList.remove('hidden')
})


//restart programm
restartButton.addEventListener('click', () => {
  pond.removeFiles()

  const carousel = document.getElementById('carousel')
  carousel.classList.add('hidden')

  const uploadArea = document.getElementById('uploadArea')
  uploadArea.classList.remove('hidden')

  const downloadArea = document.getElementById('downloadArea')
  downloadArea.classList.add('hidden')
})


// download selected image
downloadButton.addEventListener(('click'), () => {
  const link = document.createElement('a')
  link.download = 'image.png'
  link.href = document.querySelector('canvas').toDataURL()
  link.click()

})


//restart programm --- Doenst work (pond needs to be restarted(preview image removed))
restartButton.addEventListener('click', () => {
  pond.removeFiles()
  carousel.removeFiles()
  const carousel = document.getElementById('carousel')
  carousel.classList.add('hidden')

  const uploadArea = document.getElementById('uploadArea')
  uploadArea.classList.remove('hidden')

  const downloadArea = document.getElementById('downloadArea')
  downloadArea.classList.add('hidden')
})


//Carousel
document.addEventListener('DOMContentLoaded', () => {

  let basicOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    speed: 1000,
    interval: 1000 * 5,
    autoplay: true,
    easing: 'cubic-bezier(.645,.045,.335,1)',
    focus: 'center',
    width: 900,
    fixedHeight: '20rem',
    cover: true,
    gap: 25,
    padding: {
      left: '3rem',
      right: '3rem',
    },
    arrows: false,
    pagination: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    keyboard: false,
    drag: false,
    accessibility: true
  }

  let carousel = new Splide('#carousel', basicOptions);
  carousel.mount()
})
