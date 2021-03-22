function debounce (func, delay, immediate) {
    let timer;
    return function (...args) {
        const context = this;
        if(immediate){
            immediate = false;
            func.apply(context, args);
        }
        
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
}