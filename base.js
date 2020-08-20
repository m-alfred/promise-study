/*
 * @Author: alfred 
 * @Date: 2020-08-19 16:18:34 
  @desc:  Promise基本使用
 */ 
/**
 * 使用promise创建ajax请求
 * Promise构造函数
 * @param {*} url 
 */
function request(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

(async ()=> {
  try {
    const res = await request('http://www.miaokefu.com/api/test/detail');
    console.log('res:', res);
  } catch(err) {
    console.error(err)
  }
})();

let count = 1;
/**
 * Promise.resolve
 * Promise.reject
 * @param {*} url 
 */
async function delay() {
  let tip = ''
  try {
    await new Promise(((resolve, reject) => {
      setTimeout(() => {
        if (count % 2 === 1 ) {
          tip = `num: ${count} is odd`
          resolve();
        } else {
          tip = `num: ${count} is even`
          reject();
        }
      }, 2000);
    }));
    count++;
    return Promise.resolve('success:' + tip)
  } catch (err) {
    return Promise.reject('error:' + tip)
  }
};

(async ()=> {
  try {
    const res = await delay();
    console.log('res:', res); // res: success:num: 1 is odd
  } catch(err) {
    console.error(err)
  }
  try {
    const res = await delay();
    console.log('res:', res);
  } catch(err) {
    console.error(err) // error:num: 2 is even
  }
})();