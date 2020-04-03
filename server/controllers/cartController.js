//Require swag from models/swag.js
const swag = require('../models/swag');

//Export an object with an add, delete, and checkout method. Each method should capture req and res as parameters.

module.exports = {
  //This method is responsible for making sure the swag isn't already in the cart.
  //If it isn't, add it to the cart and increase the total by the price of the swag.
  //If it is, just return the request session's user object with a status of 200.
  //This method will use the request query to get an id.
  //We can then use this id to see if it is already in the cart and preform the required logic.
  add: (req, res) => {
    const { id } = req.params; //Should check the request parameter for an id.
    let { user } = req.session;

    const index = swag.findIndex(swag => swag.id == id);

    if (index !== -1) {
      //Should use the id to see if it is already in the user's cart on session.
      //// This will return -1 if it isn't in the cart
      const selectedSwag = swag[index];
      //find the swag object from models/swag using the id and add it to the cart on session.
      user.cart.push(selectedSwag);
      //Add the price of the swag to the total on the session.
      user.total += selectedSwag.price;
    }
    //send a status 200 with the request session's user object.
    res.status(200).send(user);
  },
  delete: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    const i = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.find(swag => swag.id == id);

    if (i !== -1) {
      user.cart.splice(i, 1);
      user.total -= selectedSwag.price;
    }
    res.status(200).send(user);
  },

  checkout: (req, res) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).send(user);
  }
};
