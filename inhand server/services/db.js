// import mongoose
const mongoose = require('mongoose')

// connect mongodb
mongoose.connect('mongodb://localhost:27017/inhand', () => {
    console.log('mongodb connected successfully....');
})





const Inhand = mongoose.model('Inhand', {
    name: String,
    email: String,
    username: String,
    password: String,
    mobile: Number

})

const Product = mongoose.model('Product', {
    imagUrl: String,
    name: String,
    price: Number,
    id: Number,
    place: String
})




// export
module.exports = {
    Inhand,
    Product
}