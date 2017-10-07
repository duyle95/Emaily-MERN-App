const mongoose = require('mongoose');
const { Schema } = mongoose;

// inside the Schema are an object containing all properties in database
const userSchema = new Schema({
  googleID: String
});

mongoose.model('users', userSchema);

// not using module.exports here as we will use test tools
