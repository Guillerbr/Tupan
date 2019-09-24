// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")                ///ROLES FUNCTIONS ACESS CONTROL MODULE

ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")
 .deleteAny("profile")



 //new roles functions acess user
ac.grant("final_user")
.readOwn("profile")             
//.readAny("profile")  


return ac;
})();