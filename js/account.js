'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    // -- Private -- \\
    let privateSection = document.querySelector('.private')

    // Private Tabs
    let privateTabsBtns = privateSection.querySelectorAll('.private__list-item'),
        privateTabsItems = privateSection.querySelectorAll('.private__content-item')

    privateTabsBtns.forEach(i => {
        i.addEventListener('click', (e)=>{
            for (let n = 0; n < privateTabsBtns.length; n++){
                if (e.target == privateTabsBtns[n] && !e.target.classList.contains('exit')){
                    privateTabsItems.forEach(i => i.classList.remove('active'))
                    privateTabsItems[n].classList.add('active')
                }
                if (e.target.classList.contains('exit')){
                    console.log('EXIT');
                }
            }
        })
    })

    // Private Dropdown

    let privateSectionDropdownItems = privateSection.querySelectorAll('.private__dropdown-item'),
        privateSectionDropdownTitles = privateSection.querySelectorAll('.private__dropdown__title')

    privateSectionDropdownTitles.forEach(i => { 
        i.addEventListener('click', ()=>{
            for (let n = 0; n < privateSectionDropdownTitles.length; n++){
                if (privateSectionDropdownTitles[n] == i){
                    privateSectionDropdownItems[n].classList.toggle('active')
                }
            }
        })
     })

    // Private History
    // let privateSectionDropdownItems = privateSection.querySelectorAll('.private__history__days__list-item'),
    //     privateSectionDropdownTitles = privateSection.querySelectorAll('.private__dropdown__title')

    // privateSectionDropdownTitles.forEach(i => { 
    //     i.addEventListener('click', ()=>{
    //         for (let n = 0; n < privateSectionDropdownTitles.length; n++){
    //             if (privateSectionDropdownTitles[n] == i){
    //                 privateSectionDropdownItems[n].classList.toggle('active')
    //             }
    //         }
    //     })
    // })

    // Private Slider
    class Slider{
        constructor(slider){
            this.slider = slider
            this.row = slider.querySelector('.slider__row')
            this.items = slider.querySelectorAll('.slider__item')
            this.indents = getComputedStyle(this.slider).getPropertyValue('--indents').split('px')[0]*1
            this.quantity = getComputedStyle(this.slider).getPropertyValue('--quantity')*1
            this.prev = slider.querySelector('.slider__toggle.prev')
            this.next = slider.querySelector('.slider__toggle.next')
            this.dots = slider.querySelectorAll('.slider__dots-item')
            this.index = 0
            

            this.next.addEventListener('click', ()=>{
                this.index++
                this.toggleSlider()
            })
            
            this.prev.addEventListener('click', ()=>{
                this.index--
                this.toggleSlider()
            })

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
        }

        toggleSlider(){
            if (this.index > this.items.length - this.quantity){
                this.index = 0
            }
            if (this.index < 0){
                this.index = this.items.length - this.quantity
            }
            // console.log(`calc(${-this.index}*((100% - ${this.indents}px)/${this.quantity}) )`);
            console.log(this.items[0].offsetWidth);
            this.row.style.left = -this.index*(this.items[0].offsetWidth + this.indents) + 'px'

            this.dots.forEach(i => {i.classList.remove('active')})
            this.dots[this.index].classList.add('active')
        }

    }
    let privateSliders = document.querySelectorAll('.slider')
    
    privateSliders.forEach(i => {new Slider(i)})


    function mediaQueries() {
        if (window.matchMedia('(max-width: 640px)').matches){
            
        }
        if (window.matchMedia('(max-width: 360px)').matches){
            
        }
    }

    // Private Bank Cards
    let cards = [
            {name: 'Иван Иванов Иванович', number: '4561 4568 1381 5912', date: new Date(), cvc: 159},
            {name: 'Денис Денисов Денисович', number: '2985 4198 3573 2894', date: new Date(), cvc: 289},
            {name: 'Денис Денисов Денисович', number: '2985 4198 3573 2899', date: new Date(), cvc: 289},
            {name: 'Денис Денисов Денисович', number: '2985 4198 3573 2895', date: new Date(), cvc: 289}
        ],
        cardsList = document.querySelector('.private__card__list'),
        cardNew = document.querySelector('.private__card__new'),
        cardNewBtn = document.querySelector('.private__card__new>.private__btn'),
        cardAdd = document.querySelector('.private__card__add'),
        cardAddBtn = document.querySelector('.private__card__add>.private__btn'),
        cardRemoveBtns
    
    cardNewBtn.addEventListener('click', ()=>{
        cardNew.style.display = 'none'
        cardAdd.style.display = 'block'
    })
    cards.length > 0 ? rootCard() : ''
    cardAdd.querySelector('.private__card__number').addEventListener('input', cardNumberFormat)
    cardAddBtn.addEventListener('click', ()=>{
        let id = cards.length + 1,
            name = cardAdd.querySelector('.private__card__name'),
            number = cardAdd.querySelector('.private__card__number'),
            date = cardAdd.querySelector('.private__card__date'),
            cvc = cardAdd.querySelector('.private__card__cvc')

        if (number.value.length == 19){
            cards.push({name: name.value, number: number.value, date: date.value, cvc: cvc.value})
            console.log(cards);
            rootCard()
        }
        number.addEventListener('input', cardNumberFormat)

    })
    function rootCard() {
        cardsList.innerHTML = ''
        cards.forEach(i =>{
            cardsList.insertAdjacentHTML('beforeend', `
                <div class="cards__item private__card__item">
                    <span class="cards__title">
                        <i class="icon-card"></i> 
                        <span>**** **** **** ${i.number.split(' ')[3]}</span> 
                        <i class="icon-close"></i>
                    </span>
                </div>
            `)
        })
        cardRemoveBtns = document.querySelectorAll('.private__card__item>.cards__title>.icon-close')
        cardRemoveBtns.forEach(i => {
            i.addEventListener('click', ()=>{
                cardRemoveBtns = document.querySelectorAll('.private__card__item>.cards__title>.icon-close')
                for (let n = 0; n < cardRemoveBtns.length; n++){
                    if (cardRemoveBtns[n] == i){
                        console.log(n);
                        cards.splice(n, 1)
                        rootCard()
                        cardRemoveBtns = document.querySelectorAll('.private__card__item>.cards__title>.icon-close')
                    }
                }
                if (cards.length < 1){
                    cardsList.innerHTML = '<p class="private__card__empty"><i class="icon-danger"></i> Пока в Вашем списке нет банковских карт.</p>'
                }
            })
        })
    }
    function cardNumberFormat() {
        var vcc = this.value.replace(/\D/g, '');
        this.value = '';
        for(var i = 0; i < vcc.length; i++) {
            this.value += (i%4==0 && i != 0 ? ' ' : '') + vcc[i];
        }
    }
    
    
    mediaQueries()
})