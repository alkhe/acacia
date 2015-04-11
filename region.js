var Region = function(size) {
	this.a = Array(size);
	this.length = this.a.length;
};

Region.prototype.rsh = function(v) {
	this.a.unshift(v);
	this.a.pop();
};

Region.prototype.lsh = function(v) {
	this.a.push(v);
	this.a.shift();
};

Region.prototype.set = function(i, v) {
	this.a[i] = v;
}

Region.prototype.get = function(i) {
	return this.a[i];
}

Region.prototype.available = function() {
	for (var i = 0; i < this.length; i++) {
		if (this.a[i] === undefined) {
			return i;
		}
	}
	return undefined;
}

Region.prototype.resize = function(length) {
	this.a = this.a.slice(0, length);
	this.length = this.a.length;
}

module.exports = Region;
