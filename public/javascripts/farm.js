var idUser;
var current;

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
                        "<td> Not Needed </td>"
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
                Temperature: getRandomInt(current[x].Temperature - 0, current[0].Temperature + 2),
                Humidity: getRandomInt(current[x].Humidity - 3, current[0].Humidity + 2),
                id: current[x].Farm_idFarm,
            },
            success: function (result, status) {
                console.log("Updated Sucessfully")
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