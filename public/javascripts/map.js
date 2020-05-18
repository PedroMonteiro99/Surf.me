var marker = {};
var control;
var been_routed = true;
var test = [];
var name;

window.onload = function () {

    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var blackIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    if (navigator.geolocation) {

        //Get User id for confirmation
        var utilizador = localStorage.getItem("username")
        $.ajax({
            url: '/api/user/id',
            method: 'post',
            data: {
                Username: utilizador,
            },
            success: function (result, status) {
                idUser = result[0].idUsers
                console.log(idUser)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })

        navigator.geolocation.getCurrentPosition(function (position) {
            var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 8);
            var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
            var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(map);

            $.ajax({
                url: '/api/location/loc',
                method: 'get',
                success: function (result, status) {
                    var test = [L.latLng(position.coords.latitude, position.coords.longitude)];
                    for (x in result) {
                        test.push(L.latLng(result[x].Latitude, result[x].Longitude))
                    }
                    console.log(result)
                    console.log(result)
                    var legend = L.control({ position: "bottomleft" });
                    legend.onAdd = function () {
                        var div = L.DomUtil.create("div", "legend");
                        div.innerHTML += "<h4>Map Legend</h4>";
                        div.innerHTML += '<i style="background: black"></i><span>Current Position</span><br>';
                        div.innerHTML += '<i style="background: lawngreen"></i><span>Your Farms</span><br>';
                        div.innerHTML += '<i style="background: blue"></i><span>Other Users Farms</span><br>';
                        return div;
                    };
                    legend.addTo(map);
                    control = L.Routing.control({
                        plan: L.Routing.plan(test, {
                            createMarker: function (x, test, nWps) {
                                if (x == 0) {
                                    return L.marker(test.latLng, { draggable: false, icon: blackIcon }).bindPopup('Your Current Location').openPopup();
                                }
                                if (x >= 1) {
                                    if (idUser == result[x - 1].User_idUsers)
                                        return L.marker(test.latLng, { draggable: false, icon: greenIcon }).bindPopup("" + result[x - 1].idFarm + "").openPopup();
                                    else
                                        return L.marker(test.latLng, { draggable: false }).bindPopup("" + result[x - 1].idFarm + "").openPopup();
                                }
                            }
                        }),
                        routeLine: false,
                        routeWhileDragging: false,
                        addWaypoints: false
                    }).addTo(map);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })
        })
    }
}

