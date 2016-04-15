var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require("request");
var bot = require("./bot");

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
    var messaging = entry.messaging;
    for (var message of messaging) {
      var sender = message.sender.id;
      if (message.message) {
        if (message.message.text) {
          var text = message.message.text;
          bot.chat(text, output => {
            if (output.type == "text") {
              var reply = output.output;
              sendTextMessage(sender, reply);
            } else if (output.type == "post") {
              var posts = output.output;
              if (posts.length > 0) {
                sendTextMessage(sender, "These articles might be helpful for you ;)");
                sendGenericMessage(sender, posts);
              } else {
                sendTextMessage(sender, "Sorry, I can not find any article for you :'(");
              }

            }
          });
          
        } else if (message.message.attachments) {
          sendTextMessage(sender, "Sorry I can't understand this :'(.");
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


var token = "EAAQ7fVPeyokBAOJeRcxo0VwZBGMWUNQD9OmAfxGKJyYepiOtzaioGZCZBDHTTTSRtTCcc4HWXywizNAx5IfZBKN3GbLWiOyVrSRNfDtPewNJDbMn921WZB1pPRTBdhshQmVGRaX6K9DaCWfgAHEAb1WVBNVpU1eu7Ot4ApVqbaQZDZD";

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

function sendGenericMessage(sender, posts) {
  
  var messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": []
      }
    }
  };
  
  var messageElements = posts.map(post => {
    return {
      title: "Article",
      subtitle: post.title,
      item_url: post.URL,
      image_url: post.featured_image,
      buttons: [{
        type: "web_url",
        url: post.URL,
        title: "Read this"
      }]
    }
  });
  
  messageData.attachment.payload.elements = messageElements;
  
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}