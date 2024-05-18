const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    uri: {type: String, unique: true},
    artist_name: {type: String}
}
);

module.exports = mongoose.model('artist', artistSchema);