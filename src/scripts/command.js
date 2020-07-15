const openItem = item => {
  const container = item.closest(".command__item");
  const contentBlock = container.find(".command__text");
  const textBlock = contentBlock.find(".command__text-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);

}

const closeEveryItem = container => {
  const items = container.find(".command__text");
  const itemContainer = container.find(".command__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$(".command__item-title").click(e =>{
  const $this = $(e.currentTarget);
  const container = $this.closest(".command__items");
  const elemContainer = $this.closest(".command__item");

  if (elemContainer.hasClass("active")){
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
}
  
});
