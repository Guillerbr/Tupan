// 2FA TOTP MODULE
const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
const Express = require("express");

var app = Express();

//authy twillo sms 2fa
//var keytwilio = process.env.TWILIO_API_KEY
var authy = require('authy')('xicDBI3OL8bRtsSO6TVT5waoczzh6bAw');    //TWILIO_API_KEY


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



//twillo 2fa sms auth
exports.twilioauthy = async (req, res, next) => {



    //authy_id =  TOKEN APP AUTHY

    /*
        authy.register_user('new_user@email.com', '5524999511090', function (err, res) {
            console.log(res.user.id);
            // console.log(err);
    
        });
  
    */




    /*
    var authy_id = 48952;

    authy.request_sms(authy_id, function (err, res) {
        console.log(res.message);
    });
  
*/



    var authy_id = 220479801;

    authy.verify(authy_id, token = '6727463', function (err, res) {
        //console.log(res.message);
        console.log(err);
    });










};

exports.twilioregistersmsauthy  = async (req, res, next) => {

    /*


curl -XPOST "https://api.authy.com/protected/json/users/new" \
-H "X-Authy-API-Key: xicDBI3OL8bRtsSO6TVT5waoczzh6bAw" \
--data-urlencode user[email]="user@domain.com" \
--data-urlencode user[cellphone]="24-9995-11090" \
--data-urlencode user[country_code]="55"
   

*/

};