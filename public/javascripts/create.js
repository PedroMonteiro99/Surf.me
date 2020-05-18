var idUser;
var culture;
var farm;
window.onload = function () {
    var utilizador = localStorage.getItem("username")
    var email;
    /*----------- User Information ---------*/
    $.ajax({
        url: '/api/user/id',
        method: 'post',
        data: {
            Username: utilizador,
        },
        success: function (result, status) {
            idUser = result[0].idUsers
            email = result[0].Email
            $('#farmer').val(utilizador)
            $('#email').val(email)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    /*----------- Culture Information ---------*/
    $.ajax({
        url: '/api/auth/culture',
        method: 'get',
        success: function (result, status) {
            console.log(result)
            for (i in result) {
                var x = document.getElementById("Culture");
                var option = document.createElement("option");
                option.text = result[i].Name;
                x.add(option);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    /*----------- Allow only numbers on phone input ---------*/
    setInputFilter(document.getElementById("phone"), function (value) {
        return /^\d*$/.test(value);
    });
}



function createFarm() {
    var lat;
    var long;
    var address = document.getElementById("address").value

    $.getJSON("https://nominatim.openstreetmap.org/search/" + address + "?format=json", function (data) { //Get latLng from User address
        lat = data[0].lat
        long = data[0].lon
        console.log('Latitude: ' + lat + ' , Longitude: ' + long)
        var e = document.getElementById("Culture");
        var text = e.options[e.selectedIndex].text;
        console.log(text)
        console.log(idUser)
        $.ajax({
            url: '/api/farm/culture/'+text,
            method: 'get',
            success: function (result, status) {
                culture = result[0].idCulture
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
        $.ajax({
            url: '/api/auth/last',
            method: 'get',
            success: function (result, status) {
                farm = result[0].idFarm
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })

        $.ajax({
            url: '/api/farm/new',
            method: 'post',
            data: {
                Longitude: long,
                Latitude: lat,
                User: idUser,
            },
            success: function (result, status) {
                addSensor(farm,culture)
                console.log("Sucessfully Added!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })

    })
}


function addSensor(idFarm,idCulture) {
    $.ajax({
        url: '/api/farm/newSensor',
        method: 'post',
        data: {
            idFarm: idFarm,
            idUser: idUser,
            idCulture: idCulture,
        },
        success: function (result, status) {
            console.log("Sucessfully Added!")
            window.location = "main.html"
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

