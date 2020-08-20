/*
 * @Author: alfred 
 * @Date: 2020-08-19 13:21:55 
  @desc:  Promise.race(iterable)
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
  当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。

  兼容性：https://caniuse.com/#search=Promise.race
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
const p2 = generatePromise(3000);

const p3 = generateRejectPromise(2000);
const p4 = generateRejectPromise(500);

Promise.race([p1, p2, p3]).then((res)=>{
  // p1最先完成
  // 1000ms后输出结果
  console.log('res:', res); // res: 1000
})

Promise.race([p1, p2, p4]).then((res)=>{
  console.log('res:', res); 
}).catch(err => {
  // p4最先完成
  // 500ms后输出结果
  console.log('err:', err); // err: timeout:500
})

// 我们可以使用race方法，设置http请求的超时
function request(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

function niceRequest(url, { timeout} = {}) {
  return Promise.race([
    request(url),
    generateRejectPromise(timeout)
  ])
}

// 设置请求1000ms超时
niceRequest('http://www.miaokefu.com/api/test/detail', {
  timeout: 1000
}).then((res)=>{
  // 网络切换online测试
  console.log('niceRequest res:', res);  
  // res: {"code":200,"success":true,"msg":"success","data":{"name":"alfred"}}
}).catch(err => {
  // 网络切换slow3G测试 请求超时
  console.log('niceRequest err:', err); // niceRequest err: timeout:1000
})

