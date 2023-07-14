const ShortUniqueId = require('short-unique-id');
const urlModel = require('../model/urlModel');


module.exports={
    shorturl:(req,res,next)=>{
        try {
            let api={}
            const linkRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
            if(linkRegex.test(req.body.shortUrl)){
                const uid = new ShortUniqueId();

            const uuid = uid.stamp(12);
            console.log(uuid);

            const newurl=urlModel({
                orginalUrl:req.body.shortUrl,
                shortUrl:uuid
            })
            newurl.save().then((data)=>{
                api.data=data
                api.status="success"
                res.json(api)
            })
            }else{
                api.status="error"
                api.message="Please enter valid email"
                res.json(api)
            }
        } catch (error) {
            next(error)
        }
    },

    shorturlcheck:async(req,res,next)=>{
       try {
        console.log(req.body,"shorturlcheck");

       let details=await urlModel.find({shortUrl:req.body.urlid})
       if(details.length){
        res.json(details)
       }else{
        res.json("Invaild Url")
       }
       } catch (error) {
        next(error)
       }
       
    }
}