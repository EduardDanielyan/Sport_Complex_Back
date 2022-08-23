const bcrypt = require('bcrypt')
const salt = 10
const { User } = require('../models')

class UserController {
    add(req, res) {
        console.log(req.body)
        let data = req.body.data
        let error = false
        if (data.password != data.password_confirm) {
            error = true
            return alert('dont cnfirm')
        }
        if (!error) {
            delete data.password_confirm
            bcrypt.hash(data.password, salt, function (err, hash) {
                // Store hash in your password DB.
                data.password = hash
                console.log(data);
                User.create(data)
                res.redirect('/registration')

            })
        }

    }
    
    profile(req,res){
        console.log(req.user);
        res.send({user:req.user})
    }
    
    // logOut(req,res){
    //     req.logout();
    //     res.redirect('/signin')
    // }

}

module.exports = {
    UserController: new UserController
}