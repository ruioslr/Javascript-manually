// new 的原理： new 的目标函数的this指向实例，目标函数返回object类型则返回它，否则返回实例

function create (Constructor, ...args) {
    const obj = new Object();
    obj.__proto__ = Constructor.prototype;
    const res = Constructor.apply(obj, args);

    // 构造函数返回null,也是返回实例; 构造函数返回function, 那么结果也是function
    if(typeof res === 'object' && res !== null || typeof res === 'function'){
        return res;
    }

    return obj;

}