// 2FA TOTP MODULE
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
const Express = require("express");
const axios = require('axios');
var qs = require("qs");

//url twilio authy api post register
var url = 'https://api.authy.com/protected/json/users/new'

var app = Express();

//const authToken = process.env.TWILIO_API_KEY;
//var authtoken = process.env.TWILIO_API_KEY;

//authy twillo sms 2fa
var authy = require('authy')('');    // PRODUCTION API KEY-AUTHY
//var authy = require('authy')('');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));



//speakeasy 2fa totp
exports.tokengenerate = async (req, res, next) => {

    var secret = Speakeasy.generateSecret({ length: 20 });
    res.send({ "secret": secret.base32 });

}


//speakeasy 2fa totp
exports.totptokengenerate = async (req, res, next) => {
    res.send({
        "token": Speakeasy.totp({
            secret: req.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
};


//speakeasy 2fa totp
exports.tokenvalidate = async (req, res, next) => {
    res.send({
        "valid": Speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.token,
            window: 0




        })



    });
    //return res.redirect("www.google.com");
    //next.domain('localhost:5500/ping')
    // res.redirect('https://google.com')
    //if (verify == true) return res.status(400).send({ error: 'Pass next level' });
    //return res.redirect('www.google.com');
    //res.send('<script>window.location.href="www.google.com";</script>');
    //console.log(valid);


};












//twilio modules
//twilio modules



//twillo 2fa token authy app
exports.twilioauthy = async (req, res) => {


    try {  


    const { authy_id_client, token_client } = req.body

    var authy_id = authy_id_client;

    //if (await User.findOne({ authy_id_client }))
    //return res.status(400).send({ error: 'User already registered' });

    authy.verify(authy_id, token = token_client, function (err, res) {
       
       console.log(res.message);
      // console.log(res.error);


       /*
       const remessage = await res.message;
       res.status(200).json({
        // data: user,
       // success: 'User has been updated'
        remessage
    });

    */   



/*
      
       if (res.message == true){
        res.status(200).send({ error: 'OK' });
       }else{ res.status(400).send({ error: 'NOT' });}

*/


    //   authy.valid(res.message)
    //   authy.phones.create({  : '' ,})

      

         
        // res.status(200).send({ error: 'Cannot reset password' });
        // console.log(res.authy_id_client);
        // console.log(res.err);
        // res.status(200).send({ error: 'Cannot reset password, try again' });
        // res.send({ error: 'Cannot reset password, try again' });

    });
    
}catch (err) {
    //console.log(err);
    res.status(400).send({ error: 'Authentication Token Error' });

}


     //  res.status(200).send({ message: 'Success' });

      
      

};



//push notification authy app client
exports.twiliopushnotficationauthapp  = async (req, res, next) => {


    const { authy_id_client } = req.body  

    var authy_id = authy_id_client;
    
    authy.request_sms(authy_id, function (err, res) {
      console.log(res.message);
     });
    



/*
 //You can override this behavior and force sending an SMS or Voice call. 
 //This is a useful override if a user is specifically selecting "Send SMS"

   const { authy_id_client } = req.body  

   var authy_id = authy_id_client;

   authy.request_sms(authy_id, force=true, function (err, res) {
    console.log(res.message);
  });

*/


}



//register cellphone sms for authy download client 2fa
exports.twilioregistersmsauthy = async (req, res, next) => {


    const { email, cellphone, country_code } = req.body

    const user = await User.findOne({ email });


    var data = {
        user: {
            email: email,
            cellphone: cellphone,
            country_code: country_code
        }
    };

    axios.post(url, qs.stringify(data), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'X-Authy-API-Key': process.env.TWILIO_API_KEY      // 'X-Authy-API-Key': ''
        }
    }).then((data) => {

        console.log("data", data)       //Withdraw on production
        res.json({
            Message: "Successfully registered"
        })
    }).catch((e) => {
        
        console.log("error", e)         //Withdraw on production
        res.json({
            Message: "Error registering"
        })
    })

    
     await User.findByIdAndUpdate(user._id, { cellphone, country_code  })
    // await User.findByIdAndUpdate(user._id, {$set: { cellphone, country_code } })
     
};




/*       ------- INFORMATION --------

curl -XPOST "https://api.authy.com/protected/json/users/new" \
-H "X-Authy-API-Key: xicDBI3OL8bRtsSO6TVT5waoczzh6bAw" \
--data-urlencode user[email]="user@domain.com" \
--data-urlencode user[cellphone]="24-9995-11090" \
--data-urlencode user[country_code]="55"


curl -i "https://api.authy.com/protected/json/sms/220479801" \
    -H "X-Authy-API-Key: xicDBI3OL8bRtsSO6TVT5waoczzh6bAw"



curl -X POST https://verify.twilio.com/v2/Services \
--data-urlencode "FriendlyName=My First Verify Service" \
-u ACc9e8a16ec4b344a6577767bb401025c6:2d503735899cc2a15a16b48d972bc37e






doc:

https://www.twilio.com/docs/authy/tutorials/account-verification-node-express

https://www.twilio.com/docs/authy/tutorials/two-factor-authentication-node-express

https://www.twilio.com/docs/verify

https://www.twilio.com/docs/authy


*/





/*
    
    //const { authy_id, token_client } = req.body
    
        var authy_id = 220479801;
    
        authy.verify(authy_id, token = '4863699', function (err, res) {
            console.log(res.message);
            //console.log(err);
            
    
        });
    
    
    */




    
    /*
    var authy_id = 48952;

    authy.request_sms(authy_id, function (err, res) {
        console.log(res.message);
    });
  
   */
/*

  authy.request_sms(authy_id, function (err, res) {
  console.log(res.message);
 });
*/


   /*
   
curl -X POST https://verify.twilio.com/v2/Services/a7e675547a014b689462ad5189e975bd/Verifications --data-urlencode "To=+5524999511090" --data-urlencode "Channel=sms"

*/

    /*
    
        //authy_id =  TOKEN APP AUTHY
    
        
            authy.register_user('g2@gmail.com', '5524999511090', function (err, res) {
               // console.log(res.user.id);
                 console.log(err);
        
            });
      
        
    */



    /*
    var authy_id = 48952;

    authy.request_sms(authy_id, function (err, res) {
        console.log(res.message);
    });
  
   */