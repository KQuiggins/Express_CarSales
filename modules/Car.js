const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cars4sale');

const carSchema = new mongoose.Schema({
    cid: { type: Number, required: true, unique: true },
    year: { type: Number, min: 0,required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    miles: { type: Number, min: 0, required: true },
    price: { type: Number, min: 0, required: true },
    dealer_id: { type: String, required: true },
});

module.exports = mongoose.model('Car', carSchema);

// cars = [
//     { cid: 1, year: 2015, make: 'Toyota', model: 'Camry', miles: 10000, price: 15000, dealer_id: 'MH228' },
//     { cid: 2, year: 2016, make: 'Honda', model: 'Accord', miles: 20000, price: 20000, dealer_id: 'LS522' },
//     { cid: 3, year: 2017, make: 'Ford', model: 'Fusion', miles: 30000, price: 25000, dealer_id: 'KI234' },
//     { cid: 4, year: 2018, make: 'Chevrolet', model: 'Malibu', miles: 40000, price: 30000, dealer_id: 'MJ209' },
//     { cid: 5, year: 2019, make: 'Nissan', model: 'Altima', miles: 50000, price: 35000, dealer_id: 'SG302' },
//     { cid: 6, year: 2020, make: 'Hyundai', model: 'Sonata', miles: 60000, price: 40000, dealer_id: 'MJ209' },
//     { cid: 7, year: 2021, make: 'Kia', model: 'Optima', miles: 70000, price: 45000, dealer_id: 'YZ223' },
// ]
