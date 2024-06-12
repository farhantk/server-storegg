const Bank = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = {message: alertMessage, status: alertStatus}
            const bank  = await Bank.find()

            console.log(alert)
            res.render('Admin/Bank/index', {
                name: req.session.user.name,
                title: 'bank',
                bank,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    view_update: async(req, res)=>{
        try {
            const {id} = req.params
            const bank = await Bank.findOne({_id: id})

            res.render('Admin/Bank/update',{
                name: req.session.user.name,
                title: 'Bank',
                bank
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {name, ownerName, accNumber} = req.body
            let bank = await Bank({name, ownerName, accNumber})
            await bank.save()

            req.flash('alertMessage', 'Add bank successfuly')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionUpdate: async(req, res)=>{
        try {
            
            const {id} = req.params
            const {name, ownerName, accNumber} = req.body

            
            let bank = await Bank.findOneAndUpdate({
                _id: id
            },{
                name, ownerName, accNumber
            })
            req.flash('alertMessage', 'Update bank successfuly')
            req.flash('alertStatus', 'success')
            
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionRemove: async(req, res)=>{
        try {
            
            const {id} = req.params
            let bank = await Bank.findOneAndDelete({_id:id})

            req.flash('alertMessage', 'Remove bank successfuly')
            req.flash('alertStatus', 'success')
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },




}