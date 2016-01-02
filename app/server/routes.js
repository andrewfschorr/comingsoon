module.exports = function(app, config, ig) {
    app.get('/authorize_user', function(req, res){
        authorize_user(req, res, config, ig);
    });
    app.get('/handleauth', function(req, res){
        handleauth(req, res, config, ig);
    });

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/test', function(req, res) {
        res.render('index');
    });
}

authorize_user = function(req, res, config, ig) {
    res.redirect(ig.get_authorization_url(config.redirectUrl, { scope: ['likes'], state: 'a state' }));
};

handleauth = function(req, res, config, ig) {
    ig.authorize_user(req.query.code, config.redirectUrl, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            res.send('You made it!!');
        }
    });
};