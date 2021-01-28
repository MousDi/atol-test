const io = require("../../server");
const db = require("../models");
const Product = db.products;




// Create and Save a new Product
exports.create = (req, res) => {

    // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Please give the product a name!" });
    return;
  }


  if (!req.body.type) {
    res.status(400).send({ message: "Please give the product a type!" });
    return;
  }



  if (!req.body.price || req.body.price == 0) {
    res.status(400).send({ message: "Please give the product a price!" });
    return;
  }



  if (!req.body.warranty_years) {
    res.status(400).send({ message: "Please give the product a number of warranty years!" });
    return;
  }



  const product = new Product({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    rating: 0,
    warranty_years: req.body.warranty_years,
    available: req.body.available ? req.body.available : false
  });

  

  // Save Product in the database
  product
    .save(product)
    .then(data => {
      res.send(data);
      io.emit('product', 'server:');

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving the product."
      });
    });
  
};


// Retrieve all Product from the database.



// Retrieve all Product from the database.
exports.findAll = (req, res) => {

 

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
      console.log(msg);
      io.emit('my broadcast', `server: ${msg}`);
    });
  });
  
    
 

    Product.find()
      .then(data => {
       
        if(data == "" || data.length == 0){
          const product1 = new Product({
            name: "AC1 Phone1",
            type: "phone",
            price: 205.05,
            rating: 3.8,
            warranty_years: 1,
            available:  true
          });
        
          const product2 = new Product({
            name: "AC1 Phone2",
            type: "phone",
            price: 147.21,
            rating: 1,
            warranty_years: 3,
            available:  false
          });
        
          const product3 = new Product({
            name: "AC1 Phone3",
            type: "phone",
            price: 150,
            rating: 2,
            warranty_years: 1,
            available:  true
          });
        
          const product4 = new Product({
            name: "AC1 Phone4",
            type: "phone",
            price: 50.20,
            rating: 3,
            warranty_years: 2,
            available:  true
          });

         
          product1
          .save(product1).then(() =>
            {
              product2
          .save(product2).then(() =>
            {
              product3
          .save(product3).then(() =>
            {
              product4
              .save(product4).then(() =>
                {
                   Product.find()
                   .then(result => {
                    res.send(result);
                    io.emit('product', result);
    
                   })
                }
              );
            }
          );
            }
          );
            }
          );

        }

        else
        {
        res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product."
        });
      });
};


// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Product with id=" + id });
      });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Product with id=${id}. Maybe Product was not found!`
            });
          } else res.send({ message: "Product was updated successfully. id" + JSON.stringify(data) });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Product with id=" + id
          });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        } else {
          res.send({
            message: "Product was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
    Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Product were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};