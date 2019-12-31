const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
const Express = require("express");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));




exports.tokengenerate = async (req, res, next) => {

    var secret = Speakeasy.generateSecret({ length: 20 });
    res.send({ "secret": secret.base32 });

}


exports.totptokengenerate = async (req, res, next) => {
    res.send({
        "token": Speakeasy.totp({
            secret: req.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
};


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
