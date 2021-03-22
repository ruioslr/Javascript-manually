Array.prototype.cusBind = function bind (context, ...args) {
    var self = this;
    return function (...args2) {
        self.apply(context, [...args, ...args2])
    }
}

// 构造函数在使用bind时，context失效

Array.prototype.cusBind = function bind (context, ...args) {
    const self = this;
    const F = function (...args2) {
        self.apply(this instanceof F ? this : context, [...args,...args2 ])
    }

    // F.prototype = self.prototype

    const tempF  = function(){};
    tempF.prototype = self.prototype;

    F.prototype = new tempF();

    return F;
}