const mongoose = require("mongoose")

const resturantschema = mongoose.Schema({
     name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [{
   
    name: String,
    description: String,
    price: Number,
    image: String
  }]
 
  
})

const resturantmodel = mongoose.model("resturant", resturantschema)
module.exports={resturantmodel}