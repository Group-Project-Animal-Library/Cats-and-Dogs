const server = 'http://localhost:4664'

$("document").ready(function(){
    catImage()
    catFacts()
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