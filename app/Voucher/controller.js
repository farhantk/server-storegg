const Voucher = require('./model')
const Category = require('../Category/model')
const Nominal = require('../Nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = {message: alertMessage, status: alertStatus}

            const voucher  = await Voucher.find().populate('category').populate('nominals')
            const category = await Category.find()
            const nominal = await Nominal.find()

            console.log(alert)
            res.render('Admin/Voucher/index', {
                name: req.session.user.name,
                title: 'Voucher',
                voucher,
                category,
                nominal,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    view_update: async(req, res)=>{
        try {
            const {id} = req.params
            const voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals')
            const category = await Category.find()
            const nominal = await Nominal.find()

            res.render('Admin/Voucher/update',{
                name: req.session.user.name,
                title: 'Voucher',
                nominal,
                voucher,
                category
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {name, category, nominals} = req.body
            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1]
                let filename =  req.file.filename + '.' + originalExt
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async ()=>{
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })
                        await voucher.save()

                        req.flash('alertMessage', 'Add voucher successfuly')
                        req.flash('alertStatus', 'success')
                        res.redirect('/voucher')
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/voucher')
                    }
                })
            }else{
                const voucher = new Voucher({
                    name,
                    category,
                    nominals,
                })
                await voucher.save()

                req.flash('alertMessage', 'Add voucher successfuly')
                req.flash('alertStatus', 'success')
                res.redirect('/voucher')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionUpdate: async(req, res)=>{
        try {
            
            const {id} = req.params
            const {name, category, nominals} = req.body
            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1]
                let filename =  req.file.filename + '.' + originalExt
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async ()=>{
                    try {
                        const voucher = await Voucher.findOne({_id:id})
                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage)
                        }

                        await Voucher.findOneAndUpdate({
                            _id:id},{
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        req.flash('alertMessage', 'Update voucher successfuly')
                        req.flash('alertStatus', 'success')
                        res.redirect('/voucher')
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/voucher')
                    }
                })
            }else{
                await Voucher.findOneAndUpdate({
                    _id:id},{
                    name,
                    category,
                    nominals
                })

                req.flash('alertMessage', 'Update voucher successfuly')
                req.flash('alertStatus', 'success')
                res.redirect('/voucher')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionRemove: async(req, res)=>{
        try {
            
            const {id} = req.params
            
            let voucher = await Voucher.findOneAndDelete({_id:id})
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage)
            }


            req.flash('alertMessage', 'Remove voucher successfuly')
            req.flash('alertStatus', 'success')
            res.redirect('/voucher')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },
    actionUpdateStatus: async(req, res)=>{
        try {
            const {id} = req.params
            const voucher = await Voucher.findOne({_id:id})
            let status = voucher.status === 'Y' ? 'N' : 'Y'
            await Voucher.findOneAndUpdate({
                _id:id},{
                status
            })

            req.flash('alertMessage', 'Update voucher status successfuly')
            req.flash('alertStatus', 'success')
            res.redirect('/voucher')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },




}