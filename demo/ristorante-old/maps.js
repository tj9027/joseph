

 function initMap(){
    var location = { lat: 44.838124, lng: 11.619787 };

    var map= new google.maps.Map(document.getElementById("map"),{
        zoom: 14,
        center: location
    });
    var marker=new google.maps.Marker({
        position:location,
        map:map
    });


 }


