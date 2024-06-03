module.exports={
    index: async(req, res)=>{
        try {
            res.render('index', {
                title: 'Wahahah'
            });
        } catch (err) {
            console.log(err);
        }
    }

}