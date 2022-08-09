const jwt = require('jsonwebtoken');



//autenticacion con JWT - esta es la q se esta usando
const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization; //esto trae: "Bearer 'accesToken'" del front
	console.log(`Soy authHeader: ${authHeader}`);
	console.log(req.userLogin)
	console.log(req.data)
	
	if (authHeader){
	  const token = authHeader.split(" ")[1]; //saca Bearer y se queda con el accesToken solamente
	  jwt.verify(token, process.env.JWT_SEC, (error,userLogin) => {
		if(error){
		  return res.status(403).json(`Token no válido`);
		}
		req.userLogin = userLogin; 
		next();
	  })
	} else{
	  res.status(401).json(`No está autenticado`);
	}
  };



//verificaciones de backup
// VERIFY IF USER IS AUTHENTICATED
const verifyTokenUser = (req, res, next) => {
	const authHeader = req.headers.token;

	if(authHeader) {
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if(err) {
				return res.status(403).json(`El token no es válido o ha expirado`)
			} else {
				req.user = user;
				console.log("user: ", user)
				next()
			}
		});
	} else {
		return res.status(401).json(`Usted no está autenticado`);
	}
};


// VERIFY IF BUSINESS IS AUTHENTICATED
const verifyTokenBusiness = (req, res, next) => {
	const authHeader = req.headers.token;

	if(authHeader) {
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.JWT_SEC, (err, business) => {
			if(err) {
				return res.status(403).json(`El token no es válido o ha expirado`)
			} else {
				req.business = business;
				console.log("business: ", business)
				next()
			}
		});
	} else {
		return res.status(401).json(`Usted no está autenticado`);
	}
};





// VERIFY IF USER IS AUTHORIZED
const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if(req.user.id === req.params.id || req.user.isAdmin) {
			next()
		} else {
			res.status(403).json(`Usted no tiene permitido ingresar a esta ruta`)
		}
	});
};




// VERIFY IF USER IS ADMIN
const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if(req.user.isAdmin) {
			next()
		} else {
			res.status(403).json(`Usted no tiene permitido ingresar a esta ruta si no es Administrador/a`);
		}
	});
};



// VERIFY IF USER TYPE IS BUSINESS
const verifyTokenAndBusiness = (req, res, next) => {
	verifyTokenBusiness(req, res, () => {
		if(req.business.isBusiness) {
			next()
		} else {
			res.status(403).json(`Usted no tiene permitido ingresar a esta ruta porque no es empresa`)
		}
	});
};





module.exports = { verifyToken, verifyTokenUser, verifyTokenBusiness, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndBusiness }