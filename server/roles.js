// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")                //OWN = PROPRIO
 .updateOwn("profile")
 //.readOwn("balance")

ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")                ///ROLES FUNCTIONS ACESS CONTROL MODULE

ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")                //ANY = TODOS-QUALQUER
 .deleteAny("profile")
 .readAny("balance")
 .updateAny("balance")                //ANY = TODOS-QUALQUER
 .deleteAny("balance")



 //new roles functions acess user
ac.grant("final_user")
.readOwn("profile")             
//.readOwn("balance")  


return ac;
})();