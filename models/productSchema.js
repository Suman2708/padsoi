const mongoose=require('mongoose');


const productSchema=mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:{
        shortTitle:String,
        longTitle:String
    },
    price:Object,
    description:String,
    discount:String,
    tagline:String
});

const Products=new mongoose.model("products",productSchema);

module.exports=Products;