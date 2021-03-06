// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'drugbank',
	'brand': 'drugbank',
	// 'headless': true,

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'mongo': 'mongodb://127.0.0.1:27017/mydb',

	// Service Configuration
	// 'google api key': '',
	// 'google server api key': '',
	// 'ga property': '',
	// 'ga domain': '',

	// Image File config
	'cookie secret': 'drugbank.vn',

	// AdminUI config: https://keystonejs.com/documentation/configuration/admin-ui-options
	'wysiwyg images': true,
	'wysiwyg cloudinary images': true,
	'wysiwyg s3 images': true,
	'wysiwyg additional buttons': 'searchreplace visualchars,'
   + ' charmap paste, forecolor backcolor ',
  'wysiwyg additional plugins': 'table, advlist, anchor,'
   + ' autolink, contextmenu, media, pagebreak,'
   + ' paste, searchreplace, wordcount',

	 'signin logo': '../logo.png',
	 // Change '/keystone' to '/admin' for backend
	 'admin path': 'admin',
	 's3 config': {
		 bucket: 'drugbank',
  	key: 'JMGUTP19W8XSTEYHW27N',
  	secret: 'G1UTXdZw8GWUtDgpHrR+6DbgVzkPbp3DpKEfKl+0',
  	region: undefined,
		publicUrl: 'https://debian.soibe.xyz:9000',
		style: 'path',
		endpoint: 'https://debian.soibe.xyz:9000'
	 }
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	'Drug Bank': ['thuoc', 'duoc-si', 'doanh-nghiep'],
	// posts: ['posts', 'post-categories'],
	// galleries: 'galleries',
	// enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
