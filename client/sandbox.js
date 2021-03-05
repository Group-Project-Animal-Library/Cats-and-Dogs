

const server = 'http://localhost:4664'

$("document").ready(function(){
    catImage()
    dogImage()
    catFacts()
    dogFacts()
})


function catFacts(){

      $.ajax({ 
          method : 'GET',
          url : server +'/catFacts',
        //   header:{
        //       token : localStorage.token
        //   }
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
      //   header:{
      //       token : localStorage.token
      //   }
    })
    .done(catImg =>{
        console.log(catImg.data)
        $('#img-cat').empty()
        $('#img-cat').append(
          `
          <div class="card-image">
          <figure >
            <img width="500" height="600" src=${catImg.data}>
          </figure>
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
      //   header:{
      //       token : localStorage.token
      //   }
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
      //   header:{
      //       token : localStorage.token
      //   }
    })
    .done(dogImg =>{
        console.log(dogImg.data)
        $('#img-dog').empty()
        $('#img-dog').append(
          `
          <div class="card-image">
          <figure >
            <img width="500" height="600" src=${dogImg.data}>
          </figure>
        </div>
          ` 
        )
    })
    .fail(err =>{
      console.log(err)
    })
}