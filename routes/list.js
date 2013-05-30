var models = require('../models');
var payments = require('../card_processing.js');

exports.create = function (req, res) {
    if(!req.session.user)
	return res.redirect('/login?r='+req.url);

    res.render('list_create', {
	    config: config,
	    title: "",
	    req: req,
	    user: req.session.user,
	    csrf: req.session._csrf,
    });
};

exports.create_post = function(req, res) {
    if(!req.body.bank_account_uri)
	return res.end('there was an error');
    payments.add_bank(req.session.user.payments_id, req.body.bank_account_uri, function(err, result) {

    });
};
