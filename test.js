// const charm = require('charm')(),
// 	colors = require('colors');
//
// colors.setTheme(['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray']);
//
// charm.pipe(process.stdout)
// charm.reset();
//
// // for (var i = 0; i < 5; i++) {
// // 	charm.foreground(colors[i]).write('A');
// // 	if (i == 4) {
// // 		i = -1;
// // 	}
// // }
//
// // for (var i = 0; i < 8; i++) {
// // 	charm.write(colors[i]('█'));
// // }
// //
// // charm.on('^C', function() {
// // 	charm.foreground(0);
// // });

var logarr = function(a) {
	for (var i = 0; i < a.length; i++) {
		console.log(i, a[i]);
	}
}

var Region = require('./region');

var r = new Region(8);
logarr(r.a);
console.log();
r.lsh(5);
r.lsh(5);
logarr(r.a);
console.log();
r.rsh(5);
logarr(r.a);
console.log();
console.log(r.available());
