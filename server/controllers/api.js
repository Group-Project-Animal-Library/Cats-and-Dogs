const axios = require('axios')



class Api{
    static dogFacts(req,res,next){
        axios({
            method : 'get',
            url : 'https://some-random-api.ml/facts/dog',
             
        })
        .then(data =>{
            res.status(200).json({data :data.data.fact})
        })
        .catch(next)
    }

    static catFacts(req,res,next){
        axios({
            method : 'get',
            url : 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1',
             
        })
        .then(data =>{
            
            res.status(200).json({data :data.data.text})
        })
        .catch(next)
    }


    static catPict(req,res,next){
        const api_key = process.env.API_KEY
        axios({
            method : 'get',
            url : `https://api.thecatapi.com/v1/images/search?api_key=${api_key}`
        })
        .then(data =>{
            res.status(200).json({ data :data.data[0].url})
        })
        .catch(next)
    }


    static dogPict(req,res,next){
        axios({
            method : 'get',
            url : 'https://random.dog/woof.json'
        })
        .then(data =>{
            res.status(200).json({data : data.data.url})
        })
        .catch(err =>{
            res.status(500).json({error : err})
        })
    }
}





module.exports = Api