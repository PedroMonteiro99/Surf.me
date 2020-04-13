var idUser;

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
            url: '/api/farm/'+idUser,
            method: 'get',
            success: function (result, status) {
                var farm = "";
                for (x in result) {
                    farm +=
                        "<tr><th>" + result[x].Farm_idFarm + "</th>" +
                        "<td>" + result[x].Name + "</td>" +
                        "<td>" + result[x].Humidity + " % </td>" +
                        "<td>" + result[x].Temperature + " ºC </td>"+
                        "<td> Not Needed </td>"
                }

                info.innerHTML = farm; 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }
    setInterval(loadValues, 1500);
    setInterval(updateValues, 1500);






}