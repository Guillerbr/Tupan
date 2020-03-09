[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo?ref=badge_small)

# Simple ACL RBAC Sistem use Nodejs use Mysql and MongoDB


## Dependencies used

     accesscontrol
     speakeasy 
     bcrypt 
     body-parser
     dotenv 
     express 
     jsonwebtoken 
     mongoose
     cors
     sendgrid/mail
     crypto
     axios
     qs
     authy -twillo
     request
     mysql2
     sequelize
     redis
     cookie-parser
     jest -dev
     sequelize-cli -dev
     



## Routes endpoint

     get('/ping')  
    
     post('/signup')
     post('/login')
     post('/forgot-password')
     post('/reset-password')

     get('/user/:userId')
     get('/users')
     put('/user/:userId')
     delete('/user/:userId')

     get('/balances')
     post('/balance')
     put('/balance/:balanceId')
     delete('/balance/:balanceId')

     post('/2fa-generate')
     post('/totp-generate')
     post('/2fa-validate')

     post('/twilio')
     post('/register-sms')
     post('/twilio-push-app')
     
     post('/signupadmin')
     get('/userinfo')



## Use Mysql DataBase
     in /config/config.json
     Change the credentials to those in your database mysql. 


## Use Mongo DataBase
     in .env file
     Change the credentials to those in your database mongodb.
        

## Roles ACL-RBAC accesscontrol lib module Accesscontrol
    
     in /server/roles.js    
     We can configure the crud access level rules per user.
     Admin user type has to control CRUD over system.


## Use 2fa TOTP token module Speakeasy- Google Authentication Client  
     Use two-factor authentication for node.js.Speakeasy in Google Authenticator.
     2FA in a Node.js API with time-based one-time passwords.


## Use 2fa TOTP token module Authy- Authy Twilio Client and API
     Use two-factor authentication for node.js.Authy npm module in Authy app 2fa.
     Use two-factor authentication for node.js.Twilio npm module in SMS 2fa.


## Use Sendgrid Api email service
     Automated Email Sending Provider.
     Create your sendgrid account, customize your private API key.
     Add the you private key to the .env file at SENDGRID_API_KEY.  


## Use Alphavantage Api cotations service
     Provider of free APIs for realtime and historical data on stocks, forex (FX), and digital/crypto currencies.
     Create your alphavantage account,customize your private API key.
     Add the you private key to the .env file.  


## Use E-mail token 
     Use email verification token for password re-registration.
     Use email verification token 2fa login or other verification.           


## Access token and requirement Headers

     x-access-token     Header: JWT Authentication
     content-Type:      application/x-www-form-urlencoded  or  application/json


## Creating your frist seed admin account

     post ('/signup')
     Headers
     Content-Type = application/x-www-form-urlencoded
     Body 
     email   =    rbca@rb.com
     password  =  2321
     role = admin

     Register with your email and password details

 
## After creating your admin account-ALERT
    
     Change the "role" rule to basic, or anyone can register as an admin.
     In the server/controllers file userController change line 85 to:

     const newUser = new User ({email, password: hashedPassword, role: "basic"});

     
     Now only admin can on route:
     post ('/signupadmin')

     register user levels:
     admin,supervisor,basic,final_user.

         
## Init project dev test

     npm install 
     cd /server
     npm server or
     yarn server or
     node server
    
## Init project production

     I recommend using the pm2 tool

     Command installing globally:
     sudo npm install pm2 -g

     Inside of the directory /server folder run the command: 
     pm2 start server.js  
     or cluster mode:
     pm2 start server.js -i max

     Persistence mode command:
     pm2 startup

     Finish
     pm2 save


## Use NodeJS 10/12 and NPM or YARN.


## Change the .env file with your credentials
