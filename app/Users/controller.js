const User = require('./model')
const bcrypt =  require('bcrypt')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = {message: alertMessage, status: alertStatus}
            if(req.session.user === null || req.session.user === undefined){
                res.render('Admin/Users/index', {
                    alert
                });
            }else{
                res.redirect('/dashboard')
            }
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionSignIn: async(req, res)=>{
        try {
            const {email, password} = req.body
            const user = await User.findOne({email:email})
            if(user){
                const checkPassword = await bcrypt.compare(password, user.password)
                if(checkPassword){
                    req.session.user = {
                        id: user._id,
                        email: user.email,
                        name: user.name
                    }
                    res.redirect('/dashboard')
                }else{
                    req.flash('alertMessage', 'Wrong password')
                    req.flash('alertStatus', 'danger')
                    res.redirect('/')
                }
            }else{
                req.flash('alertMessage', 'Email not registered')
                req.flash('alertStatus', 'danger')
                res.redirect('/')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionSignOut: async(req,res)=>{
        req.session.destroy();
        res.redirect('/')
    }
}