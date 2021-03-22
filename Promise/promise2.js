// 真的实现PromiseA+的promise

const Fulfilled = "fulfilled";
const Rejected = "rejected";
const Pending = "pending";

function APromise(excutor) {
  this.status = Pending;
  this.resolveCbs = [];
  this.rejectedCbs = [];
  this.value = null;
  this.reason = null;

  const self = this;

  function fulfilled(value) {
    if (self.status === Pending) {
      self.value = value;
      self.status = Fulfilled;

      setTimeout(() => {
        self.resolveCbs.forEach((cb) => cb(self.value));
      }, 0);
    }
  }

  function rejection(reason) {
    if (self.status === Pending) {
      self.reason = reason;
      self.status = Rejected;

      setTimeout(() => {
        self.rejectedCbs.forEach((cb) => cb(self.reason));
      }, 0);
    }
  }

  try {
    excutor(fulfilled, rejection);
  } catch (err) {
    rejection(err);
  }
}

// 执行then的时候，promise状态可能还是pending, 也可能不是
APromise.prototype.then = function then(resCb, rejCb) {

    const self = this;

    // 对不是函数的处理， 这样处理可以在链式调用的时候，参数穿透
    if(typeof resCb !== 'function') resCb = function (value){ return value;}
    if(typeof rejCb !== 'function') rejCb = function (reason) { throw reason;}

    if(self.status === Fulfilled){
        return new APromise(function(resolve, reject){
            try{
                const result = resCb(self.data);
                // 结果是promise，则
                if(result instanceof APromise){

                }
            }catch(err){

            }
        })
    }

};

APromise.prototype.catch = function (cb) {
  return this.then(null, cb)
};

APromise.all = function all() {};

APromise.race = function race() {};
