const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

productSchema.pre('save', function(next) {
  const product = this;
  product.description += "\nÚj árú az oldalon!";
  return next();
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;