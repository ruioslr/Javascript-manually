// 节流： 如果你持续触发事件，每隔一段时间，只执行一次事件。
// 节流就是放技能，不管你怎么按q，它也是固定的cd时间放一次


function throttle(func, duration) {
    let flag = true;
    return function (...arg){
        const context = this;
        if(flag){
            flag = false;
            setTimeout(() => {
                flag = true;
            },duration);
            func.apply(context, arg)
        }
    }
}