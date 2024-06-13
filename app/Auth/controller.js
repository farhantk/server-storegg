const path = require('path')
const fs = require('fs')
const config = require('../../config')
const Player = require('../Player/model')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports={
    signUp: async(req, res, next)=>{
        try {
            const payload = req.body
            
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
                        let player = new Player({
                            ...payload,
                            avatar: filename
                        })
                        await player.save()
                        delete player._doc.password
                        res.status(201).json({data:player})
                    } catch (err) {
                        if(err && err.name ==='ValidationError'){
                            res.status(422).json({
                                error: 2,
                                message: err.message,
                                fields: err.errors
                            })
                        }
                        next(err)
                    }
                })
            }else{
                let player = new Player(payload)
                await player.save()
                delete player._doc.password
                res.status(201).json({data:player})
            }
        } catch (err) {
            if(err && err.name ==='ValidationError'){
                res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
            next(err)
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            const player = await Player.findOne({ email: email });
            if (player) {
                const checkPassword = bcrypt.compareSync(password, player.password);
                if (checkPassword) {
                    const token = jwt.sign({
                        player: {
                            id: player._id,
                            name: player.name,
                            email: player.email,
                            username: player.username,
                            phoneNumber: player.phoneNumber,
                            avatar: player.avatar
                        }
                    }, config.jwtkey);
                    res.status(200).json({
                        data: { token }
                    });
                } else {
                    res.status(403).json({
                        message: 'Wrong password'
                    });
                }
            } else {
                res.status(403).json({
                    message: 'Email not registered'
                });
            }
        } catch (err) {
            res.status(500).json({
                message: `Internal server error: ${err.message}`
            });
        }
    }
}