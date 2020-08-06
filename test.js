var seneca = require('seneca')();

seneca  
  .use('basic')
  .use('entity');

seneca.add({"role": "product", "cmd": "create"}, (args, done) => {  
  var product = seneca.make$("Product");
  product.name = args.name;
  product.description = args.description;
  product.price = args.price;
  product.save$((err, savedProduct) => {
    done(err, savedProduct);
  });
});

// Listen for messages in the specified transport type and port.
seneca.listen({  
    "type": "http", 
    "port": 8080
});