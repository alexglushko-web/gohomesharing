'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
  // >>>>>>>>> WORK SLIDER <<<<<<<<< \\
  class Slider{
      constructor(slider, interval = 0){
          this.slider = slider
          this.row = slider.querySelector('.slider__row')
          this.items = slider.querySelectorAll('.slider__item')
          this.indents = getComputedStyle(this.slider).getPropertyValue('--indents').split('px')[0]*1
          this.quantity = getComputedStyle(this.slider).getPropertyValue('--quantity')*1
          this.prev = slider.querySelector('.slider__toggle.prev')
          this.next = slider.querySelector('.slider__toggle.next')
          this.dots = slider.querySelectorAll('.slider__dots-item')
          this.index = 0
          this.interval = interval
          
          if (this.next){
              this.next.addEventListener('click', ()=>{
                  this.index++
                  this.toggleSlider()
              })
          }
          
          if (this.prev){
              this.prev.addEventListener('click', ()=>{
                  this.index--
                  this.toggleSlider()
              })
          }

          if (this.dots){
              this.dots.forEach(dot => {
                  dot.addEventListener('click', (e)=>{
                      for (let n = 0; n < this.dots.length; n++){
                          if (this.dots[n] === e.target){
                              this.dots[n].classList.add('active')
                              this.index = n
                              this.toggleSlider()
                          }
                          else{
                              this.dots[n].classList.remove('active')
                          }
                      }
                  })
              })
          }

          if (this.interval > 0){
                  setInterval(()=>{
                      this.index++
                      this.toggleSlider()
                  }, this.interval)
          }
      }

      toggleSlider(){
          if (this.index > this.items.length - this.quantity){
              this.index = 0
          }
          if (this.index < 0){
              this.index = this.items.length - this.quantity
          }

          if (this.dots){
              this.dots.forEach(i => {i.classList.remove('active')})
              this.dots[this.index].classList.add('active')
          }
          this.row.style.left = -this.index*(this.items[0].offsetWidth + this.indents) + 'px'
      }

  }
  let workSteps= document.querySelector('.work__steps')
  let workStepsSlider = new Slider(workSteps, 5000)

  // >>>>>>>>> CHECKMARKS DROPDOWN <<<<<<<<< \\
  let dropdown = document.querySelectorAll('.dropdown ')

  dropdown.forEach(i => {
      if (i.querySelector('.dropdown__title')){
        let title = i.querySelector('.dropdown__title')
        title.addEventListener('click', ()=>{
            i.classList.toggle('active')
        })
      }
  })


  // Media Queries
  function mediaQueries() {
    if (window.matchMedia('(max-width: 1440px)').matches){
      
    }
    if (window.matchMedia('(max-width: 1024px)').matches){
      
    }
    if (window.matchMedia('(max-width: 768px)').matches){
      
    }
    if (window.matchMedia('(max-width: 576px)').matches){
      
    }
    if (window.matchMedia('(max-width: 360px)').matches){
        
    }
  };
    
  mediaQueries()
  window.addEventListener('resize', mediaQueries)
})