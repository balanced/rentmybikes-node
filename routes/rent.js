exports.list = function (req, res) {
    //res.end('listing of rents');
    res.render('rent_list', {
	config: config,
	title: "",
	req: req,
	user: req.session.user,
	csrf: req.session._csrf,

	hide_button: false,
	list: [ // TODO make this come from some database or something
	    { title: "some title",
	      description: "some desc",
	      price: "price less",
	      bike_type: "cool",
	      id: 1
	    }
	]
    });
};

exports.view = function (req, res) {
    //req.params.id
    res.render('rent_show', {
	config: config,
	title: "",
	req: req,
	user: req.session.user,
	csrf: req.session._csrf,

	hide_button: true,

	listing:  { title: "some title",
	      description: "some desc",
	      price: "price less",
	      bike_type: "cool",
	      id: 1
	    }
    });
    //res.end('view list '+req.params.id);
    //res.render('
};
