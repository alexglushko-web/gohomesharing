'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
  class PopUp{
    constructor(element, title, items, type = 'radio'){
      title.addEventListener('click', ()=>{
        element.classList.toggle('active')
      })
      
      items.forEach(i => {
        let titleText = title.textContent,
            titleSpan = title.querySelector('span')
          i.addEventListener('click', ()=>{
              if (type === 'radio'){
                if (title.querySelector('span')){
                  title.querySelector('span').textContent = i.textContent
                }
                else{
                  title.textContent = i.textContent
                }
                element.classList.toggle('active')
              }
              if (type === 'checkbox'){
                i.classList.toggle('active')
                titleSpan.innerHTML = ''
                for (let n = 0; n < items.length; n++){
                  if (items[n].classList.contains('active')){
                    titleSpan.insertAdjacentHTML('beforeend', items[n].textContent + ', ')
                  }
                }
                titleSpan.textContent = titleSpan.textContent.slice(0, -2)
                if (titleSpan.textContent.length < 1){
                  titleSpan.textContent = titleText
                }
              }
          })
      })
    }
  }
  
  let startpageCity = document.querySelector('.city'),
      startpageCityTitle = startpageCity.querySelector('.city__title'),
      startpageCityItems = startpageCity.querySelectorAll('.city__item');
  new PopUp(startpageCity, startpageCityTitle, startpageCityItems, );
  outClose(startpageCity)

  let startpageSubway = document.querySelector('.subway'),
      startpageSubwayTitle = startpageSubway.querySelector('.subway__title'),
      startpageSubwayItems = startpageSubway.querySelectorAll('.subway__item')
  new PopUp(startpageSubway, startpageSubwayTitle, startpageSubwayItems);
  outClose(startpageSubway)

  let startpageDropdownPopUps = document.querySelectorAll('.options__item.dropdown._pop-up')
  startpageDropdownPopUps.forEach(element => {
    let title = element.querySelector('.dropdown__title'),
        items = element.querySelectorAll('.dropdown__item')

    new PopUp(element, title, items, 'checkbox');
    outClose(element)
  })

  // >>>>>>>>> STARTPAGE PRICE <<<<<<<<< \\
  let startpage = document.querySelector('.startpage'),
      startpageTimerContainer = startpage.querySelector('.startpage__timer__container'),
      startpageTimerClock = startpage.querySelector('.timer__clock'),
      startpageTimerLine = startpage.querySelector('.timer__all-line'),
      startpageTimerCircle = startpage.querySelector('.timer__circle'),
      standartContainerWidth = getComputedStyle(document.querySelector('.container')).maxWidth.split('px')[0]

  startpageTimerContainer.style.right = (document.body.clientWidth-standartContainerWidth)/2 +'px'
  startpageTimerCircle.setAttribute('r', getComputedStyle(startpageTimerLine).width.split('px')[0]/2)

  let startpageTimerCircleRadius = startpageTimerCircle.r.baseVal.value,
      startpageTimerCircleCircumference = parseInt(2 * Math.PI * startpageTimerCircleRadius + 1),
      startpageTimerIndex = 100


  startpageTimerCircle.style.strokeDasharray = `${startpageTimerCircleCircumference} ${startpageTimerCircleCircumference}`
  startpageTimerCircle.style.strokeDashoffset = startpageTimerCircleCircumference

  function timerProgress(percent) {
    let offset = startpageTimerCircleCircumference - percent / 100 * startpageTimerCircleCircumference
    
    startpageTimerCircle.style.strokeDashoffset  = offset
  }
  timerProgress(0)

  setInterval(()=>{
    let nowDate = moment(Date.now())._d,
        nextDate = moment(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0))._d
    
    let time = (+nextDate - +nowDate) / 1000,
        hours = Math.floor((time/3600)%24),
        minutes = Math.floor((time / 60)%60),
        seconds = Math.floor((time % 60))
    
    seconds = beautyValue(seconds)
    minutes = beautyValue(minutes)

    startpageTimerClock.textContent = hours + ':' + minutes + ':' + seconds

    if (startpageTimerIndex > 0){
        startpageTimerIndex -= 5
        timerProgress(time / (24 * 3600) * 100)
    }

  }, 1000)
  // >>>>>>>>> STARTPAGE PRICE <<<<<<<<< \\

  let startpageFilterBtns = startpage.querySelectorAll('.type__item'),
      startpageFilterItems = startpage.querySelectorAll('.options__list')

  startpageFilterBtns.forEach(i => {
    i.addEventListener('click', ()=>{
        for (let n = 0; n < startpageFilterBtns.length; n++){
            if (startpageFilterBtns[n] == i){
                startpageFilterBtns[n].classList.add('active')
                startpageFilterItems[n].classList.add('active')
            }
            else{
                startpageFilterBtns[n].classList.remove('active')
                startpageFilterItems[n].classList.remove('active')
            }
        }
    })
  })


  // >>>>>>>>> STARTPAGE BOOKING <<<<<<<<< \\

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

  new bookingTerm(document.querySelector('.options__list.mins'), 30, 'mins')
  new bookingTerm(document.querySelector('.options__list.hours'), 1, 'hours')

  
  let startpageCalendarDaysEnd = new Date()
  startpageCalendarDaysEnd.setDate((new Date().getDate()+1))
    
  let startpageCalendars = [
      [startpage.querySelector('.options__list.mins>.calendar')],
      
      [startpage.querySelector('.options__list.hours>.calendar')],

      [startpage.querySelectorAll('.options__list.days>.calendar')[0]],
      [startpage.querySelectorAll('.options__list.days>.calendar')[1], startpageCalendarDaysEnd, 1]
  ]

  startpageCalendars.forEach(i => {
      new Calendar(i[0], i[1], i[2])
      i[0].querySelector('.calendar__btn').addEventListener('click', ()=>{
          i[0].classList.toggle('active')
      })
      
      outClose(i[0])
  })


  // >>>>>>>>> APARTMENTS MAP/LIST <<<<<<<<< \\
  let apartments = document.querySelector('.apartments'),
      apartmentsTypeItems = apartments.querySelectorAll('.type'),
      apartmentsTypeStatus = 'list',
      apartmentsToggle = document.querySelector('.search__item.toggle'),
      map = document.querySelector('.apartments__map'),
      mapTop = apartments.offsetTop

    apartmentsToggle.addEventListener('click', ()=>{
        if (apartmentsTypeStatus == 'list'){
            apartmentsTypeStatus = 'map'
            apartmentsToggle.textContent = 'Список'
            apartmentsTypeItems[0].classList.add('active')
            apartmentsTypeItems[1].classList.remove('active')
            map.style.marginTop = -mapTop + 'px'
            apartments.style.padding = '0 !important'
        }
        else {
            apartmentsTypeStatus = 'list'
            apartmentsToggle.textContent = 'На карте'
            apartmentsTypeItems[0].classList.remove('active')
            apartmentsTypeItems[1].classList.add('active')
            apartments.style.padding = ''
        }
    })

  // >>>>>>>>> STARTPAGE CONVENIENCES <<<<<<<<< \\
    let startpageConveniencesItems = document.querySelectorAll('.conveniences__item')

    startpageConveniencesItems.forEach(i => {i.addEventListener('click', (e)=> {
      i.classList.toggle('active')
    })})

  // >>>>>>>>> APARTMENTS SLIDER <<<<<<<<< \\
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
  let apartmentsListSliders = document.querySelectorAll('.apartments__item__slider')
  apartmentsListSliders.forEach(i => {new Slider(i)})

  // >>>>>>>>> APARTMENTS LIKES <<<<<<<<< \\
  let apartmentsLikeBtns = document.querySelectorAll('.apartments__item__favorite')
      
  apartmentsLikeBtns.forEach(i => {
      i.addEventListener('click', ()=>{
          i.classList.toggle('active')
      })
  })
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

  // >>>>>>>>> WORK SLIDER <<<<<<<<< \\
  let workSteps= document.querySelector('.work__steps')
  let workStepsSlider = new Slider(workSteps, 5000)
  // Media Queries
  function mediaQueries() {
    if (window.matchMedia('(max-width: 1440px)').matches){
      
    }
    if (window.matchMedia('(max-width: 1024px)').matches){
      
    }
    if (window.matchMedia('(max-width: 768px)').matches){
      let startpageFilter = document.querySelector('.filter'),
          startpageFilterTitle = startpageFilter.querySelector('.filter__title')

          startpageFilterTitle.addEventListener('click', ()=>{
            startpageFilter.classList.toggle('active')
          })

      let startpageSubway = document.querySelector('.subway'),
          startpageFilterList = document.querySelector('.filter__list')

      startpageFilterList.insertAdjacentElement('afterbegin', startpageSubway)
    }
    if (window.matchMedia('(max-width: 576px)').matches){
      
    }
    if (window.matchMedia('(max-width: 360px)').matches){
        
    }
  };
    
  mediaQueries()
  window.addEventListener('resize', mediaQueries)
})