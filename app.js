'use strict'
const ipAddressEl = document.querySelector('.ipAddress');
const locationEl = document.querySelector('.location');
const timeZoneEl = document.querySelector('.timezone');
const ispEl = document.querySelector('.isp')


const ipTracker = async (ipAddress) => {
 try{
  const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_0AHg1rC6SBBqMdBbbfHtrKjymjJVf&ipAddress=${ipAddress}`);
  const data = await res.json();
  const {lat, lng} = data.location;
  ipAddressEl.textContent = data.ip;
  locationEl.textContent = `${data.location.city} ${data.location.postalCode}`;
  timeZoneEl.textContent = `UTC ${data.location.timezone}`;
  ispEl.textContent = data.isp
  console.log(lat, lng);
  displayMap(data)
}catch(error){
    alert('enter correct ip')
}
}

ipTracker('')

const map = L.map('map', {zoomControl: false});

const displayMap = (data) => {
  const { lat, lng } = data.location

  map.setView([lat, lng], 13)

  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map)

  const markerIcon = L.icon({
    iconUrl:  "./images/icon-location.svg",
    iconSize: [38, 95]
  } )

  L.marker([lat, lng], {icon: markerIcon}).addTo(map)    
}

const btn = document.querySelector('.search-btn');
const input = document.querySelector('.input')

btn.addEventListener('submit', (e)=>{
    e.preventDefault()
    ipTracker(input.value)
})