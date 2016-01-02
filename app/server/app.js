var express       = require('express');
var app           = express();
var ig            = require('instagram-node').instagram();
var config        = require('../../config');
var ECT           = require('ect');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');

ig.use({
    client_id: config.clientId,
    client_secret: config.clientSecret
});

var ectRenderer = ECT({
    watch: true,
    root: __dirname + '/../views',
    ext : '.ect'
});

app.set('view engine', 'ect');
app.set('views', __dirname + '/../views');

app.engine('ect', ectRenderer.render);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app, config, ig);

exports.run = function(port){
    app.listen(port);
    console.log('Listening on port %s', port || 3000);
}
