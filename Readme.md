# Simple ACL RBAC Sistem use Nodejs and MongoDB
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo?ref=badge_shield)



## Dependencies used

    accesscontrol 
    bcrypt 
    body-parser
    dotenv 
    express 
    jsonwebtoken 
    mongoose 



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



    
## Init project

    npm install 
    cd /server
    npm server

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FGuillerbr%2Frbac-node-acl-mongo?ref=badge_large)