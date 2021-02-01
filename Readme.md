[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo?ref=badge_small)

# Simple ACL-RBAC Backend Sistem use Nodejs,Mysql and MongoDB

## Access the documentation files inside the DOCS folder at the root of the project.

## Dependencies Used

Check the file at the root of the project **package.json** for the dependencies used in the project

## Init project Dev Test

     ``` bash
      npm install or yarn install

     ```


     cd /server


     use nodemon tools:

     nodemon server.js

     or

     npm server or
     yarn server or
     node server

## Use Sql DataBase- Mysql and PostgreSql

     Two packages were used for SQL database,they are ORMs, sequelize and pg modules.
     in /config/config.json
     Change the credentials to those in your database mysql.

## Use MongoDB DataBase

     In .env file
     Change the credentials to those in your database mongodb.
     Change to your collection name.
     Module ORM Mongoose.

## OPEN BAKING:

## Roles ACL-RBAC (accesscontrol) lib module Accesscontrol

     In /server/roles.js
     We can configure the access level rules per user.
     Roles such as Admin and Manager may have system privileges.

## Use 2fa TOTP token module Speakeasy- Google Authentication Client

     Use two-factor authentication for node.js.Speakeasy in Google Authenticator.
     2FA in a Node.js API with time-based one-time passwords.

## Use 2fa TOTP token module Authy- Authy Twilio Client and API

     Use two-factor authentication for node.js.Authy npm module in Authy app 2fa.
     Use two-factor authentication for node.js.Twilio npm module in SMS 2fa.

## Use Sendgrid Api Email service

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

## Init project Production

     I recommend using the pm2 tool

     Command installing globally:
     sudo npm install pm2 -g

     Inside of the directory /server folder run the command:

     Install Application:
     npm or yarn install

     PM2 command start:
     pm2 start server.js

     Cluster mode:
     pm2 start server.js -i max

     Persistence mode command:
     pm2 startup

     Save and Finish:
     pm2 save

\*The reverse proxy system can be implemented with Nginx as an infrastructure.

## Secutiry

     PentestLab testing tools for attacks and vulnerabilities.

     NoSql
     XSS
     Authentication standards
     encryption and salt
     httponly cookies
     Oauth

## Use NodeJS 10/12 and NPM or YARN Modules.

## Change the .env file with your credentials.

```

```
