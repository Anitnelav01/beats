const sections = $('section');
const display = $('.maincontent');
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

let inScroll = false;

sections.first().addClass('active');


const countSectionPosition = sectionEq => {
  return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowed";
  
  
  if( menuTheme ==="black"){
    console.log(menuTheme);
    sideMenu.addClass(activeClass);
  }else{
    sideMenu.removeClass("fixed-menu--shadowed");
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

  if(inScroll === false){

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "active");
    

    setTimeout(() => {
      inScroll = false;

      resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
    },1300);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  
  if(direction === 'next' && nextSection.length){
    performTransition(nextSection.index());
  }
  if(direction ==='prev' && prevSection.length){
    performTransition(prevSection.index());
  }
}

$(window).on("wheel",(e) => {
  const deltaY = e.originalEvent.deltaY;

  if(deltaY > 0){
    scrollViewport("next");
  }
  if(deltaY < 0){
    scrollViewport("prev");
  }


});

$(window).on("keydown", (e) =>{
  const tagName = e.target.tagName.toLowerCase();
   if( tagName !== "input" && tagName !== "textarea") {

    switch (e.keyCode) {
      case 38: //prev
        scrollViewport("prev");
        break;
 
        case 40: //next
          scrollViewport("next");
          break;
 
    }
   } 
});

$("[data-scroll-to]").click(e => {
  e.preventDefault();

   const $this = $(e.currentTarget);
   const target = $this.attr("data-scroll-to");
   const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});