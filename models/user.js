var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	nombre: { type: String, required: true, trim: true },
	apellido: { type: String, required: true, trim: true },
	edad: {type: Number, required: true, default: 0},
	genero: {
		type: String, 
		required: true, 
		enum: ['Hombre', 'Mujer']
	},
	creado: {
		type: Date,
		default: Date.now()
	},
	empresa: { type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
	user: { type:String, required: true, trim: true},
	salt: String,
	hash: String
});

module.exports = mongoose.model('User', UserSchema);