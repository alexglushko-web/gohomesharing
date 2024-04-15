'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
  // >>>>>>>>> CARD SLIDER <<<<<<<<< \\
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
  let cardSliders= document.querySelectorAll('.object__slider')

  cardSliders.forEach(i => {
    new Slider(i, 0) 
  })

  // >>>>>>>>> CARD TABS <<<<<<<<< \\
  let cardTabsBtns = document.querySelectorAll('.card__tabs>.tabs__list>.tabs__btn'),
      cardTabsItems = document.querySelectorAll('.card__tabs>.tabs__item')

      
  cardTabsBtns.forEach(i => {
      i.addEventListener('click', ()=>{
          for (let n = 0; n < cardTabsBtns.length; n++){
              if (cardTabsBtns[n] == i){
                  cardTabsBtns[n].classList.add('active')
                  cardTabsItems[n].classList.add('active')
              }
              else{
                cardTabsBtns[n].classList.remove('active')
                cardTabsItems[n].classList.remove('active')
              }
          }
      })
  })

  // >>>>>>>>> CARD BOOKING <<<<<<<<< \\
  class bookingTerm{
    constructor(element, min, type){
      this.nowDateHours = new Date().getHours() + 1
      this.nowDateHours + 1 > 23 ?  this.nowDateHours = 0 : ''
      console.log(this.start);
      this.start = element.querySelectorAll('.options__item.time')[0]
      this.startTitle = this.start.querySelector('.time__title>span')
      this.startItems = this.start.querySelectorAll('.time__item')
      this.startHours = this.nowDateHours
      this.startMinutes = 0
      this.startAdd = this.start.querySelector('.time__add')
      this.startRemove = this.start.querySelector('.time__remove')
      
      this.end = element.querySelectorAll('.options__item.time')[1]
      this.endTitle = this.end.querySelector('.time__title>span')
      this.endItems = this.end.querySelectorAll('.time__item')
      this.endHours
      this.endMinutes
      if (type == 'mins'){
        this.endHours = this.nowDateHours
        this.endMinutes = 30
      }
      else{
        this.endHours = this.nowDateHours + 1
        this.endMinutes = 0
      }
      this.endAdd = this.end.querySelector('.time__add')
      this.endRemove = this.end.querySelector('.time__remove')
  
      this.duration = element.querySelector('.duration')
      this.durationTitle = this.duration.querySelector('.duration__title')
      this.durationValue = min

      this.startTitle.textContent = this.startHours + ':' + beautyValue(this.startMinutes)
      this.endTitle.textContent = this.endHours + ':' + beautyValue(this.endMinutes) 
      
      this.durationSet()
      outClose(this.start)
      outClose(this.end)

      this.startTitle.addEventListener('click', ()=>{ this.start.classList.toggle('active'); })
      this.startItems.forEach(i => {
        i.addEventListener('click', ()=>{
          this.startTitle.textContent = i.textContent

          this.startHours = i.textContent.split(':')[0]*1
          this.startMinutes = i.textContent.split(':')[1]*1

          if (this.endHours <= this.startHours){
            if (type = 'mins'){
              this.endHours = this.startHours
              this.endMinutes = 30
            }
            if (type = 'hours'){
              this.endMinutes = 0
              this.timeEndAdd(type)
            }
          }
          this.durationSet()
          this.endTitle.textContent = this.endHours + ':' + beautyValue(this.endMinutes) 
          this.start.classList.remove('active')
        })
      })
      this.endTitle.addEventListener('click', ()=>{ this.end.classList.toggle('active') })
      this.endItems.forEach(i => {
        i.addEventListener('click', ()=>{
          this.endTitle.textContent = i.textContent

          this.endHours = i.textContent.split(':')[0]*1
          this.endMinutes = i.textContent.split(':')[1]*1

          if (this.endHours <= this.startHours){
            if (type == 'mins'){
              this.startHours = this.endHours - 1
              this.startMinutes = 30
            }
            if (type == 'hours'){
              this.startHours = this.endHours - 1
            }
          }

          this.durationSet()
          this.startTitle.textContent = this.startHours + ':' + beautyValue(this.startMinutes) 
          this.end.classList.remove('active')
        })
      })

      this.startAdd.addEventListener('click', ()=>{
          if (type == 'mins'){
            this.startMinutes++
            if (this.startMinutes > 59){
              this.startHours++
              this.startMinutes = 0
            }
            if (this.startHours == 23 && this.startMinutes >= 29){
              this.startHours = 23
              this.startMinutes = 29
            }
            if (this.durationValue < 31){
              this.timeEndAdd('mins')
              this.endTitle.textContent = this.endHours + ':' + beautyValue(this.endMinutes) 
            }
          }
          if (type == 'hours'){
            this.startHours++
            if (this.startHours >= 23){
              this.startHours = 23
              this.startMinutes = 0
            }
            if (this.durationValue/60 < 2){
              this.timeEndAdd(type)
              this.endTitle.textContent = this.endHours + ':' + beautyValue(this.endMinutes) 
            }
          }

          this.startTitle.textContent = this.startHours + ':' + beautyValue(this.startMinutes) 
          this.durationSet()
      })
      this.startRemove.addEventListener('click', ()=>{
        if (type == 'mins'){
          this.startMinutes--
          if (this.startMinutes < 0){
            this.startHours--
            this.startMinutes = 59
          }
          if (this.startHours == -1 ){
            this.startHours = 0
            this.startMinutes = 0
          }
        }
        if (type == 'hours'){
          this.startHours--
          if (this.startHours <= 0){
            this.startHours = 0
            this.startMinutes = 0
          }
        }

        this.startTitle.textContent = this.startHours + ':' + beautyValue(this.startMinutes) 
        this.durationSet()
      })

      this.endAdd.addEventListener('click', ()=>{
        this.timeEndAdd(type)
        this.endTitle.textContent = this.endHours + ':' + beautyValue(this.endMinutes) 
      })
      this.endRemove.addEventListener('click', ()=>{
        if (type == 'mins'){
          if (this.durationValue > 30){
            this.endMinutes--
            if (this.endMinutes < 0){
              this.endHours--
              this.endMinutes = 59
            }
            if (this.endHours == -1 ){
              this.endHours = 0
              this.endMinutes = 0
            }
          }
        }
        if (type == 'hours'){
          if (this.durationValue/60 > 1){
            this.endHours--
          }
          if (this.endMinutes == 59){
            this.endHours++
            this.endMinutes = 0
          }
        }
        this.endTitle.textContent = this.endHours + ':' + beautyValue(this.endMinutes) 
        this.durationSet()
      })
    }

    timeEndAdd(type = 'mins') {
      if (type == 'mins'){
        this.endMinutes++
        if (this.endMinutes > 59){
          this.endHours++
          this.endMinutes = 0
        }
        if (this.endHours == 24 && this.endMinutes == 0){
          this.endHours = 23
          this.endMinutes = 59
        }
      }
      if (type == 'hours'){
        this.endHours++
        if (this.endHours > 23){
          this.endHours = 23
          this.endMinutes = 59
        }
      }
      this.durationSet()
    }
    durationSet() {
      let duration = (this.endHours*60 + this.endMinutes) - (this.startHours*60 + this.startMinutes),
          minutes = duration % 60,
          hours = parseInt(duration / 60)
      
      this.durationValue = duration
      if (hours == 0){
        this.durationTitle.textContent = minutes
      }
      else{
        this.durationTitle.textContent = hours + ':' + beautyValue(minutes)
      }
      this.durationTitle.insertAdjacentHTML('beforeend', '<i class="icon-clock"></i>')
    }
  }
  class Calendar{
    constructor(element, activeDate = new Date(), minDuration = 0){
        this.element = element
        this.date = new Date()
        this.activeDate = activeDate
        this.minDuration = minDuration
        this.months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ]
        this.monthsTitles = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ]

        if (this.element.querySelector('.calendar__actual-time')){
            this.element.querySelector('.calendar__timepicker').value = this.beautyValue(new Date().getHours()+1) + ':00'
            this.element.querySelector('.calendar__actual-time').addEventListener('click', () => {
                let hours = this.beautyValue(new Date().getHours()),
                    minutes = this.beautyValue(new Date().getMinutes())
                
                this.element.querySelector('.calendar__timepicker').value = hours + ':' + minutes
                this.element.querySelector('.calendar__time').innerHTML = hours + ':' + minutes
            })
        }
        if (this.element.querySelector('.calendar__actual-date')){
            this.element.querySelector('.calendar__actual-date').addEventListener('click', () => {
                this.renderCalendar(this.element)
                this.activeDate.setDate(new Date().getDate())
                this.activeDate.setMonth(new Date().getMonth())
                this.activeDate.setFullYear(new Date().getFullYear())
                this.element.querySelector('.calendar__date>p').innerHTML = this.beautyValue(this.activeDate.getDate()) + ' ' + this.beautyValue(this.monthsTitles[this.activeDate.getMonth()]) + ' ' + this.activeDate.getFullYear()
                this.element.querySelector('.calendar__title').innerHTML = this.beautyValue(this.activeDate.getDate()) + '.' + this.beautyValue((this.activeDate.getMonth() + 1)) + '.' + this.activeDate.getFullYear()
                this.correctTime()
            })
        }
        if (this.element.querySelector('.calendar__timepicker')){
            this.element.querySelector('.calendar__timepicker').addEventListener('input', (e) => {
                this.element.querySelector('.calendar__time').innerHTML = e.target.value
                this.correctTime()
            })
        }

        this.element.querySelector('.calendar__prev').addEventListener('click', ()=>{
            this.date.setMonth(this.date.getMonth()-1)
            this.activeDate.setMonth(this.date.getMonth()-1)
            this.activeDate.setFullYear(this.date.getFullYear())
            if (this.activeDate.getMonth() > new Date().getMonth() - 2 || this.activeDate.getFullYear() > new Date().getFullYear()){
                this.renderCalendar(this.element)
            }
            else{
                this.date.setMonth(new Date().getMonth())
                this.activeDate.setMonth(new Date().getMonth())
            }
        })
        this.element.querySelector('.calendar__next').addEventListener('click', ()=>{
            this.date.setMonth(this.date.getMonth()+1)
            this.activeDate.setMonth(this.date.getMonth()-1)
            this.renderCalendar(this.element)
        })
        
        element.querySelector('.calendar__title').innerHTML = this.beautyValue(this.activeDate.getDate()) + '.' + this.beautyValue((this.activeDate.getMonth() + 1)) + '.' + this.activeDate.getFullYear()
        
        if (element.querySelector('.calendar__time')){
            element.querySelector('.calendar__time').innerHTML = (this.activeDate.getHours()+1) + ':00'
        }

        element.querySelector('.calendar__send').addEventListener('click', ()=>{
          element.classList.remove('active')
        })
        this.renderCalendar(this.element)
    }
    renderCalendar(element){
        this.date.setDate(1)
        this.monthDays = element.querySelector('.calendar__days')
        this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
        this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()
        this.firstDayIndex = this.date.getDay()
        this.lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay()
        this.nextDays = 7 - this.lastDayIndex - 1
        this.days = ''
        
        element.querySelector('.calendar__date>span').innerHTML = this.months[this.date.getMonth()]
        element.querySelector('.calendar__date>p').innerHTML = new Date().getDate() + ' ' + this.monthsTitles[new Date().getMonth()] + ' ' + new Date().getFullYear()

        for (let x = this.firstDayIndex - 1 + this.minDuration; x > 0; x--){
            this.days += `<div class="calendar__prev-date">${this.prevLastDay - x + 1 }</div>`
        }
        
        for (let n = 1; n <= this.lastDay; n++){
            if (n === new Date().getDate() && this.date.getMonth() === new Date().getMonth()){
                this.days += `<div class="active">${n + this.minDuration}</div>`
            }
            else{
                this.days += `<div>${n + this.minDuration}</div>`
            }
        }
    
        for (let j = 1; j <= this.nextDays + 1; j++){
            this.days += `<div class="calendar__next-date">${j}</div>`
            this.monthDays.innerHTML = this.days
        }
 
        this.days = element.querySelectorAll('.calendar__days>div')
        
        this.days.forEach(i => {
            if (i.textContent*1 < new Date().getDate() + this.minDuration && this.date.getMonth() == new Date().getMonth() && this.date.getFullYear() == new Date().getFullYear()){
                i.classList.add('calendar__prev-date')
            }
        })

        this.days.forEach(i => {
            i.addEventListener('click', (e)=>{
                if (!(i.classList.contains('calendar__prev-date') && i.classList.contains('calendar__next-date'))){
                    this.days.forEach(item => {item.classList.remove('active')})
                    i.classList.add('active')
                    element.querySelector('.calendar__date>p').innerHTML = i.textContent + ' ' + this.monthsTitles[this.date.getMonth()] + ' ' + this.date.getFullYear()
                    this.activeDate.setDate(i.textContent)
                    this.activeDate.setMonth(this.date.getMonth())
                    this.activeDate.setFullYear(this.date.getFullYear())
                    element.querySelector('.calendar__title').innerHTML = this.beautyValue(this.activeDate.getDate()) + '.' + this.beautyValue((this.activeDate.getMonth() + 1)) + '.' + this.activeDate.getFullYear()
                    this.correctTime()
                }
            })
        })
    }
    beautyValue(value) {
        if (value.toString().length < 2){
            value = '0' + value
        }
        return value
    }
    correctTime(){
        let nowDate = new Date().getDate() + ':' + new Date().getMonth() + ':' + new Date().getFullYear(),
            activeDate = this.activeDate.getDate() + ':' + this.activeDate.getMonth() + ':' + this.activeDate.getFullYear(),
            nowHours = new Date().getHours(),
            activeHours = null,
            nowMinutes = new Date().getMinutes(),
            activeMinutes = null

        if (this.element.querySelector('.calendar__timepicker')){
            activeHours = this.element.querySelector('.calendar__timepicker').value.split(':')[0]*1
            activeMinutes = this.element.querySelector('.calendar__timepicker').value.split(':')[1]*1
        }
            
        if (nowDate == activeDate && activeHours <= nowHours && activeMinutes < nowMinutes){
            this.element.querySelector('.calendar__timepicker').value = nowHours + ':' + nowMinutes
            this.element.querySelector('.calendar__time').innerHTML = nowHours + ':' + nowMinutes
        }
        
        else if (nowDate == activeDate && activeHours < nowHours){
            this.element.querySelector('.calendar__timepicker').value = nowHours + ':' + nowMinutes
            this.element.querySelector('.calendar__time').innerHTML = nowHours + ':' + nowMinutes
        }

        else{

        }
    }
  }
    let cardCalendarDaysEnd = new Date()
    cardCalendarDaysEnd.setDate((new Date().getDate()+1))
    
    let cardCalendars = [
        [document.querySelectorAll('.registration__options__list>.calendar')[0]],
        [document.querySelectorAll('.registration__options__list>.calendar')[1], cardCalendarDaysEnd, 1]
    ]

    cardCalendars.forEach(i => {
        new Calendar(i[0], i[1], i[2])
        i[0].querySelector('.calendar__btn').addEventListener('click', ()=>{
            i[0].classList.toggle('active')
        })
        
        outClose(i[0])
    })

    let cardCalendarStartDate = document.querySelector('.registration__options__list>.start-date'),
        cardCalendarEndDate = document.querySelector('.registration__options__list>.end-date'),
        cardCalendarDuration = document.querySelector('.registration__options__list>.duration'),
        cardCostTitle = document.querySelector('.registration__item.cost>.cost__title'),
        cardPrice = document.querySelector('.registration__price>.type__list>.type__item.active')


    cardCostTitle.textContent = cardPrice.textContent * durationCalc(cardCalendarStartDate, cardCalendarEndDate) + ' руб.'
    cardCalendarDuration.querySelector('.duration__title').textContent = durationCalc(cardCalendarStartDate, cardCalendarEndDate)
    
    cardCalendarStartDate.addEventListener('click', ()=>{
        let duration = durationCalc(cardCalendarStartDate, cardCalendarEndDate)
        cardCostTitle.textContent = cardPrice.textContent * duration + ' руб.'
        cardCalendarDuration.querySelector('.duration__title').textContent = duration
    })
    cardCalendarEndDate.addEventListener('click', ()=>{
        let duration = durationCalc(cardCalendarStartDate, cardCalendarEndDate)
        cardCostTitle.textContent = cardPrice.textContent * duration + ' руб.'
        cardCalendarDuration.querySelector('.duration__title').textContent = duration
    })

    function durationCalc(start, end){
        let startTitle = start.querySelector('.calendar__title').textContent,
            startDay = startTitle.split('.')[0],
            startMonth = startTitle.split('.')[1],
            startYear = startTitle.split('.')[2],
            startTime = start.querySelector('.calendar__time').textContent,
            startHours = startTime.split(':')[0],
            startMinutes = startTime.split(':')[1],
            startDate = new Date(startYear, startMonth-1, startDay, startHours, startMinutes)

        let endTitle = end.querySelector('.calendar__title').textContent,
            endDay = endTitle.split('.')[0],
            endMonth = endTitle.split('.')[1],
            endYear = endTitle.split('.')[2],
            endTime = end.querySelector('.calendar__time').textContent,
            endHours = endTime.split(':')[0],
            endMinutes = endTime.split(':')[1],
            endDate = new Date(endYear, endMonth-1, endDay, endHours, endMinutes)

        let result = (endDate - startDate) / 1000 / 3600

        return result
    }

  // >>>>>>>>> CARD CREDIT CARD <<<<<<<<< \\
    let cardsItems = document.querySelectorAll('.registration__cards__item'),
        cardsItemsTitle = document.querySelectorAll('.registration__cards__item>.cards__title'),
        cardsPayments = document.querySelectorAll('.registration__payment')

    cardsItems.forEach(i => outClose(i))
    cardsItemsTitle.forEach(i => {
        i.addEventListener('click', ()=>{
            for (let n = 0; n < cardsItemsTitle.length; n++){
                if (cardsItemsTitle[n] == i){
                    cardsItems[n].classList.toggle('active')
                }
            }
        })
    })
    cardsPayments.forEach(i => {
        let close = i.querySelector('.payment__close'),
            pay = i.querySelector('.payment__btn'),
            checkbox = i.querySelector('.payment__checkbox'),
            email = i.querySelector('.payment__email')

        checkbox.addEventListener('click', ()=>{
            email.classList.contains('active') ? email.classList.remove('active') : email.classList.add('active')
            
            console.log('ee');
        })

        close.addEventListener('click', closeWindow)
        pay.addEventListener('click', closeWindow)

        function closeWindow() {
            cardsPayments.forEach(i => {
                for (let n = 0; n < cardsPayments.length; n++){
                    if (cardsPayments[n] == i){
                        cardsItems[n].classList.remove('active')
                    }
                }
            })
        }
    })
    
    // General
    function outClose(element) {
        $(document).mouseup(function (e) {
          var container = $(element);
          if (container.has(e.target).length === 0){
              container.removeClass('active')
          }
        });
    }
      
    function beautyValue(value) {
        if (value.toString().length < 2){
            value = '0' + value
        }
        return value
    }
    

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