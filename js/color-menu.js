const mesureWidthAccordion = item => { 
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".color-menu__items");
  const titlesBlocks = container.find(".color-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".color-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-Left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return{
    container: reqItemWidth,
    textContainer:reqItemWidth - paddingRight - paddingLeft
  }

};

const closeEveryItemInContainer = container => {
  const items = container.find(".color-menu__item");
  const content = container.find(".color-menu__content");




  items.removeClass("active");
  content.width(0);
};


const openItemAccordion = (item) => {
  
  const hiddenContent = item.find(".color-menu__content");

  item.addClass("active");

 

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if(isMobile){
    hiddenContent.css('width','100%');
    $('.color-menu__item:not(.active)').each(function(i,x){
      $(x).hide();
    })
  }else{
      const reqWidth = mesureWidthAccordion(item);
      hiddenContent.width(reqWidth.container);

      //textBlock.width(reqWidth.textContainer);
  }


};

$(".color-menu__title").on("click", e =>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".color-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".color-menu__items");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if(isMobile){
    container.css("width","100%");    
  }




  if(itemOpened){
    closeEveryItemInContainer(container);
  } else{
    closeEveryItemInContainer(container);
    openItemAccordion(item);
  }
});

$(".color-menu__close").on("click", e => {
  e.preventDefault();


 const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if(isMobile){
    $('.color-menu__content').css('transition','none');
    $('.color-menu__item').each(function(i,x){
      $(x).show();
    })
    $(".color-menu__items").css("width","");
  }
  else{
        $('.color-menu__content').css('transition','0.6s');

  }

 

  closeEveryItemInContainer($(".color-menu__items"));
});