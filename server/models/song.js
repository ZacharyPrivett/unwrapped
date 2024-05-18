const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    album_id: {type: mongoose.Types.ObjectId, ref:'album', required: true},
    artist_id: {type: mongoose.Types.ObjectId, ref: 'artist', required: true},
    uri: {type: String, unique: true},
    song_name: {type: String}
}
);

module.exports = mongoose.model('song', songSchema);