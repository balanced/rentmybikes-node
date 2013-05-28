
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { config: config, title: "", req: req });
};
