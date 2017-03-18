var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
	User
		.find({})
		// .select('-edad')
		.populate('empresa')
		.exec(function(err, users){
			if(err){
				res.send({
					status: 0,
					message: 'Ocurrió un error',
					error: err
				});
			}else{
				res.send({
					status: 1,
					data: users
				});
			}
		});


});

//users/aldia
router.get('/aldia', function(req, res, next){
	res.send('Usuarios al día');
});

//users/10
router.get('/:id', function(req, res, next){
	var idUser = req.params.id; // parámetro GET
	// POST req.body.<variable> 

	User.findById(idUser)
		.select('nombre apellido empresa')
		.populate({
			path: 'empresa',
			select: 'razsoc ruc _id'

		})
		.exec(function(err, user){
			if(err){
				res.send({
					status: 0,
					message: 'Ocurrió un error',
					error: err
				});
			}else{
				res.send({
					status: 1,
					data: user
				});
			}
		});

});


router.post('/', function(req, res, next){
	console.log(req.body);

	User.create(req.body, function(err, user){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió un error',
				err: err,
			});
		}else{
			res.send({
				status: 1,
				mensaje: 'usuario creado',
				data: user,
			});
		}
	});
});


//PUT
// MODELO.findByIdAndUpdate(
//	<ID>, 
//	<parametros a modificar>,
//	{ new: true },
//	function(err, result){

//	})

router.put('/:id', function(req, res, next){

	User.findByIdAndUpdate(req.params.id, req.body, 
		{new: true}, 
		function(err, user){
			if(err){
				res.send({
					status: 0,
					mensaje: 'Ocurrió un error',
					err: err,
				});
			}else{
				res.send({
					status: 1,
					mensaje: 'usuario actualizado',
					data: user,
				});
			}
		});
});


module.exports = router;

















