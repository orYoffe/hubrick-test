
const LOCALSTORAGE__KEY = 'hubrick_storage_key';
let data = {};

function isNumber(n) {
  return n && !isNaN(parseInt(n, 10)) && parseInt(n, 10) > 0;
}

function hasTextValue(text) {
  return text && typeof text === 'string' && text.trim().length > 0;
}

function isFunction(func) {
  try {
    const resultFunc = new Function('return ' + func.trim() + ';')();
    if (typeof resultFunc !== 'function' || !hasTextValue(func)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

function getStorage() {
  try {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE__KEY));
  } catch (e) {
    return null;
  }
}

function setStorage(data) {
  try {
    localStorage.setItem(LOCALSTORAGE__KEY, JSON.stringify(data));
  } catch (e) {
    return null;
  }
}

data = getStorage() || data;
