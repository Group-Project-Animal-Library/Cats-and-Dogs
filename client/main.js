const server = "http://localhost:4664"

$(document).ready(() => {
    checkLocalStorage()
    catImage()
    dogImage()
    catFacts()
    dogFacts()

    $("#to-login").on("click", (e) => {
        e.preventDefault();
        formLogin()
    })

    $("#to-register").on("click", (e) => {
        e.preventDefault();
        formRegister()
    })

    $("#form-register").submit((e) => {
        e.preventDefault();
        register();
        formLogin()
    })

    $("#form-login").submit((e) => {
        e.preventDefault();
        userLogin();
        checkLocalStorage();  
    })

    $("#logout").click(() => {
        userLogout();
        checkLocalStorage();        
    })
})

function checkLocalStorage() {
    if (localStorage.token) {
        $("#main-page").show()
        $("#login-page").hide()
        $('#register').hide()
        $('#login').hide()
        $("#main").css({"background-color": "yellow", "background-image": "none"});
    } else {
        $("#main-page").hide()
        $("#login-page").show()
        $('#register').hide()
        $('#login').show()
    }
}

function formLogin() {
    $("#login").show();
    $("#register").hide();
}

function formRegister() {
    $("#register").show();
    $("#login").hide();    
}

function userLogin() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()

    $.ajax({
        url: `${server}/login`,
        method: 'POST',
        data: {
            email, password        
        },
    })
    .done(response => {
        localStorage.setItem("token", response.token)
        checkLocalStorage()        
    })
    .fail((err) => {
        console.log(err);
    })
    .always(() => {
        $("#log-email").val("");
        $("#log-password").val("");
    })
}

function userLogout() {
    localStorage.removeItem("token")
    signOut()
    checkLocalStorage()
}

function register() {
    const email = $('#email-reg').val();
    const password = $('#password-reg').val();

    $.ajax({
        method: "POST",
        url: `${server}/register`,
        data: {
            email, password
        }
    }).done(response => {
        // data user sudah ditambahkan 
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $("#email-reg").val("");
        $("#password-reg").val("");
    })
    
}

function catFacts(){
    console.log(localStorage.token)
    $.ajax({ 
        method : 'GET',
        url : server +'/catFacts',
        headers:{
            token : localStorage.token
        }
    })
    .done(catFacts =>{
        console.log(catFacts)
        $('#txt-cat').empty()
        $('#txt-cat').append(
          `
          <div class="content">
           ${catFacts.data}
          </div>
          ` 
        )
    })
    .fail(err =>{
      console.log(err)
    })
}

catImage= ()=>{
  $.ajax({ 
      method : 'GET',
      url : server +'/catImg',
      headers:{
          token : localStorage.token
      }
  })
  .done(catImg =>{
      console.log(catImg.data)
      $('#img-cat').empty()
      $('#img-cat').append(
        `
        <div class="card-image">
          <img class="card-img-top" src=${catImg.data}>
        </div>
        ` 
      )
  })
  .fail(err =>{
    console.log(err)
  })
}


dogFacts = ()=>{
  $.ajax({ 
      method : 'GET',
      url : server +'/dogFacts',
      headers:{
          token : localStorage.token
      }
  })
  .done(dogFacts =>{
      console.log(dogFacts.data.fact)
      $('#txt-dog').empty()
      $('#txt-dog').append(
        `
        <div class="content">
         ${dogFacts.data}
        </div>
        ` 
      )
  })
  .fail(err =>{
    console.log(err)
  })
}

dogImage= ()=>{
  $.ajax({ 
      method : 'GET',
      url : server +'/dogImg',
      headers:{
          token : localStorage.token
      }
  })
  .done(dogImg =>{
      console.log(dogImg.data)
      $('#img-dog').empty()
      $('#img-dog').append(
        `
        <div class="card-image">
            <img class="card-img-top" src=${dogImg.data}>    
        </div>
        ` 
      )
  })
  .fail(err =>{
    console.log(err)
  })
}

function onSignIn(googleUser) {
    $.ajax({
      method: "POST",
      url: server + '/loginGoogle',
      data: {
        token: googleUser.getAuthResponse().id_token
      }
    })
      .done((response) => {
          console.log(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name);
        localStorage.setItem("email", response.email);
        checkLocalStorage()
      })
      .fail((err) => {
        console.log(err);
      })
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }