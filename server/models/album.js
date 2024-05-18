const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    artist_id: {type: mongoose.Types.ObjectId, ref: 'artist', required: true},
    uri: {type: String, unique: true},
    album_name: {type: String}
}
);

module.exports = mongoose.model('album', albumSchema);