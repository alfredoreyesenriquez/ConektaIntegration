var http = require('http'); 
var express = require('express');
var bodyParser = require('body-parser'); 
var request = require('request'); 
var cors = require('cors');
var conekta = require('conekta');


//init express 
var app = express(); 
app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' })); 
app.use(cors({origin: '*'})); 

//init conekta
conekta.api_key = 'key_P8yGhd2eUt7wqfWswxthVg';
conekta.api_version = '2.0.0';


app.post('/conekta/tarjeta', function(req, res){
    //console.log(req.body)
    var customer = conekta.Customer.create({
        'name': 'Fulanito Pérez',
        'email': 'fulanito@conekta.com',
        'phone': '+52181818181',
        'payment_sources': [{
          'type': 'card',
          'token_id': req.body.token
        }]
      }, function(err, response) {
          if(err){
            res.send(err);
            res.writeHead(200);
            res.end();
            //console.log(err);
            return;
          }
          var resultado = response.toObject();
          var order = conekta.Order.create({
                "line_items": [{
                    "name": "Tacos",
                    "unit_price": 1000,
                    "quantity": 12
                }],
                "shipping_lines": [{
                    "amount": 1500,
                    "carrier": "FEDEX"
                }], //shipping_lines - physical goods only
                "currency": "MXN",
                "customer_info": {
                "customer_id": resultado.id
                },
                "shipping_contact":{
                    "address": {
                        "street1": "Calle 123, int 2",
                        "postal_code": "06100",
                        "country": "MX"
                    }
                },  //shipping_contact - required only for physical goods
                "metadata": { "description": "Compra de creditos: 300(MXN)", "reference": "1334523452345" },
                "charges":[{
                    "payment_method": {
                    "type": "default"
                    }  //payment_methods - use the customer's <code>default</code> - a card
                }]
            }, function(err, response) {
                if(err){
                    res.send(err);
                    res.writeHead(200);
                    res.end();
                    //console.log(err);
                return;
                }
                res.send(response.toObject());
                res.writeHead(200);
                res.end();
            });
          //console.log(res.toObject());
      });
});

app.get('/conekta/oxxo', function(req, res){
    var order = conekta.Order.create({
        "line_items": [{
            "name": "Tacos",
            "unit_price": 150000,
            "quantity": 1
        }],
        "shipping_lines": [{
            "amount": 1500,
            "carrier": "FEDEX"
        }], //shipping_lines - phyiscal goods only
        "currency": "MXN",
        "customer_info": {
          "name": "Fulanito Pérez",
          "email": "fulanito@conekta.com",
          "phone": "+5218181818181"
        },
        "shipping_contact":{
           "address": {
             "street1": "Calle 123, int 2",
             "postal_code": "06100",
             "country": "MX"
           }
        }, //shipping_contact - required only for physical goods
        "charges":[{
          "payment_method": {
            "type": "oxxo_cash"
          }
        }]
      }, function(err, response) {
        res.send(response.toObject())
          console.log(response.toObject());
      });
});

app.get('/conekta/spei', function(req, res){
    var order = conekta.Order.create({
        "line_items": [{
            "name": "Tacos",
            "unit_price": 100000,
            "quantity": 1
        }],
        "shipping_lines": [{
            "amount": 1500,
            "carrier": "FEDEX"
        }], //shipping_lines - physical goods only
        "currency": "MXN",
        "customer_info": {
          "name": "Fulanito Pérez",
          "email": "fulanito@conekta.com",
          "phone": "+5218181818181"
        },
        "shipping_contact":{
           "address": {
             "street1": "Calle 123, int 2",
             "postal_code": "06100",
             "country": "MX"
           }
        }, //shipping_contact - required only for physical goods
        "charges":[{
          "payment_method": {
            "type": "spei"
          }
        }]
      }, function(err, response) {
            res.send(response.toObject())
            console.log(response.toObject());
      });
});


app.listen(3032);