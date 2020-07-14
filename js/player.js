document.querySelector(".player-panel__action").addEventListener("click", function (e) {
  if(this.classList.contains('player-panel__action--start')){
    this.classList.remove('player-panel__action--start');
    this.classList.add('player-panel__action--stop');
    player.playVideo();
  }else{
    this.classList.remove('player-panel__action--stop');
    this.classList.add('player-panel__action--start');
    player.stopVideo();
  }

});

document.querySelector(".player-panel__progress").addEventListener("click", function (e) {
  var line_width = jQuery('.player-panel__progress').width();
     var pos = jQuery('.player-panel__progress').offset();
     var elem_left = pos.left;
     var Xinner = e.pageX - elem_left;
     var newTime = player.getDuration() * (Xinner / line_width);
     player.seekTo(newTime);
});


document.querySelector(".player-panel__mute").addEventListener("click", function (e) {
  if(this.classList.contains('player-panel__mute--off')){
    this.classList.remove('player-panel__mute--off');
    this.classList.add('player-panel__mute--on');
    player.setVolume(0);
    document.querySelector(".player-panel__volume").value = 0;


  }else{
    this.classList.remove('player-panel__mute--on');
    this.classList.add('player-panel__mute--off');
    player.setVolume(50);
    document.querySelector(".player-panel__volume").value = 50;
  }

});

document.querySelector(".player-panel__volume").addEventListener("change", function (e) {
    var current_volume = document.querySelector(".player-panel__volume").value;
     player.setVolume(current_volume);
});



 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '500',
     playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel': 0 },
     width: '850',
     videoId: 'Y6BKwaW1Op8',
     events: {
       'onReady': onPlayerReady
     }
   });
 }

 function onPlayerReady(event) {
   var player = event.target;
   iframe = document.getElementById('player');
   player.setVolume(50);

   updateProgressBar();

   time_update_interval = setInterval(function () {
     updateProgressBar();
   }, 1000);
 }
 function setupListener() {
   document.getElementById('full').addEventListener('click', playFullscreen);
 }


 function updateProgressBar() {

   var line_width = jQuery('.player-panel__progress').width();
   var persent = (player.getCurrentTime() / player.getDuration());
   jQuery('.player-panel__viewed').css('width', persent * line_width);
   per = persent * 100;
   jQuery('.player-panel__pip').css('left', per + '%');
 }
