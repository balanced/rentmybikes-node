var nbalanced = require('nbalanced');

var balanced = new nbalanced({
    marketplace_uri: config.marketplace_uri,
    secret: config.api_key
});

// returns the uri to the account
exports.make_account = function(data, callback) {
    balanced.Customers.create(data || {}, function(err, user) {
	callback(err, user && user.uri || "");
    });
};

// adds a card represented by a uri to an account represented by an uri
exports.add_card = function(to, card, callback) {
    // the card is converted into a uri on the client side
    // otherwise we would use this to convert the card into a uri

    //balanced.Cards.create({ card data }, function(err, card_dat) {
    // card = card_dat.uri
    balanced.Customers.addCard(to, card, function(err, data) {
	callback(err, null);
    });
    //});
};

exports.has_a_card = function(account, callback) {
    balanced.Customers.get(user, function(err, customer) {
	if(err)
	    return callback(err, false);
	var Customers = balanced.Customers.nbalanced(customers);
	Customers.Cards.list(function(err, cards) {
	    if(err)
		return callback(err, false);
	    callback(null, cards.items.length != 0);
	});
    });
};

exports.charge_user = function(from, to, amount, description, callback) {
    console.log(arguments);
    // fix this to use uri again
    balanced.Customers.get(to, function(err, to_customer) {
	var to_account = balanced.Customers.nbalanced(to_customer);
	console.log(to_account);
	to_account.BankAccounts.list(function(err, baccounts_list) {
	    if(err)
		return callback(err, null);
	    if(baccounts_list.items.length == 0) {
		// the person receieving funds does not have a bank account listed that can be debited
		callback({ str: "User the money is being sent to does not have a bank account" }, null);
		return;
	    }
	    balanced.Customers.get(from, function(err, from_customer) {
		// get a balanced object for this specific customer
		var from_balanced = balanced.Customers.nbalanced(from_customer);
		from_balanced.Debits.create({ amount: amount }, function (err, debit_back) {
		    if(err)
			return callback(err, null);
		    to_account.Credits.add(baccounts_list.items[0].credits_uri, amount, description, function(err, credit_back) {
			callback(err, true);
		    });
		});
	    });
	});
    });
};

exports.last_four = function(user, callback) {
    balanced.Customers.get(user, function(err, customer) {
	if(err)
	    return callback(err, false);
	var Customer = balanced.Customers.nbalanced(customer);
	Customer.Cards.list(function(err, cards) {
	    if(err)
		return callback(err, false);
	    if(cards.items.length == 0)
		return callback({ str: "No cards on this account" }, false);
	    callback(null, cards.items[0].last_four);
	});
    });
};
