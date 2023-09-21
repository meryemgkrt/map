export const detectType = (type) => {
  switch (type) {
    case "park":
      return "Park Yeri";
    case "home":
      return "Ev";
    case "job":
      return "İş Yeri";
    case "goto":
      return "Ziyaret edilecek yer";
    case "shop":
      return "Alış-Veriş";
  }
};


export const setStorage=(data)=>{
  // Veriyi local'e göndermek için hazırlar
const strData = JSON.stringify(data)
// Local stroage'ı günceller
localStorage.setItem('notes', strData)
}

var carIcon = L.icon({
  iconUrl:" https://w7.pngwing.com/pngs/993/250/png-transparent-gps-map-mark-pin-rci-mobility-carsharing-vacation-rental-location-logo-company-service-innovation-thumbnail.png",
  iconSize:[70,85],
})
var homeIcon = L.icon({
  iconUrl:"https://www.pngkit.com/png/detail/431-4318409_location-map-pin-home-orange-home-location-icon.png",
  iconSize:[70,85],
})
var  coopanyIcon = L.icon({
  iconUrl:" https://static.thenounproject.com/png/582532-200.png",
  iconSize:[70,85],
})
var  travelIcon = L.icon({
  iconUrl:" https://static.vecteezy.com/system/resources/previews/024/103/653/original/location-marker-with-map-and-compass-3d-illustration-travel-concept-png.png",
  iconSize:[70,85],
})
var  shopIcon = L.icon({
  iconUrl:" https://e7.pngegg.com/pngimages/59/930/png-clipart-computer-icons-map-the-mall-retail-logo.png",
  iconSize:[70,85],
})


export function detecIcon(type){
  switch (type) {
    case "park":
      return carIcon;
    case "home":
      return homeIcon;
    case "job":
      return coopanyIcon;
    case "goto":
      return travelIcon;
    case "shop":
      return shopIcon;
  } 

}