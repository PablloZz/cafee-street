// ====================== PLACEHOLDER STYLE ====================== //
const input = document.getElementById('search');
input.value = 'Cappuccino';
input.style.color = '#929292'
input.style.fontFamily = 'Poppins' + ' sans-serif'
input.addEventListener('focus', () => {
  input.value = ''
})

const footInput = document.getElementById('footer__input')
footInput.value = 'Email address'
footInput.style.color = '#929292'
footInput.style.fontFamily = 'Poppins' + ' sans-serif'
footInput.addEventListener('focus', () => {
  footInput.value = ''
})

// ====================== SHOW HIDDEN NAVBAR ====================== //
const bars = document.querySelector('[data-showNavbar]');
const hiddenNavbar = document.querySelector('[data-hiddenNavbar]')

function showNavbar(e) {
  if (e.target.matches('[data-showNavbar]')) {
    hiddenNavbar.classList.toggle('active');
    bars.classList.toggle('active');
  }
    
}

bars.addEventListener('click', showNavbar);
window.addEventListener('resize', () => {
  let w = window.innerWidth;

  if (w > 900) {
    hiddenNavbar.classList.remove('active');
    bars.classList.remove('active');
  } else return
  
})

// ====================== SLIDER FUNCTION ====================== //
function slider(sliderId, slidesId, prevId, nextId, elemWidth) {
  const slider = sliderId
  const slides = slidesId

  let isDragging = false;
  let startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

  const slydeWidth = elemWidth;
  console.log(slydeWidth);


  slides.forEach((slide, index) => {
    const slideImages = Array.from(slide.querySelectorAll('img'));
    slideImages.forEach(slideImage => {
      slideImage.addEventListener('dragstart', e => e.preventDefault())
    })

    // ========== Touch events ========== //
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchmove', touchMove)
    slide.addEventListener('touchend', touchEnd)

    // ========== Mouse events ========== //
    // slide.addEventListener('mousedown', touchStart(index))
    // slide.addEventListener('mousemove', touchMove)
    // slide.addEventListener('mouseup', touchEnd)
    // slide.addEventListener('mouseleave', touchEnd)
  })

  // ========== Disable context menu ========== //
  window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  function touchStart(index) {
    return function (event) {
      currentIndex = index
      startPos = getPositionX(event)
      isDragging = true

      animationID = requestAnimationFrame(animation)
    }
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event)
      currentTranslate = prevTranslate + currentPosition - startPos
    }
  }

  function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
    
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
    
    setPositionByIndex()
  }

  function getPositionX(event) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX
  }

  function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -slydeWidth
    prevTranslate = currentTranslate
    setSliderPosition()
  }

  // ========== Arrows for slider ========== //
  const prev = prevId
  const next = nextId

  let slideIndex = 0;
  let xTrans = 0;


  function plusSlides() {
    slideIndex += 1

    if (slideIndex >= 0) {
      xTrans -= slydeWidth
      slider.style.transform = `translateX(${xTrans}px)`
    }

    if (slideIndex > slides.length - 1) {
      slideIndex = 0
      slider.style.transform = `translateX(${slideIndex * 0})`
      xTrans = 0
    }
  }

  function minusSlides() {
    slideIndex -= 1

    if (slideIndex <= slides.length - 1 && slideIndex >= 0) {
      xTrans += slydeWidth
      slider.style.transform = `translateX(${xTrans}px)`
    }

    if (slideIndex < 0) {
      xTrans = -(slides.length - 1) * slydeWidth;
      slider.style.transform = `translateX(${xTrans}px)`
      slideIndex = slides.length - 1
    }
  }

  prev.addEventListener('click', minusSlides)
  next.addEventListener('click', plusSlides)

  // ======= Hide/Show slider arrows in small screen ======= //
  function arrowsVisibility() {
    if (window.innerWidth <= 550 || window.innerWidth > 1050) {
      prev.style.display = 'none'
      next.style.display = 'none'
    }

    if (window.innerWidth > 550 && window.innerWidth <= 1050) {
      prev.style.display = 'block'
      next.style.display = 'block'
    }
  }

  if (window.innerWidth <= 550) {
    prev.style.display = 'none'
    next.style.display = 'none'
  }

  window.addEventListener('resize', arrowsVisibility)
}

// ====================== FIRST SLIDER ====================== //
const slider1 = document.querySelector('.slider-container');
const slides1 = Array.from(document.querySelectorAll('.slider-container__slide'));
const prev1 = document.getElementById('prev');
const next1 = document.getElementById('next');
const slydeWidth1 = document.querySelector('.gradient_size').offsetWidth + 100;

slider(slider1, slides1, prev1, next1, slydeWidth1)

// ====================== SECOND SLIDER ====================== //
const slider2 = document.querySelector('.slider-container2');
const slides2 = Array.from(document.querySelectorAll('.slider-container__slide2'));
const prev2 = document.getElementById('prev2');
const next2 = document.getElementById('next2');
const slydeWidth2 = document.querySelector('.slider-container__slide2').offsetWidth + 100;

slider(slider2, slides2, prev2, next2, slydeWidth2)



