require('./app')

setTimeout(function() {
	console.log("The process has started up");
	process.exit(0);
}, 3000);
