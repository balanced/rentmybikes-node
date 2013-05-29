exports.login_post = function (req, res) {
    // TODO

    req.session.user = {
	email: req.body.email || "mfl@asdf",
	name: "matt",
	uri: "something ggg"
    };
    console.log(req.session);
    res.redirect(req.session.login_redirect || '/account');
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
    // TODO
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
