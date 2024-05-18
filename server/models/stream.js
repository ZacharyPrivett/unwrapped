const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamSchema = new Schema({
    user_id: {type: String, req: [true, 'User ID is required']},
    time: {type: Date, unique: true},
    song_id: {type: mongoose.Types.ObjectId, ref: 'song'}
}
);

module.exports = mongoose.model('stream', streamSchema);