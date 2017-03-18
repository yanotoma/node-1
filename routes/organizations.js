var express = require('express');
var router = express.Router();
var Organization = require('../models/organization');

// GRABAR
router.post('/', function(req, res, next){
	Organization.create(req.body, function(err, organization){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió un error',
				error: err
			});
		}else{
			res.send({
				status: 1,
				data: organization
			});
		}
	});
});

// LISTAR
router.get('/', function(req, res, next){
	Organization.find({}, function(err, organizations){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió un error',
				error: err
			});
		}else{
			res.send({
				status: 1,
				data: organizations
			});
		}
	});
});

// OBTENER DETALLE
router.get('/:id', function(req, res, next){
	Organization.findById(req.params.id, function(err, organization){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió un error',
				error: err
			});
		}else{
			res.send({
				status: 1,
				data: organization
			});
		}
	});
});

// ACTUALIZAR

router.put('/:id', function(req, res, next){
	Organization.findByIdAndUpdate(req.params.id, req.body, {new: true} , function(err, organization){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió un error',
				error: err
			});
		}else{
			res.send({
				status: 1,
				data: organization
			});
		}
	});
});


module.exports = router;