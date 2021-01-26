// debounce 作用： 事件触发了经过一段时间后才执行，如果在这段时间内，再吃触发，则重新计时

// 第一个版本，这样已经ok了，但是没有立即执行的功能
function debounce(func, wait) {
  let timer;
  return function (...args) {
      // 保持this的指向问题
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
        func.apply(context, args)
    }, wait);
  };
}





// 包含立即执行的功能、
function debounce2(func, wait, immediate) {
    let timer;
    return function (...args){
        const context = this;

        if(immediate){
            immediate = false;
            func.apply(context, args)
        }

        if(timer) clearTimeout(timer);
        
        timer = setTimeout(() => {
            func.apply(context. args)
        }, wait)
    }
}
