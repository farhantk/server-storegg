const Category = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = {message: alertMessage, status: alertStatus}
            const category  = await Category.find()
            console.log(alert)
            res.render('Admin/Category/index', {
                name: req.session.user.name,
                title: 'Category',
                category,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    view_update: async(req, res)=>{
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})

            res.render('Admin/Category/update',{
                name: req.session.user.name,
                title: 'Category',
                category
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {name} = req.body
            let category = await Category({name})
            await category.save()

            req.flash('alertMessage', 'Add category successfuly')
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    actionUpdate: async(req, res)=>{
        try {
            
            const {id} = req.params
            const {name} = req.body

            
            let category = await Category.findOneAndUpdate({
                _id: id
            },{
                name
            })
            console.log(category)
            req.flash('alertMessage', 'Update category successfuly')
            req.flash('alertStatus', 'success')
            
            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    actionRemove: async(req, res)=>{
        try {
            
            const {id} = req.params
            let category = await Category.findOneAndDelete({_id:id})

            req.flash('alertMessage', 'Remove category successfuly')
            req.flash('alertStatus', 'success')
            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },




}