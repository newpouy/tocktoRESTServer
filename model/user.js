var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	kakaoID: String,
	nickName: String
});

module.exports = mongoose.model('User', userSchema);
