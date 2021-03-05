const axios = require('axios')



class Api{
    static dogFacts(req,res,next){
        axios({
            method : 'get',
            url : 'https://some-random-api.ml/facts/dog',
             
        })
        .then(data =>{
            console.log(data)
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static catFacts(req,res,next){
        axios({
            method : 'get',
            url : 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1',
             
        })
        .then(data =>{
            
            res.status(200).json({data :data.data.text})
        })
        .catch(err =>{
            next()
        })
    }

    static catPict(req,res,next){
        axios({
            method : 'get',
            url : 'https://api.thecatapi.com/v1/images/search'
        })
        .then(data =>{
            res.status(200).json({ data :data.data[0].url})
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
            res.status(200).json({data : data.data.url})
        })
        .catch(err =>{
            res.status(500).json({error : err})
        })
    }

    static testAll(req,res,next){
        
        let datadog;
        let dataCat;
        let catPict;
        let dogPict;
         axios({
            method : 'get',
            url : 'https://some-random-api.ml/facts/dog',
             
            })
        .then(data =>{
            datadog = data.data.fact
            return axios({
                method : 'get',
                url : 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1',
                
            })
        })
        .then(data2 =>{
            // res.send(data2.data.text, datadog.data)
            // res.send({catFacts : data2.data.text, dogFacts :datadog})
            dataCat = data2.data.text
            return axios({
                method : 'get',
                url : 'https://api.thecatapi.com/v1/images/search'
            })
            
        })
        .then(data =>{
            catPict = data.data[0].url
            return axios({
                method : 'get',
                url : 'https://random.dog/woof.json'
            })
        .then(data =>{
            dogPict = data.data.url
            res.status(200).json({datadog:datadog,dataCat:dataCat,dogPict:dogPict,catPict:catPict})
        })
        })
        .catch(err=>{
            res.send(err)
        })        
      
    }
    

}





module.exports = Api