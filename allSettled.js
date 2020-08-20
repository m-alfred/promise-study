/*
 * @Author: alfred 
 * @Date: 2020-08-19 13:21:55 
  @desc:  Promise.allSettled(iterable)
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  等到所有promises都完成（每个promise返回成功或失败）。
  返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。

  兼容性：https://caniuse.com/#search=Promise.allSettled
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

Promise.allSettled([p1, p2, p3]).then((res)=>{
  const [r1, r2, r3] = res;
  // 3000ms后输出结果
  console.log('r1:', r1);  // r1: {status: "fulfilled", value: 1000}
  console.log('r2:', r2);  // r2: {status: "fulfilled", value: 3000}
  console.log('r3:', r3);  // r3: {status: "rejected", reason: "timeout:2000"}
})