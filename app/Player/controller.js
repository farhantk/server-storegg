const Player = require('./model')
const Voucher =  require('../Voucher/model')
const Category =  require('../Category/model')

module.exports={
    landingPage: async(req, res)=>{
        try {
            const voucher = await Voucher
            .find()
            .select('_id name status category thumbnail')
            .populate('category')

            res.status(200).json({
                data: voucher
            })
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'})
        }
    },
    detailPage: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher
                .findOne({ _id: id })
                .populate('category')
                .populate('nominals')
                .populate('user', '_id name phoneNumber');
            
            if (!voucher) {
                return res.status(404).json({ message: 'Voucher not found' });
            }
            res.status(200).json({ data: voucher });
            
        } catch (err) {
            res.status(500).json({ message: `Internal server error: '${err.message}`});
        }
    },
    category: async(req, res)=>{
        try {
            const category = await Category.find()
            res.status(200).json({data: category})
        } catch (err) {
            res.status(500).json({ message: `Internal server error: '${err.message}`});
        }
    }

}