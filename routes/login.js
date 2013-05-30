var models = require('../models');
var crypto = require('crypto');
var payments = require('../card_processing');


exports.login_post = function (req, res) {
    // TODO
    models.user.find({ email: req.body.email }, function(err, data) {
	console.log(req.body, data);
	var hash = crypto.createHash('sha1').update(req.body.password || "").digest('hex');
	if (err || data.length == 0 || hash != data[0].password) {
	    res.render('login', {
		config: config,
		title: "",
		req: req,
		user: req.session.user,
		csrf: req.session._csrf,

		message: [ { str: "Username and password combination not found" } ]
	    });
	    return;
	}
	req.session.user = {
	    email: data[0].email, //req.body.email || "mfl@asdf",
	    name: data[0].name, //"matt",
	    payment_id: data[0].balanced_id,
	    //uri: data[0].card_uri, //"something ggg"
	    id: data[0].id
	};
	console.log(req.session, data[0]);
	res.redirect(req.session.login_redirect || '/account');
	req.session.login_redirect = null;
    });
    //res.end('login page');
};

exports.login = function (req, res) {

    req.session.login_redirect = req.query.r || '/account';

    res.render('login', {
	config: config,
	title: "",
	req: req,
	user: req.session.user,
	csrf: req.session._csrf
    });
};

exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect(req.query.r || 'back');
};

exports.signup = function (req, res) {
    if(req.session.user)
	return res.redirect('/');
    res.render('signup', {
	config: config,
	title: "",
	req: req,
	user: req.session.user,
	csrf: req.session._csrf
    });
};


exports.signup_post = function (req, res) {
    // This is just a demo app, but normally you would do a lot more checking on the username email and password to make sure that they are valid
    if(!req.body.email || !req.body.name || !req.body.password) {
	res.render('signup', {
	    config: config,
	    title: "",
	    req: req,
	    user: req.session.user,
	    csrf: req.session._csrf,

	    message: [ { str: "Email, Name and password all required" } ]
	});
	return;
    }
    models.user.find({ email: req.body.email }, function(err, data) {
	if(data.length) {
	    res.render('signup', {
		config: config,
		title: "",
		req: req,
		user: req.session.user,
		csrf: req.session._csrf,

		message: [ { str: "User already exists" }]
	    });
	    return;
	}
	payments.make_account({name: req.body.name, email: req.body.email }, function(err, payment_id) {
	    //console.log(payment_data);
	    var hash = crypto.createHash('sha1').update(req.body.password || "").digest('hex');
	    models.user.create([ { name: req.body.name, email: req.body.email, password: hash, balanced_id: payment_id } ], function (err, data) {
		if(err) {
		    res.render('signup', {
			config: config,
			title: "",
			req: req,
			user: req.session.user,
			csrf: req.session._csrf,

			message: [ { str: "There was a problem creating your account" } ]

		    });
		}
		req.session.user = {
		    email: data[0].email,
		    name: data[0].name,
		    payment_id: payment_id,
		    id: data[0].id
		};
		res.redirect(req.session.login_redirect || '/account');
	    });
	});
    });
};


exports.account = function(req, res) {
    if(!req.session.user)
	return res.redirect('/login');

    res.render('account', {
	config: config,
	title: "",
	req: req,
	user: req.session.user,
	csrf: req.session._csrf
    });
};
