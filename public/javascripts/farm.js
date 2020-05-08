var idUser;
var current;
var water = "Not Needed";

function farm() {
    window.location = "farm.html"
}

function neighbours() {
    window.location = "main.html"
}

window.onload = function () {
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

    function loadValues() {
        $.ajax({
            url: '/api/farm/' + idUser,
            method: 'get',
            success: function (result, status) {
                current = result;
                console.log(current)
                var farm = "";
                for (x in result) {
                    farm +=
                        "<tr><th>" + result[x].Farm_idFarm + "</th>" +
                        "<td>" + result[x].Name + "</td>" +
                        "<td>" + result[x].Humidity + " % </td>" +
                        "<td>" + result[x].Temperature + " ºC </td>" +
                        "<td>" + water + "</td>"
                }
                info.innerHTML = farm;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function update(x) {
        $.ajax({
            url: "/api/farm/update",
            method: "put",
            data: {
                Temperature: getRandomInt(current[x].Temperature - 1, current[0].Temperature + 1),
                Humidity: getRandomInt(current[x].Humidity - 2, current[0].Humidity + 4),
                id: current[x].Farm_idFarm,
            },
            success: function (result, status) {
                console.log("Updated Sucessfully in farm " + current[x].Farm_idFarm + "")
                checkValues(current[x].idCulture, x)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function checkValues(idCulture, x) {
        $.ajax({
            url: "/api/farm/restrict/" + idCulture,
            method: "get",
            success: function (result, status) {
                console.log(result)
                if (current[x].Temperature >= result[x].Max_Value) {
                    console.log("Temperature is too high in farm " + current[x].Farm_idFarm + "!!")
                    current[x].Temperature = result[x].Max_Value - 3
                }
                else if (current[x].Temperature <= result[x].Min_Value) {
                    console.log("Temperature is too low in farm " + current[x].Farm_idFarm + "!!")
                    current[x].Temperature = result[x].Min_Value + 5
                }

                if (current[x].Humidity >= result[1].Max_Value) {
                    console.log("Humidity is too high in farm " + current[x].Farm_idFarm + "!!")
                    current[x].Humidity = result[1].Max_Value - 10
                    water =  "Not Needed"
                }
                else if (current[x].Humidity <= result[1].Min_Value) {
                    console.log("Humidity is too low in farm " + current[x].Farm_idFarm + "!!")
                    current[x].Humidity = result[1].Min_Value + 20
                    water = "Needed"
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function updateValues() {
        for (x in current)
            update(x)
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    setInterval(loadValues, 1500);
    setInterval(updateValues, 1500);
}