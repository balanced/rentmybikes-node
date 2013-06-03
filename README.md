rentmybikes-node
================

[![Build Status](https://travis-ci.org/balanced/rentmybikes-node.png)](https://travis-ci.org/balanced/rentmybikes-node)

Reference implementation of [Balanced](https://www.balancedpayments.com) for
collecting and charging credit cards, and collecting and crediting bank accounts.

Uses jQuery, [Less](http://lesscss.org/), [Express](http://expressjs.com/), [Orm](http://dresende.github.io/node-orm2/)
[Bootstrap](http://twitter.github.com/bootstrap/).

If you'd like to deploy signup for a [Heroku](http://www.heroku.com/signup)
account if you don't already have one and install [Toolbelt]
(https://toolbelt.heroku.com/).

Resources
---
* [Balanced Node Client](https://github.com/balanced/balanced-node)
* [Balanced API docs](https://www.balancedpayments.com/docs/api?language=ruby)
* [Balanced JavaScript resources/tokenizing sensitive information](https://balancedpayments.com/docs/overview?language=ruby#tokenizing-sensitive-information)


Install
---

    $ git clone https://github.com/balanced/rentmybikes-node.git
    $ cd rentmybikes-node
    $ npm install
    $ node app

Configure
---

Edit the following in `config.js`:

* Set `exports.api_key` to your secret key and `exports.marketplace_uri` to your marketplace. Get one from [Balanced] (https://www.balancedpayments.com/marketplaces/start) if you dont have one.

Example:

```javascript
exports.marketplace_uri = "/v1/marketplaces/TEST-MP3KKQzxclo1kGjb1voIFOuc";
exports.api_key = "7b3bb55ec7bb11e285cf026ba7cd33d0";
```


Run
---

    $ foreman start

or if you dont have [Toolbelt] (https://toolbelt.heroku.com/)

    $ node app


Deploy
---
    $ cd rentmybikes-node
    $ heroku create
    $ git push origin heroku
    $ heroku ps:scale web=1
    $ heroku open
