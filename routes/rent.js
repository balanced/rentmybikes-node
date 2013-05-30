var models = require('../models');
var payments = require('../card_processing');


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

	    listing:  data
	});
    });
    //res.end('view list '+req.params.id);
    //res.render('
};

exports.view_post = function (req, res) {
    // TODO: Charge the card and stuff

    //console.log(req);
    //console.log(req.body);
    console.log(req.session, req.session.user);

    models.listing.get(req.params.id *1, function(err, listing) {
	if(err)
	    return res.end('the listing was not found');
	function rent_err(err) {
	    console.log(err);
	    res.render('rent_show',  {
		config: config,
		title: "",
		req: req,
		user: req.session.user,
		csrf: req.session._csrf,

		hide_button: true,

		listing: listing,

		message: [ { str: err } ]
	    });
	}

	function make_charge(from_uri) {
	    models.user.get(listing.user_id, function(err, owner_user) {
		if(err)
		    return rent_err('The user owning this bike was not found');
		payments.charge_user(from_uri, owner_user.balanced_id, listing.price * 100, "Renting "+ listing.title, function(err, charge_result) {
		    if(err) {
			console.log(err);
			return rent_err('There was a problem charging the card');
		    }
		    //res.end('it got this far');
		    payments.last_four(from_uri, function(err, card) {
			res.render('rent_complete', {
			    config: config,
			    title: "",
			    req: req,
			    user: req.session.user,
			    csrf: req.session._csrf,

			    hide_button: true,

			    listing: listing,

			    last_four: card
			});
		    });
		});

		/**/
	    });
	}
	if(req.body.card_uri) {
	    //card_uri = req.body.card_uri;
	    if(req.session.user) { // save the card id
		payments.add_card(req.session.user.payment_id, req.body.card_uri, function(err, add_card_result) {
		    if(err)
			return rent_err("There was a problem with the adding the card to your account");
		    make_charge(req.session.user.payment_id);
		});
		//models.user.get(req.session.user.id, function (err, user) {
		//    user.card_uri = req.body.card_uri;
		//    user.save();
		//});

		//req.session.user.uri = req.body.card_uri;
	    }else{
		payments.make_account({}, function(err, new_account) {
		    payments.add_card(new_account, req.body.card_uri, function(err, add_card_result) {
			if(err)
			    return rent_err("There was a problem with the card");
			make_charge(new_account);
		    });
		});
	    }
	}else{
	    // TODO: check if they already have the card saved
	    //card_uri = req.session.user.uri;
	}


    });
};
