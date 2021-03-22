// 未考虑构造函数版本
function bind (context, ...bindArgs) {
    const self = this;  // 方法本体    
    return function (...args) {
        self.apply(context, [...bindArgs, ...args])
    }

}



// 考虑了构造函数的终极版本
// 在构造函数中： 
//    bind的this指向的实例而不是bind的第一个参数，即bind函数在new时，第一个参数是this
//    bind返回的函数的prototype可以访问到原函数prototype上的数据。

function bindComplete(context, ...bindArgs){
    const self = this;

    const F = function (...args){
        // 解决够造函数this问题
        self.apply(this instanceof F ? this : context, [...bindArgs, ...args])
    } 


    // 使用一个中间函数绑定F与原函数的prototype；
    const fTemp = function() {};

    // 将原函数prototype上的属性被F继承
    fTemp.prototype = self.prototype;
    F.prototype = new fTemp();

    return F;
}