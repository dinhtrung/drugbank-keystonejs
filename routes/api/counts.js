var async = require('async');
var keystone = require('keystone');

module.exports = function (req, res) {
	var counts = {};
	async.each(keystone.lists, function (list, next) {
		list.model.count(function (err, count) {
			counts[list.key] = count;
			next(err);
		});
	}, function (err) {
		if (err) return res.apiError('database error', err);
		return res.json({
			counts: counts,
		});
	});
};
