const Product = require("../model/ProductModel")

exports.product_create = async function (req, res) {
    let added = await Product.create(req.body);
    let d = sum(1,1)
    console.log(d)
    res.send({status:true, message:"Product added", data:added});
}


// exports.product_details = async(req,res) => {
//     try{
//         let found = await Product.find({isActive:true});
//         res.send({status:true, message:"Product list", data:found})
//     } catch(e) {
//         res.send({status:false, message:"error occurred"});
//     }
// }
exports.product_details = async function (req, res) {
        let skip = 0
        let limit = req.query.limit
        let page = req.query.page
        if (page != 1) {
            skip = (page - 1) * parseInt(limit)
        }
let found 
        if(req.query.searchQuery){
            found = await Product.find({name:{ $regex: req.query.searchQuery, $options: "i" },isActive:true},);
        }else{
            found = await Product .find({isActive:true},);
        }
        let sortedArray;
        if(req.query.priceVariant) {
            if(req.query.priceVariant=="lowtohigh") {
                sortedArray =  found.sort((a,b)=>a.price - b.price);
            } else if(req.query.priceVariant=="hightolow"){
                sortedArray =  found.sort((a,b)=>b.price - a.price);
            }
        } else {
            // sortedArray=found
            sortedArray =  found.sort((a,b)=>b.price - a.price);
        } 
       
        res.send({status:true, message:"Product list", data:found});
    }
     
exports.product_update = async function (req, res) {
    let update = await Product.findOneAndUpdate({_id:req.query.id},req.body);
    let found = await Product.findOne({_id:req.query.id});
    res.send({status:true,message:"product update",data:found});
};
exports.deleteproduct = async(req,res) => {
    try{
        let deleted = await Product.deleteOne({_id:req.query.id});
        if(deleted.deletedCount>0) {
            res.send({status:true, message:"Product deleted"});
        } else {
            res.send({status:false, message:"Product not deleted"});
        }
    } catch(e) {
        res.send({status:false, message:"error occurred"});
    }
}

function sum(a,b) {
    console.log("hi")
    let c = a+b;
    return c;
}

exports.stringMatch = async(req,res) => {
    if(req.body.name=="soundhar") {
        res.send({status:true,message:"string match"});
    } else {
        res.send({status:false, message:"string not match"});
    }
}