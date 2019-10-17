[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo?ref=badge_small)

# Simple ACL RBAC Sistem use Nodejs and MongoDB


## Dependencies used

     accesscontrol 
     bcrypt 
     body-parser
     dotenv 
     express 
     jsonwebtoken 
     mongoose
     cors 



## Routes endpoint

     get('/ping')  
    
     post('/signup')
     post('/login')

     get('/user/:userId')
     get('/users')
     put('/user/:userId')
     delete('/user/:userId')

     get('/balances')
     post('/balance')
     put('/balance/:balanceId')
     delete('/balance/:balanceId')

     post('/signupadmin')
     get('/userinfo')


    


## Access token and requirement headers

     x-access-token     header
     content-Type:      application/x-www-form-urlencoded  


## Roles accesscontrol lib module
    
     in /server/roles.js    
     We can configure the crud access level rules per user
     Admin user type has to control CRUD over system

## Creating your admin account

     post ('/signup')
     Headers
     Content-Type = application/x-www-form-urlencoded
     Body 
     email   =    rbca@rb.com
     password  =  2321
     role = admin

     Register with your email and password details

 
## After creating your admin account
    
    
     In the server/controllers file userController change line 33 to:

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


## Use in Nodejs 10.16.3 and Npm 6.9.0
