import { detectType, setStorage, detecIcon } from "./helper.js";

//! html den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul");
//! Olay izleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener('click', handleClick);
//!Ortak kullanım
var map;
var notes = JSON.parse(localStorage.getItem('notes')) || [];
var coords = [];
var layerGroup = [];
console.log(notes)
//!Kullanıcının nonumunu öğrenme
navigator.geolocation.getCurrentPosition(loadMap);
//Haritaya tıklanınca çalışılacak fonksiyon
function onMapClick(e) {
  form.style.display = "flex";
  coords = [e.latlng.lat, e.latlng.lng];
}
//! Kullanıcının konumuna göre haritayı ekrana basma
function loadMap(e) {
  /* haritanın kurulumunu yapar */
  map = L.map("map").setView([e.coords.latitude, e.coords.longitude], 14);

  // Haritanın nasıl görüneceğini belirler
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //Haritaya imleç ekleme
layerGroup = L.layerGroup().addTo(map);
// Localden gelen haritaları listelme
renderNoteList(notes);
  //Haritada tıklanma oluştuğunda oluşacak fonksiyon
  map.on("click", onMapClick);
}

//Ekrana imleç basar
 function renderMarker(item){
  // Markırı oluşturur
  L.marker(item.coords, {icon: detecIcon(item.status)})
  // İmleçlerin olduğu katmana ekler
  .addTo(layerGroup)
  // Üzerine tıklanınca popup ekleme
  .bindPopup(`${item.desc}`)
 }

//*Formun gönderilmesi sırasında çalışsın
function handleSubmit(e) {
  e.preventDefault();
  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  notes.push({ id: new Date().getTime(), desc, date, status, coords });

  // Local "stroge'i" güncelleme
setStorage(notes);
  // Notları listeleme
renderNoteList(notes);

// Formu kapatma
form .style.display ='none'
}

// Ekrana notları basma fonksiyonu
function renderNoteList(items) {
// Not alanlarını temizler
  list.innerHTML= '';

  // imleçleri temizler
  layerGroup.clearLayers();
  //Her bir not elemanı için fonksiyon çalıştırır
  items.forEach((item) => {
    const listEle = document.createElement("li");

    // Data'sına sahip olduğu id'i eklme
    listEle.dataset.id=item.id;
    //İçeriği belirleme

    listEle.innerHTML = `
    <div>
            <p>${item.desc}</p>
            <p><span>Tarih:</span>${item.date} </p>
            <p> <span>Durum: </span>${detectType(item.status)} </p>
    </div>
       <i id="fly" class="bi bi-airplane-engines-fill"></i>
       <i id="delete" class="bi bi-trash-fill"></i>
    `;
    //html'deki listedeki elemanı çalıştırma
    list.insertAdjacentElement("afterbegin",listEle);

    //Ekrana bas
    renderMarker(item)
  });
}

// Notlar alanında tıklanma olayını izle

function handleClick (e){
 // güncellinecek elemanın id'sini öğrenme
 const id = e.target.parentElement.dataset.id;
 if (e.target.id === 'delete') {
   // id sini bildğimiz elemanı diziden kaldırma
   notes = notes.filter((note) => note.id != id);

   // local'i gücelle
   setStorage(notes);

   // ekranı güncelle
   renderNoteList(notes);
 }
 if(e.target.id === 'fly'){
  const note = notes.find((note)=>note.id == id);

  map.flyTo(note.coords);
 }
}