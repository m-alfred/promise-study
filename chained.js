/*
 * @Author: alfred 
 * @Date: 2020-08-22 17:26:21 
  @desc:  Promise链式调用
 */ 
const start = Date.now();

function consumeTime(start) {
  return (Date.now() - start) / 1000
}

function generatePromise(timeout) {
  return new Promise(resolve => {
    console.log('start ' + timeout);
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  })
}

const p1 = generatePromise(1000);
const p2 = generatePromise(3000);
const p3 = generatePromise(1000);
// 此时会同时打印以下内容，可以看出Promise构造函数执行时executor函数是立即调用的
// start 1000
// start 3000
// start 1000

const promiseRes = p1
.then((res)=>{
  console.log('res 1:', res + ' console at ' + consumeTime(start));
  // res 1: 1000 console at 1.004
  return p2;
})
.then(res => {
  console.log('res 2:', res + ' console at ' + consumeTime(start));
  // res 2: 3000 console at 3.004
  return p3;
})
.then(res => {
  console.log('res 3:', res + ' console at ' + consumeTime(start));
  // res 3: 1000 console at 3.005
  // p3需要等p2 fulfilled后才会变成fulfilled
  return 'done'
})

console.log('promiseRes', promiseRes);
