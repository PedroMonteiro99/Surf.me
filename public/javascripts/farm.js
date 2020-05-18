var idUser;
var current;

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
                        "<td>" + result[x].Water + "</td>"
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
                Temperature: getRandomInt(current[x].Temperature - 1, current[x].Temperature + 1),
                Humidity: getRandomInt(current[x].Humidity - 5, current[x].Humidity + 5),
                Water: current[x].Water,
                id: current[x].Farm_idFarm,
            },
            success: function (result, status) {
                checkValues(current[x].idCulture, x)
                console.log("Updated Sucessfully in farm " + current[x].Farm_idFarm + "")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function checkValues(idCulture, x) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        $.ajax({
            url: "/api/farm/restrict/" + idCulture,
            method: "get",
            success: function (result, status) {
                console.log(result)
                if (current[x].Humidity <= result[1].Min_Value) {
                    Toast.fire({
                        icon: 'warning',
                        title: "Humidity is too low on Farm " + current[x].Farm_idFarm + "!"
                    })
                    current[x].Humidity = result[1].Min_Value + 5
                    current[x].Water = "Needed"
                }
                if (current[x].Humidity >= result[1].Max_Value) {
                    console.log(current[x].Humidity + " - " + result[1].Max_Value)
                    current[x].Humidity = result[1].Max_Value - 5
                    current[x].Water = "Not Needed"
                }
                if (current[x].Temperature <= result[0].Min_Value) {
                    console.log(current[x].Temperature + " - " + result[0].Min_Value)
                    current[x].Temperature = result[0].Min_Value + 4
                    current[x].Water = "Not Needed"
                }
                if (current[x].Temperature >= result[0].Max_Value) {
                    Toast.fire({
                        icon: 'warning',
                        title: "Temperature is too high on Farm " + current[x].Farm_idFarm + "!"
                    })
                    current[x].Temperature = result[0].Max_Value - 3
                    current[x].Water = "Needed"
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