//로컬스토리지 함수 
const store = {
    setLocalStorage(menu){
        localStorage.setItem("menu",JSON.stringify(menu));
    },
    getLocalStoarge(){
        return JSON.parse(localStorage.getItem("menu"));
    },
};

export default store;