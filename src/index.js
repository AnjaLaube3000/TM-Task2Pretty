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


// Filter instances of FilePond.
const pond1 = FilePond.create({
  name: 'filter1',
  allowImageFilter: true,
  imageFilterColorMatrix: [
    0.299, 0.587, 0.114, 0, 0,
    0.299, 0.587, 0.114, 0, 0,
    0.299, 0.587, 0.114, 0, 0,
    0.0, 0.0, 0.0, 1, 0,
  ]
})

const pond2 = FilePond.create({
   name: 'filter2',
   allowImageFilter: true,
   imageFilterColorMatrix: [
     1.000,  0.000,  0.000,  0.000,  0.800,
     0.200,  0.200,  0.300,  0.000,  0.000,
     0.100,  0.000,  0.000,  0.000,  0.200,
     0.000,  0.000,  0.000,  1.000,  0.000
   ]
})

const pond3 = FilePond.create({
   name: 'filter3',
   allowImageFilter: true,
   imageFilterColorMatrix: [
     0.600,  0.000,  0.300,  0.000,  0.000,
     0.200,  0.000,  0.400,  0.000, 0.000,
     0.100,  0.000,  0.700,  0.000,  0.000,
     0.000,  0.000,  0.000,  1.000,  0.000
   ]
 })

// all instances process same file
pond.on('addfile', () => {
  pond1.addFile(pond.getFile().file)
  pond2.addFile(pond.getFile().file)
  pond3.addFile(pond.getFile().file)
  pond1.processFiles()
  pond2.processFiles()
  pond3.processFiles()
})


// Preselected DOM elements and variables
const carousel = document.getElementById('carousel')
const uploadArea = document.getElementById('uploadArea')
const downloadArea = document.getElementById('downloadArea')
const downloadButton = document.getElementById('download')
const restartButton = document.getElementById('restart')
let carouselSplide


// Add uploadArea including UploadField(FilePond Instance) to the DOM
uploadArea.appendChild(pond.element)


// Add instances to hidden div to the DOM
const hiddenDiv = document.getElementById('hidden-div')
hiddenDiv.classList.add('hidden')
hiddenDiv.appendChild(pond1.element)
hiddenDiv.appendChild(pond2.element)
hiddenDiv.appendChild(pond3.element)


// method to add selected image to slider
const addImage = (image) => {
  if (!image) return
  const slide = document.createElement('div')
  carousel.classList.remove('hidden')
  slide.classList.add('splide__slide')
  slide.appendChild(image)
  carouselSplide.add(slide)
  hiddenDiv.classList.add('hidden')
}


// UploadButton (DOM and functionality)
const uploadButton = document.createElement('button')
uploadButton.innerHTML = 'Upload'
uploadButton.classList.add('custom')
uploadArea.appendChild(uploadButton)

uploadButton.addEventListener ('click', () => {
  addImage(pond.element.querySelector('canvas'))
  addImage(pond1.element.querySelector('canvas'))
  addImage(pond2.element.querySelector('canvas'))
  addImage(pond3.element.querySelector('canvas'))

  const carousel = document.getElementById('carousel')
  carousel.classList.remove('hidden')

  const uploadArea = document.getElementById('uploadArea')
  uploadArea.classList.add('hidden')

  downloadArea.classList.remove('hidden')
})


// // download selected image
// click event on splide_slide on Focus/in Center
downloadButton.addEventListener(('click'), () => {
  // const downloadArea = document.getElementById('downloadArea')
  const link = document.createElement('a')
  link.download = 'filename.png'
  link.href = document.querySelector('canvas').toDataURL()
  link.click()
  // let chosenImage = document.getElementById('carousel-slide01').toDataURL()
  // chosenImage.click()
})


//restart programm --- Doenst work (pond needs to be restarted(preview image removed))
restartButton.addEventListener ('click', () => {
  pond.removeFiles()

  const carousel = document.getElementById('carousel')
  carousel.classList.add('hidden')

  const uploadArea = document.getElementById('uploadArea')
  uploadArea.classList.remove('hidden')

  const downloadArea = document.getElementById('downloadArea')
  downloadArea.classList.add('hidden')
})



// Carousel
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
    arrows: true,
    pagination: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    keyboard: false,
    drag: false,
    accessibility: true
  }

  carouselSplide = new Splide('#carousel', basicOptions)
  carouselSplide.mount()
})
