var express = require('express'),
    app = express(),
    soap = require('soap'),
    endpoint = 'https://secure.logmeinrescue.com/api/api.asmx?wsdl',
    args = {
      sEmail: 'jfeltis@gmail.com',
      sPassword: 'aQfWv2%NXv4gj0POcKjaeV791q^j6$a7zti!EvyHSapiH'
    };

app.set('port', (process.env.PORT || 1337));

app.get('/requestAuthCode', function(req, res){
  soap.createClient(endpoint, function(e, client){
    if(e){
      console.error(e);
      return false;
    }
    client.requestAuthCode(args, function(er, results){
      if(er){
        console.error(er);
        return false;
      }
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(results));
    });
  });
});

app.listen(app.get('port'), function(){
  console.log(`listening on ${app.get('port')}`);
});
