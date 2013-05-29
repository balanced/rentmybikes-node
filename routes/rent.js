var models = require('../models');


exports.list = function (req, res) {
    //res.end('listing of rents');
    models.listing.all(function (err, data) {
	res.render('rent_list', {
	    config: config,
	    title: "",
	    req: req,
	    user: req.session.user,
	    csrf: req.session._csrf,

	    hide_button: false,
	    list: data /*[ // TODO make this come from some database or something
			 { title: "some title",
			 description: "some desc",
			 price: 15.00,
			 bike_type: "cool",
			 id: 1
			 }
			 ]*/
	});
    });
};

exports.view = function (req, res) {
    //req.params.id
    models.listing.get(req.params.id * 1, function (err, data) {
	if(err)
	    return res.redirect('back');
	res.render('rent_show', {
	    config: config,
	    title: "",
	    req: req,
	    user: req.session.user,
	    csrf: req.session._csrf,

	    hide_button: true,

	    listing:  data /*{ title: "some title",
			description: "some desc",
			price: 15.00,
			bike_type: "cool",
			id: 1
		      }*/
	});
    });
    //res.end('view list '+req.params.id);
    //res.render('
};

exports.view_post = function (req, res) {
    // TODO: Charge the card and stuff
    res.render('rent_complete', {
	config: config,
	title: "",
	req: req,
	user: req.session.user,
	csrf: req.session._csrf,

	hide_button: true,

	listing:  { title: "some title",
		    description: "some desc",
		    price: 15.00,
		    bike_type: "cool",
		    id: 1
		  }
    });
};
