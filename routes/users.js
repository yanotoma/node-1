var express = require('express');
var router = express.Router();
var User = require('../models/user');
var hash = require('../lib/pass').hash;
var jwt = require('jsonwebtoken');
var passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }) ,function(req, res, next) {
  
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

	var password = req.body.password;
	delete req.body.password;

	hash(password, function(err, salt, hash){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió un error al encriptar el password',
				error: err
			});
		}else{

			var user = new User(req.body);

			user.salt = salt;
			user.hash = hash;

			user.save(function(err, newUser){
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
						data: newUser,
					});
				}
			});

		}
	});
});

router.post('/login', function(req, res, next){
	//validar que ha enviado los datos
	if(!req.body.user || !req.body.password){
		res.send({
			status: 0,
			mensaje: 'Datos incompletos',
		});

		return;
	}

	User.findOne({user: req.body.user}, 
		function(err, user){
			if(err){
				res.send({
					status: 0,
					mensaje: 'Ocurrió un error',
					error: err 
				});
				return;
			}

			// password = salt + hash
			// password - salt = hash

			//validar password
			hash(req.body.password, user.salt , 
				function(err, hash){

				if(err){
					res.send({
						status: 0,
						mensaje: 'Ocurrió un error',
						error: err 
					});
					return;
				}

				if(hash != user.hash){
					res.send({
						status: 0,
						mensaje: 'Password incorrecto'
					});

					return;
				}

				//generar token
				var payload = {id: user.id};
				var token = jwt.sign(payload, 'Mi-llave-shhhhhhh');

				res.send({
					status:1,
					user: user,
					token: token
				});
			});

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

















