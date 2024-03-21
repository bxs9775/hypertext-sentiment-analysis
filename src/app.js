// imports
const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');

const routers = require('./routers');

// sets the port for the server to use
const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// Create app
const app = express();

// static assets folder
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));

// disabling x-powered-by header
app.disable('x-powered-by');

// handlebars
const hbs = expressHandlebars.create({ defaultLayout: 'main' })
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

// routing
app.use('/api',routers.apiRouter);
app.use('/',routers.appRouter);

// start app listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});