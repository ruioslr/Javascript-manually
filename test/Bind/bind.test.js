const MyPromise = require('../Bind/bind');

const resData = 100;

const promiseParam = (res, rej) => {
    setTimeout(() => res(resData), 3000); 
}

describe('测试bind', () => {
    it('bind是否正确', (done) => {
        const promise = new MyPromise(promiseParam);
    
    
        promise.then(data => {
            expect(data).toBe(resData);
            done();
        });
    });
})

