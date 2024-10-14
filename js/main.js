
const swithTab = (event) => {
  const tabGroup = event.currentTarget.parentNode.parentNode;
  tabGroup
    .querySelector(".tablinks_active")
    .classList.remove("tablinks_active");
  event.currentTarget.classList.add("tablinks_active");
  tabGroup.querySelector('.tab-content__item_active').classList.remove('tab-content__item_active');
  tabGroup.querySelector(`.${event.currentTarget.dataset.tabhref}`).classList.add('tab-content__item_active');
};

document.querySelectorAll(".tabs").forEach((tabGroup) => {
  tabGroup.querySelectorAll(".tablinks").forEach((link) => {
    link.addEventListener("click", (e) => {
      swithTab(e);
    });
  });
});




document.querySelector('header .menu-btn').addEventListener('change', function() {
  if (this.checked){
    document.querySelector('.top_level_bar').classList.add('top_level_bar__mobile_toggle');
    //document.querySelector('.burger-menu').remove(document.querySelector('.header_open_dialog'));
  }
  else{
    document.querySelector('.top_level_bar').classList.remove('top_level_bar__mobile_toggle');
  }
    
});

document.querySelectorAll('.custom-select').forEach(function(select) {
  select.addEventListener('click', function() {
      this.classList.toggle('open');
  });
  
document.querySelectorAll('.custom-option').forEach(function(option) {
    option.addEventListener('click', function() {
        const selectTrigger = this.closest('.custom-select').querySelector('.custom-select-trigger');
        const realSelect = this.closest('.custom-select').querySelector('.real-select');
        console.log(realSelect);

        selectTrigger.textContent = this.textContent;
        realSelect.value = this.dataset.value;

        this.closest('.custom-select').classList.remove('open');
    });
  });
});

window.addEventListener('click', function(e) {
  const customSelect = document.querySelectorAll('.custom-select');
  customSelect.forEach(function(select) {
      if (!select.contains(e.target)) {
          select.classList.remove('open');
      }
  });
});
