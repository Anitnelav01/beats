document.addEventListener('DOMContentLoaded', function(){ 

  let burger = document.querySelector(".burger");
  let overley = document.querySelector(".overlay");
  let close_overlay = document.querySelector(".overlay__close");

  let menu_links = document.querySelectorAll(".menu__link");

  menu_links.forEach(function(x,i){
    x.addEventListener("click", function (e) {
      hideOverlay(overley);
    });
  })


  burger.addEventListener("click", function (e) {
    e.preventDefault();
    overley.classList.add('overlay--active');
  });
  close_overlay.addEventListener("click", function (e) {
    hideOverlay(overley);
  });


  function hideOverlay(overley){
    if(overley.classList.contains('overlay--active')){
      overley.classList.remove('overlay--active');
    }
  }



  //


  


});
