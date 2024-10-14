import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const header = document.querySelector('header');

const swiper = new Swiper('.swiper', {
    rewind: true,
    navigation: {
      nextEl: '.header-swiper-button-next',
      prevEl: '.header-swiper-button-prev',
    },
    on: {
      slideChange: function() {
        const slideCurrentIndex = this.realIndex;
        if (this.slides[slideCurrentIndex].classList.contains('swiper-slide')){
          
          setTimeout(() => {
            header.style.transition = 'opacity 50ms';
            header.style.opacity = 0.3;

            setTimeout(() => {
              header.style.transition = 'opacity 100ms';
            header.style.opacity = 1;
              header.style.backgroundImage = `url('${this.slides[slideCurrentIndex].dataset.bg}')`;

            }, 50);
          }, 50);
          
        }
      }
    }
  });



const searchRow = document.querySelector('.search-row');

document.querySelector('.search-box_entry').addEventListener('focus', () =>{
  searchRow.classList.add('search-row_search_mode');
});

document.querySelector('.close-search-mode-button').addEventListener('click', () => {
  searchRow.classList.remove('search-row_search_mode');
  
});

// filler
document.querySelector('.search-box_entry').addEventListener('input', function() {
  if (this.value.length > 0){
    document.querySelector('.search-result_block').classList.add('search-result_block_active');
  }
});

document.querySelector('.close-search-mode-button').addEventListener('click', () => {
  document.querySelector('.search-result_block').classList.remove('search-result_block_active');
  
});

