
const Fulfilled = 'Fulfilled';
const Rejected = 'Rejected';
const Pending = 'pending';

function MyPromise(excutor){
    let self = this;

    this.status = Pending;
    this.reason = null;
    this.value = null;

    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = function(value){
        if(self.status === Pending){
            self.status = Fulfilled
            self.value = value;
            self.onFulfilledCbs.forEach(cb => cb(self.value));
        }
    }

    const reject = function (value){
        if(self.status === Pending){
            self.status = Rejected;
            self.reason = value;
            self.onRejectedCbs.forEach(cb => cb(self.reason));
        }
    }


    excutor(resolve,reject);
}

MyPromise.prototype.then = function (onFulfilled, onRejected){
    if(this.status === Pending){
        this.onFulfilledCbs.push(onFulfilled);
        this.onRejectedCbs.push(onRejected);
    }
}


module.exports = MyPromise;