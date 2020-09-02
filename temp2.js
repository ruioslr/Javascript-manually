function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                 : arr.slice();
 };

function createFlow(effects = []) {
    let sources = flatDeep(effects.slice());
    function run(callback) {
      while (sources.length) {
        const task = sources.shift();
        // 把callback放到下一个flow的callback时机里执行
        const next = () => createFlow(sources).run(callback)
        if (typeof task === "function") {
          const res = task();
          if (res && res.then) {
            res.then(next);
            return;
          }
        } else if (task.isFlow) {
          task.run(next);
          return;
        }
      }
      callback && callback();
    }
    return {
      run,
      isFlow: true,
    };
  }
  const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
  createFlow([
    () => console.log("a"),
    () => console.log("b"),
    createFlow([() => delay(1000).then(() => console.log("c"))]),
    [() => delay().then(() => console.log("d")), () => console.log("e")],
  ]).run(() => console.log('done'));
  