const mongoose = require('mongoose');

var userschema = new mongoose.Schema({
	googleID:{
		type:String,
		//required:true
	},
	/*
	email:{
		type:String,
		required:true
	},
	firstname:{
		type:String
	},
	lastname:{
		type:String
	},
	*/

	image:{
		type:String
	},
	username:{
		type:String,
	}

});

const user = mongoose.model('user',userschema);
module.exports = user;