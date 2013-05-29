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
