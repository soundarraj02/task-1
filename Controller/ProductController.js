 const { modelNames } = require("mongoose");
const Product = require("../model/ProductModel")

exports.product_create = async function (req, res) {
    let added = await Product.create(req.body);
    let d = sum(1,1)
    console.log(d)
    res.send({status:true, message:"Product added", data:added});
}



exports.product_details = async function (req, res) {
        let skip = 0
        let limit = req.query.limit
        let page = req.query.page
        if (page != 1) {
            skip = (page - 1) * parseInt(limit)
        }
        let found 
        if(req.query.searchQuery){
            found = await Product.find({name:{ $regex: req.query.searchQuery, $options: "i" },isActive:true}).populate("category");
        }else{
            found = await Product .find({isActive:true}).select({name:1}).populate("category","name");
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

exports.testing = async(req,res)=>{
    let karthi = [];
    let soundhar=[];
    req.body.name.forEach(e=>{
        if(e=="karthi") {
            karthi.push(e);
        } else if (e=="soundar") {
            soundhar.push(e);
        }
    })
    res.send({status:true, data:{karthi:karthi,soundhar:soundhar}});
}

exports.sumArray = async(req,res)=>{
    let count=0;
    req.body.sumArray.forEach(e=>{
        count=count+e.amount
    })
    console.log(count)
    res.send({status:true,data:{total:count}});
}

  
 exports.RemoveDuplicate = async(req,res)=>{
    let resArr = [...new Set(req.body.order.map(a=> a.user.userId))];
    res.send({status:true,message:"Remove duplicate done",data:resArr});
 }

 exports.reverseString = async(req,res) => {
    // Step 1. Use the split() method to return a new array
    var splitString = req.body.str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    
    console.log(joinArray);
}

