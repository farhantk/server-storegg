const Category = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const category  = await Category.find()
            res.render('Admin/Category/index', {
                category
            });
        } catch (err) {
            console.log(err);
        }
    },

    view_update: async(req, res)=>{
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})

            res.render('Admin/Category/update',{
                category
            });
        } catch (error) {
            console.log(error)
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {name} = req.body
            let category = await Category({name})
            await category.save()

            res.redirect('/category')
        } catch (err) {
            console.log(err)
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

            res.redirect('/category')
        } catch (err) {
            console.log(err)
        }
    },

    actionRemove: async(req, res)=>{
        try {
            
            const {id} = req.params
            let category = await Category.findOneAndDelete({_id:id})

            res.redirect('/category')
        } catch (err) {
            console.log(err)
        }
    },




}