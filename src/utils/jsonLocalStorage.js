const jsonLocalStorage = {
  setItem: (key, value) => {
    // console.log('localStorage.setItem() 실행');

    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    // console.log('localStorage.getItem() 실행');
    return JSON.parse(localStorage.getItem(key));
  },
};

export default jsonLocalStorage;