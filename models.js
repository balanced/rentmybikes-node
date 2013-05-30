var orm = require('orm');


var _dummy_data = {
    user: [
	{ name: "Tabitha Royce"
	  , email: "tt@example.com"
	  , password: "-cant-login-with-this-hash"
	  , balanced_id: "/v1/customers/AC2ReyNfI1yapM1rFPdVDE0U"
	  , id: 1
	}
    ],
    listing: [
	{ title: "panasonic fixie"
	  , description: "Early 80's panasonic 10spd frame with a nice new chrome fork, aluminum bars, nice aluminum stem, weinman singlespeed/fixed wheel set (velocity style rims)."
	  , price: 15
	  , bicycle_type: "fixie"
	  , user_id: 1
	  , location: "Palo Alto, CA"
	},
	{ title: "cosmic cx 1.0"
	  , description: "The Cozmic CX 1.0 features a butted frame (reduces weight) combined with hydraulic brakes to give amazing stopping power with light feel. The forks feature lock out and pre load adjustment-useful if you are riding along the road to work, or to the race."
	  , price: 18
	  , bicycle_type: "hybrid"
	  , user_id: 1
	  , location: "San Francisco, CA"
	},
	{ title: "myata vintage road bike"
	  , description: "This 12-speed Miyata 512 is built on a lugged, triple-butted, CroMo frame. A solid ride with a tight race geometry to keep it quick and easy to handle."
	  , price: 12
	  , bicycle_type: "road"
	  , user_id: 1
	  , location: "San Francisco, CA"
	},
	{ title: "roberts cycles clubman"
	  , description: "The Clubman is tough enough, yet comfortable enough for regular commuting. The tubing is slightly heavier-duty than the Audax to take larger panniers. Tubing is Reynolds 853 & 725 with 531 Forks."
	  , price: 10
	  , bicycle_type: "touring"
	  , user_id: 1
	  , location: "San Francisco, CA"
	}
	],
    rental: []
};

var connection = exports.connection = orm.connect(config.database, function (err, db) {
    if(err) throw err;

    exports.user = db.define('User', {
	name: String,
	email: String,
	password: String,
	balanced_id: String
    }, {

    });

    exports.listing = db.define('Listing', {
	title: String,
	description: String,
	price: Number,
	bicycle_type: String,
	user_id: Number,
	location: String
    }, {

    });

    exports.rental = db.define('Rental', {
	debit_uri: String,
	credit_uri: String,
	owner_uri: String,
	credit_uri: String,
	owner_id: Number,
	buyer_id: Number,
	timestamp: Date
    }, {

    });

    db.sync(function (err) {
	for(var n in _dummy_data) {
	    (function (name) {
		exports[name].count(function (err, count) {
		if(count == 0)
		    exports[name].create(_dummy_data[name], function (err, res) {});
		});
	    })(n);
	}
    });

});
