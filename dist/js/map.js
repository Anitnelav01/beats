let myMap;
 
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.748927, 37.599502],
   zoom: 13,
   controls:[],
 });

 const coords = [
    [55.759913,37.581644],[55.754702,37.623016],
    [55.735277,37.593244],[55.744678,37.605898]
];

myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/mark.png",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52],
});

for (let i = 0; i < coords.length; i++) {
  myCollection.add(new ymaps.Placemark(coords[i]));
}

    
  
  myMap.geoObjects.add(myCollection);
  
  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);