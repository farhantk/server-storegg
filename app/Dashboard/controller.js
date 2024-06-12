const Transaction = require('../Transaction/model')
const Category = require('../Category/model')
const Voucher = require('../Voucher/model')
const Player = require('../Player/model')

module.exports={
    index: async(req, res)=>{
        try {
            const transaction = await Transaction.countDocuments()
            const voucher = await Voucher.countDocuments()
            const player = await Player.countDocuments()
            const category = await Category.countDocuments()
            res.render('Admin/Dashboard/index', {
                name: req.session.user.name,
                title: 'Dashboard',
                count:{
                    transaction,
                    voucher,
                    player,
                    category
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

}