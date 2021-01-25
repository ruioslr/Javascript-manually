const MyPromise = require('../Promise/promise');

const resData = 100;

const promiseParam = (res, rej) => {
    setTimeout(() => res(resData), 3000); 
}

describe('测试MyPromise', () => {
    it('Promise Resove的值是否正确', (done) => {
        const promise = new MyPromise(promiseParam);
    
    
        promise.then(data => {
            expect(data).toBe(resData);
            done();
        });
    });
})

