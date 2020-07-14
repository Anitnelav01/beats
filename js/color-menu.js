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
  const reqWidth = mesureWidthAccordion(item);
  item.addClass("active");

  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".color-menu__title").on("click", e =>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".color-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".color-menu__items");

  if(itemOpened){
    closeEveryItemInContainer(container);
  } else{
    closeEveryItemInContainer(container);
    openItemAccordion(item);
  }
});

$(".color-menu__close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($(".color-menu__items"));
});