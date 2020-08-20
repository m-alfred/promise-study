/*
 * @Author: alfred 
 * @Date: 2020-08-19 13:21:55 
  @desc:  Promise.prototype.then(onFulfilled, onRejected)
  添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来resolve.
 */ 
function generatePromise(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  })
}

function generateRejectPromise(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('timeout:' + timeout);
    }, timeout);
  })
}

const p1 = generatePromise(1000);

const p2 = generateRejectPromise(2000);

p1.then((res) => {
  console.log('p1 res:', res); // 1000ms后输出 p1 res: 1000
}, (err)=> {
  console.log('p1 err:', err);
})
p2.then((res) => {
  console.log('p2-1 then res:', res); 
}).catch(err => {
  console.log('p2-1 catch err:', err); // p2-1 catch err: timeout:2000
})
p2.then((res) => {
  console.log('p2 res:', res);
}, (err)=> {
  // 2000ms后输出 p2-2 then err: timeout:2000 then方法中的onRejected回调会优先于catch中的reject执行 
  console.log('p2-2 then err:', err); 
}).catch(err => {
  // 此时catch不会执行
  console.log('p2-2 catch err:', err); 
})