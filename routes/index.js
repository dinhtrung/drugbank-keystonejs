/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var cors = require('cors');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
  api: importRoutes('./api'),
};

function initList (req, res, next) {
 req.keystone = keystone;
 req.list = keystone.list(req.params.list);
 if (!req.list) {
   if (req.headers.accept === 'application/json') {
     return res.status(404).json({ error: 'invalid list path' });
   }
   req.flash('error', 'List ' + req.params.list + ' could not be found.');
   return res.redirect('/' + keystone.get('admin path'));
 }
 next();
};
// Setup Route Bindings
exports = module.exports = function (app) {
  app.use(cors());
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

  // TODO: Add extra routes here app.all('/api*', keystone.middleware.api);
  // Init API request helpers

  app.all('/api/counts', routes.api.counts);
	app.get('/api/:list', initList, routes.api.list.get);
	app.get('/api/:list/:format(export.csv|export.json)', initList, routes.api.list.download);
	app.post('/api/:list/create', initList, routes.api.list.create);
	app.post('/api/:list/update', initList, routes.api.list.update);
	app.post('/api/:list/delete', initList, routes.api.list.delete);
	// items
	app.get('/api/:list/:id', initList, routes.api.item.get);
	app.post('/api/:list/:id', initList, routes.api.item.update);
	app.post('/api/:list/:id/delete', initList, routes.api.list.delete);
	app.post('/api/:list/:id/sortOrder/:sortOrder/:newOrder', initList, routes.api.item.sortOrder);

	// #6: List Routes
	// app.all('/:list/:page([0-9]{1,5})?', IndexRoute);
	// app.all('/:list/:item', IndexRoute);
};
