const productdata=require('./constant/productdata');
const Products=require('./models/productSchema');

const Defaultdata= async()=>{
      try{

        await Products.deleteMany({});
       const storedata=await Products.insertMany(productdata);
       console.log(storedata);
      }catch(error){
       console.log('error'+error.message);
      }
};


module.exports=Defaultdata;
