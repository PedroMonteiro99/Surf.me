var marker = {};
var control;
var been_routed = true;
var test = [];
var name;

window.onload = function () {
    if (navigator.geolocation) {
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
                    console.log(result)
                    var test = [L.latLng(position.coords.latitude, position.coords.longitude)];
                    for (x in result) {
                        test.push(L.latLng(result[x].Latitude, result[x].Longitude))
                    }
                    console.log(test)
                    console.log(result)
                    control = L.Routing.control({
                        plan: L.Routing.plan(test, {
                            createMarker: function (x, test, nWps) {
                                if (x == 0) {
                                    return L.marker(test.latLng, { draggable: false }).bindPopup('Your Current Location').openPopup();
                                }
                                if (x >= 1) {
                                    return L.marker(test.latLng, { draggable: false }).bindPopup(""+result[x - 1].idFarm+"").openPopup();
                                }
                            }
                        }),
                        routeLine:false,
                        routeWhileDragging:false,
                        addWaypoints:false
                    }).addTo(map);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })
        })
    }
}

