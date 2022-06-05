const bcrypt = require("bcryptjs")
module.exports = [
    {
        model:"Users",
        keys:["email","id"],
        data:{
            id:1,
            firstname:"vic",
            lastname:"ondelet",
            email:"vie@test.com",
            password:bcrypt.hashSync("1234",10)

        }
    },
    
]