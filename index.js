const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const Car = require('./modules/Car.js');
app.use(express.static('public'));

app.post('/showAll', function(req, res) {
    Car.find(function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            let tableString = '<table class="car-table"><tr><th>ID</th><th>Year</th><th>Make</th><th>Model</th><th>Miles</th><th>Price</th><th>Dealer ID</th></tr>';
            for (let i = 0; i < data.length; i++) {
                tableString += `<tr><td>${data[i].cid}</td><td>${data[i].year}</td><td>${data[i].make}</td><td>${data[i].model}</td><td>${data[i].miles}</td><td>${data[i].price}</td><td>${data[i].dealer_id}</td></tr>`;
            }
            tableString += '</table>';

            // add inline styles to table and cells
            tableString = '<style>.car-table { border-collapse: collapse; } .car-table th, .car-table td { border: 1px solid black; padding: 5px; }</style>' + tableString;

            res.send(tableString);
        }
    });
});


app.post('/updateCar', function(req, res) {
    const cid = req.body.cid;
    Car.findOneAndUpdate({ cid: cid }, req.body, { new: true }, function(err, updatedCar) {
        if (err) {
            res.status(500).send(err);
        } else if (!updatedCar) {
            res.status(404).send('Car not found');
        } else {
            const carInfo = '<div style="background-color: #f2f2f2; padding: 10px;"><p style="font-weight: bold;">Miles update:</p><p>' + updatedCar.miles + '</p><p style="font-weight: bold;">Price update:</p><p>' + updatedCar.price + '</p></div>';

            res.send(carInfo);
        }
    });
});

app.post('/deleteCar', function(req, res) {
    const deleteCid = req.body.cid;

    Car.findOneAndDelete({ cid: deleteCid }, function(err, deletedCar) {
        if (err) {
            res.status(500).send(err);
        } else if (!deletedCar) {
            res.status(404).send('Car not found');
        } else {
            res.send('<div style="background-color: #f2f2f2; padding: 10px;"><p style="font-size: 24px; font-weight: bold;">🚗 Car Deleted! 👀</p></div>');
        }
    });
});



app.post('/addCar', function(req, res) {
    const newCar = new Car({
        cid: req.body.cid,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        miles: req.body.miles,
        price: req.body.price,
        dealer_id: req.body.dealer_id,
    });

    newCar.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.send('<div style="background-color: #f2f2f2; padding: 10px;"><p style="font-size: 24px; font-weight: bold;">🚗 Car added! 😎</p></div>');

        }
        
    });
});

app.post('/findCar', function(req, res) {
    const searchCid = req.body.cid;
    Car.findOne({ cid: searchCid }, function(err, foundCar) {
        if (err) {
            res.status(500).send(err);
        }
        else if (!foundCar) {
            res.send("No car with that cid found");
        }
        else {
            carData = `
                    <div class="car-data">
                        <p><strong>ID:</strong> ${foundCar.cid}</p>
                        <p><strong>Year:</strong> ${foundCar.year}</p>
                        <p><strong>Make:</strong> ${foundCar.make}</p>
                        <p><strong>Model:</strong> ${foundCar.model}</p>
                        <p><strong>Miles:</strong> ${foundCar.miles}</p>
                        <p><strong>Price:</strong> ${foundCar.price}</p>
                        <p><strong>Dealer ID:</strong> ${foundCar.dealer_id}</p>
                    </div>
                    `;

            // add CSS styles to the div and paragraphs
            carData = '<style>.car-data { border: 1px solid black; padding: 10px; } p { margin: 0; }</style>' + carData;

            res.send(carData);

        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
