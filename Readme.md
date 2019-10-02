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


## Access token and requirement headers

     x-access-token     header
     content-Type:      application/x-www-form-urlencoded  


    
## Init project

    npm install 
    cd /server
    npm server or yarn server
    