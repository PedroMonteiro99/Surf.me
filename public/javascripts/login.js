function entrar(){
    $.ajax({
        url: '/api/auth/login',
        method: 'post',
        data:{
            Username:document.getElementById("nome").value,
            Password:document.getElementById("palavra").value,
        },
        success: function(result,status){
            alert('You sucessfuly logged in!')
            localStorage.setItem("username",document.getElementById("nome").value) ;
            window.location = "main.html";
        },
        error: function(jqXHR,textStatus,errorThrown ){
            Swal.fire({
                title: 'Oops...',
                text: 'Your Username or Password is incorrect!',
            })
            console.log(errorThrown);
        }
    })
}