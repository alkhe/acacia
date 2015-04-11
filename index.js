const colors = require('colors'),
	unit = require('unitex'),
	charm = require('charm')(),
	stdout = process.stdout,
	_ = require('lodash'),
	Region = require('./region');

colors.setTheme({
	1: 'green',
	2: 'green',
	3: 'blue',
	4: 'yellow',
	5: 'red'
});

var datafmt = unit.formatter({ unit: 'B', base: 1024, atomic: true }),
	timefmt = unit.formatter({ unit: 's', prefix: -1 });

charm.pipe(process.stdout);
charm.reset();

var width = stdout.columns,
	height = stdout.rows;

var resizers = [];

stdout.on('resize', function() {
	width = stdout.columns;
	height = stdout.rows;
	_(resizers).each(function(f) {
		f();
	});
})

module.exports = function() {
	var r = new Region(height);
	resizers.push(function() {
		r.resize(height);
	});

	return function*(next) {
		var info = {
			url: this.url,
			method: this.method,
			start: new Date(),
			readable: {}
		};
		info.readable.url = info.url.yellow;
		console.log(info);

		var err;

		try {
			yield next;
		}
		catch (error) {
			err = error;
		}

		info.status = err ? (err.status || 500) : (this.status || 404);
		info.readable.status = colors[info.status / 100 | 0](info.status);

		info.end = new Date();

		info.time = info.end - info.start;
		info.readable.time = timefmt(info.time).blue;

		info.size = this.response.length;
		info.readable.size = (~[204, 205, 304].indexOf(info.status) ?
			' ' : info.size == null ?
			'-' : datafmt(info.size)).green;

		console.log(info.method, info.readable.url, info.readable.status, info.readable.time, info.readable.size);
		console.log();
	}
}
