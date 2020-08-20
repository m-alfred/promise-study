/*
 * @Author: alfred 
 * @Date: 2020-08-19 13:21:55 
  @desc:  Promise.any(iterable)
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
  接收一个Promise对象的集合，当其中的一个promise 成功，就返回那个成功的promise的值。
  
  兼容性：https://caniuse.com/#search=Promise.any
  chrome 85+支持
  firefox 79+
  safari 14+
 */ 
function generatePromise(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  })
}

const p1 = generatePromise(1000);
const p2 = generatePromise(2000);
const p3 = generatePromise(3000);

Promise.any([p1, p2, p3]).then((res)=>{
  console.log('res:', res); // 1000ms后输出结果 res: 1000
})