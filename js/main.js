document.addEventListener('DOMContentLoaded', function(){ 

  let burger = document.querySelector(".burger");
  let overley = document.querySelector(".overlay");
  let close_overlay = document.querySelector(".overlay__close");


  burger.addEventListener("click", function (e) {
    overley.classList.add('overlay--active');
  });
  close_overlay.addEventListener("click", function (e) {
    overley.classList.remove('overlay--active');

  });



});
