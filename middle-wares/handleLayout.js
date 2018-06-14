var categoryRepo = require('../repos/categoryRepo');
var producerRepo=require('../repos/producerRepo');

module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

	var p1=categoryRepo.loadAll();
	var p2=producerRepo.loadAll();
	
	Promise.all([p1, p2]).then(rows1, rows2=>{
		res.locals.layoutVM={
			categories: rows1,
			producers: rows2,
			isLogged: req.session.isLogged,
			curUser: req.session.user
		};

		console.log(res.locals.layoutVM.curUser);
		next();
	});
};