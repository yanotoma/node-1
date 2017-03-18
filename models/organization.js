var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema({
	razsoc: { type:String, required: true, trim: true },
	ruc: { type:String, required: true, trim: true },
	direccion: { type:String, required: true, trim: true },
	telefono: { type:String, required: true, trim: true },
	creado: {type: Date, default: Date.now()}
});

module.exports = 
	mongoose.model('Organization', OrganizationSchema)