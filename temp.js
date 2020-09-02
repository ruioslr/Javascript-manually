
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Mic -> Mac 1s 

function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                 : arr.slice();
 };

function createFlow(params) {

    let args = flatDeep(params.slice());


    function run (cb) {
        // forEach 的 return 只能return掉回调函数！！！！！！！！！！！
        // args.forEach((ars, index) => {
        //     if(typeof ars === 'function'){
        //         const res = ars();
 
        //         if(res && res.then){
        //             res.then(() => createFlow(args.slice(index + 1)).run(cb));
        //             return;
        //         }
                
        //     }
        //     if(ars.isFlow) {
        //         ars.run(() => createFlow(args.slice(index + 1)).run(cb));
        //         return ;
        //     }
        // })
        for(var i=0; i < args.length; i++){
            const ars = args[i];
            const index = i;
            if(typeof ars === 'function'){
                const res = ars();
 
                if(res && res.then){
                    res.then(() => createFlow(args.slice(index + 1)).run(cb));
                    return;
                }
                
            }
            if(ars.isFlow) {
                ars.run(() => createFlow(args.slice(index + 1)).run(cb));
                return ;
            }
        }
        cb && cb();
    }


    return {run, isFlow: true}
}

// const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  createFlow([() => delay(1000).then(() => console.log("c"))]),
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log("done");
});
