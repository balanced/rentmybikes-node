
var login = require('./login');
var rent = require('./rent');

exports.load = function(app) {
    app.get('/', rent.list);

    app.get('/rent', rent.list);
    app.get('/rent/:id', rent.view);
    app.post('/rent/:id', rent.view_post);

    //    app.get('/list',

    app.get('/account', login.account);

    app.get('/login', login.login);
    app.post('/login', login.login_post);
    app.get('/logout', login.logout);
    app.get('/signup', login.signup);
    app.post('/signup', login.signup_post);
};

/*
function index(req, res) {
    console.log(req.session);
    res.render('index', {
	config: config,
	title: "",
	req: req,
	user: req.session.user
    });
}
*/
