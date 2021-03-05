const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())



class Api{
    static dogFacts(req,res){
        axios({
            method : 'get',
            url : 'https://some-random-api.ml/facts/dog',
             
        })
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static catFacts(req,res){
        axios({
            method : 'get',
            url : 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1',
             
        })
        .then(data =>{
            res.status(200).json({data :data.data.text})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static catPict(req,res){
        axios({
            method : 'get',
            url : 'https://api.thecatapi.com/v1/images/search'
        })
        .then(data =>{
            res.send(data.data[0].url)
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static dogPict(req,res,next){
        axios({
            method : 'get',
            url : 'https://random.dog/woof.json'
        })
        .then(data =>{
            res.send(data.data.url)
        })
        .catch(err =>{
            res.status(500).json({error : err})
        })
    }

    static all(req,res){
        let dogPict;
        axios({
            method : 'get',
            url : 'https://random.dog/woof.json'
        })
        .then(data =>{
            dogPict = data.data.url
            return axios({
                method : 'get',
                url : 'https://api.thecatapi.com/v1/images/search'
            })
            
        })
        .then(data =>{
            console.log(data.data[0].url, dogPict)
            res.status(200).json({data : dogPict, test : data.data[0].url})
        })
        .catch(err =>{
            res.status(500).json({error : err})
        })


    }
}



// let test = Api.catFacts()
// // res.send(test)
// // arr.push(test)

// let dogFacts = Api.dogFacts()
// // res.send(dogFacts)
// arr.push(dogFacts)

// let catPict = Api.catPict()
// // console.log(catPict)
// arr.push(catPict)


// let dogPict = Api.dogPict()
// // console.log(dogPict)
// arr.push(dogPict)



// console.log(arr)
app.get('/',Api.catFacts) 


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})