'use strict'
window.addEventListener('DOMContentLoaded', ()=> {

  // Media Queries
  function mediaQueries() {
    if (window.matchMedia('(max-width: 768px)').matches){
      let header = document.querySelector('.header'),
                headerMenu = header.querySelector('.header__menu'),
                headerLogo = header.querySelector('.header__logo'),
                headerIcons = header.querySelector('.header__icons'),
                headerHeight = header.offsetHeight
                
            let headerMenuLogo = headerLogo.cloneNode(true)
            headerMenu.insertAdjacentElement('afterbegin', headerMenuLogo)
            headerMenu.insertAdjacentElement('beforeend', headerIcons)

            let headerBurger = header.querySelector('.header__burger')
            headerBurger.addEventListener('click', ()=>{ 
                header.classList.toggle('active')
            })

            window.addEventListener('click', (e)=>{
                if (!(e.target.classList.value.includes('header__') || e.target.parentNode.classList.value.includes('header'))){
                    header.classList.remove('active')
                    document.body.style.overflow = ''
                }
            })

            window.addEventListener('scroll', ()=>{
                if(window.pageYOffset > 54){
                    header.classList.add('fixed')
                    document.body.style.paddingTop = '111.8px'
                }
                else{
                    header.classList.remove('fixed')
                    document.body.style.paddingTop = ''
                }
            })
    }
    if (window.matchMedia('(max-width: 576px)').matches){
      
    }
    if (window.matchMedia('(max-width: 360px)').matches){
        
    }
  };
    
  mediaQueries()
  window.addEventListener('resize', mediaQueries)
})