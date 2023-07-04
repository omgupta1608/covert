const ENV_HOST =  'https://'+window.location.hostname+':4000';
function save() {
    //window.alert("POST ADDED");
    var secret = document.getElementById("secret").value.toString();
    var pass = document.getElementById("pass").value.toString();
    console.log(secret, pass);
    $.ajax({
        type: 'POST',
        url: ENV_HOST + '/submit-secret',
        contentType: "application/json",
        data: {
            encrypted_secret: secret,
            pass_phrase: pass
        },
        success: function(data){
            alert("Secret Saved!")
        }
    });
    console.log(secret, pass);
}