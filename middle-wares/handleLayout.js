var categoryRepo = require('../repos/categoryRepo');
var producerRepo=require('../repos/producerRepo');
var  productRepo = require('../repos/productRepo');

module.exports = (req, res, next) => {
	console.log("isLogged------------------")
	console.log(req.session.isLogged);
	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

	if (req.session.isAdmin === undefined) {
		console.log('admin login failed')
		req.session.isAdmin = false;
	}

	var p1=categoryRepo.loadAll();
	var p2=producerRepo.loadAll();
	if(req.session.isLogged==true)
	{
		var arr_p = [];
		for (var i = 0; i < req.session.cart.length; i++) {
			var cartItem = req.session.cart[i];
			var p = productRepo.single(cartItem.ProId);
			arr_p.push(p);
		}
		var items = [];
		var total=0;
		var CartInfo;
		Promise.all(arr_p).then(result => {
			for (var i = result.length - 1; i >= 0; i--) {
				var pro = result[i][0];
				var item = {
					Product: pro,
					Quantity: req.session.cart[i].Quantity,
					Amount: pro.gia * req.session.cart[i].Quantity
				};
				total=total+item.Amount;
				items.push(item);
			}

			res.locals.CartInfo = {
				items: items,
				total: total
			};
		});
	}

	// dữ liệu tạo menu
	Promise.all([p1, p2]).then(([rows1, rows2])=>{
		res.locals.layoutVM={
			categories: rows1,
			producers: rows2,
			isLogged: req.session.isLogged,
			curUser: req.session.user,
			isAdmin: req.session.isAdmin, //flag for admin only layout
			isSearch: false,
			showNavBar: true,
			showSideBar: true,
		};
		//console.log(req.session.user);
		//console.log(res.locals.layoutVM);
		next();
	});
};