var http = require('http');
var log = require('simple-node-logger').createSimpleLogger('project.log');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require("request");
var bot = require("./bot");
var fbAPI = require("./api/facebookAPI");

var express = require('express');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    log.info(entries);
    var messaging = entry.messaging;
    for (var message of messaging) {
      var sender = message.sender.id;
      if (message.message) {
        // If user send text
        if (message.message.text) {
          var text = message.message.text;
          bot.chat(text, output => {
            if (output.type == "text") {
              var reply = output.output;
              fbAPI.sendTextMessage(sender, reply);
            } else if (output.type == "post") {
              var posts = output.output;
              if (posts.length > 0) {
                //sendTextMessage(sender, "These articles might be helpful for you ;)");
                fbAPI.sendTextMessage(sender, "Bạn xem thử mấy bài này nhé ;)");
                fbAPI.sendGenericMessage(sender, posts);
              } else {
                fbAPI.sendTextMessage(sender, "Xin lỗi mình không tim được bài nào ;)");
                //sendTextMessage(sender, "Sorry, I can not find any article for you :'(");
              }

            }
          });
          
        } else if (message.message.attachments) {
          fbAPI.sendAttachmentBack(sender, message.message.attachments[0]);
        }
      }
    }
  }

  res.status(200).send("OK");
});


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

server.listen(app.get('port') ,app.get('ip'), function() {
  console.log("Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});


