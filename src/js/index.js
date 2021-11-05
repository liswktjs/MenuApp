import {$} from './utils/dom.js';
import store from './store/index.js';
import MenuApi from './api/index.js';


function App() {
    // 상태관리가 필요로 하는 것 - 메뉴명
    this.menuObject = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: [],
    }; 
    // 처음 시작할때에 로컬 스토리지에서 값을 불러와서 그리기 
    this.init = async () => {
        this.menuObject[this.currentCategory] = await MenuApi.getAllMenuByCategory(
            this.currentCategory
        );
        render();
        initEventListeners();
    };
    //현재 어떤 카테고리인지 가리키는 변수 
    this.currentCategory = 'espresso';

    //template을 그려주는 함수
    const render = async () => {      
        this.menuObject[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
        const template = this.menuObject[this.currentCategory]
        .map((item) => {
            return `
            <li data-menu-id="${item.id}" class=" menu-list-item d-flex items-center py-2">
                <span class="${item.isSoldOut ? "sold-out" : ""} w-100 pl-2 menu-name">${item.name}</span>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                품절
                </button>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                수정
                </button>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                삭제
                </button>
            </li>
            `;
        }).join("");
        $('#menu-list').innerHTML = template;
        countMenu();
    }

    //메뉴추가되는 함수
    const addMenuName = async () => {
        //사용자 입력값이 빈값일 때에
        if($('#menu-name').value === ''){
            alert('값을 입력해 주세요');
            //뒷부분 실행되지 않기 위해 return 
            return;
        }
        const duplicateItem = this.menuObject[this.currentCategory].find((menuItem) => menuItem.name === $("#menu-name").value)
        if (duplicateItem){
            alert("이미 등록된 메뉴 입니다. 다시 입력해주세요");
            $("#menu-name").value = "";
            return;
        }
        const menuName = $('#menu-name').value;
        await MenuApi.createMenu(this.currentCategory, menuName);
        render();
        $("#menu-name").value = "";
        
    };
    //메뉴의 개수 세기 함수
    const countMenu = () => {
        
        const menuCount = this.menuObject[this.currentCategory].length;

        $(".menu-count").innerText = `총 ${menuCount}개`;
    }

    //메뉴 수정하는 함수
    const updateMenuName = async (e) =>{
        const menuId = e.target.closest("li").dataset.menuId;
        const $whatName = e.target.closest("li").querySelector('.menu-name');
        const updateName = prompt("수정할 메뉴이름을 입력해주세요", $whatName.innerText);
        await MenuApi.updateMenu(this.currentCategory,updateName,menuId);
        render();
    }
    
    //메뉴 삭제하기 함수
    const removeMenuName = async (e) => {
        if (confirm("삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            await MenuApi.deleteMenuName(this.currentCategory, menuId);
            render();
        }
        
    }

    //메뉴 품절상태로 만드는 함수 
    const soldOutMenu = async (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        await MenuApi.toggleSoldOutMenu(this.currentCategory,menuId);
        render();
    }

    const initEventListeners = () => {
        //form tag 자동으로 전송되는 것 막기 
        $('#menu-form').addEventListener("submit", (e) => {
            e.preventDefault();
        });

        //확인버튼 클릭시 
        $('#menu-submit-button').addEventListener("click",addMenuName);

        // 메뉴의 입력 
        $('#menu-name').addEventListener('keypress', (e) => {
            if(e.key === 'Enter'){
                addMenuName();
            };
        });
        //메뉴 수정 삭제 요청을 부모요소에서 받기
        $("#menu-list").addEventListener("click", (e) => {
        
            //menu 수정 
            if (e.target.classList.contains('menu-edit-button')) {
                updateMenuName(e);
                return;
            }

            // menu 삭제
            if(e.target.classList.contains('menu-remove-button')) {
                removeMenuName(e);
                return;
            }
            //menu 품절 
            if(e.target.classList.contains('menu-sold-out-button')){
                soldOutMenu(e);
                return;
            }
        });

        

        //카테고리 클릭시 해당 메뉴로 화면 렌더링
        $("nav").addEventListener("click", async (e) => {
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            if(isCategoryButton){
                const categoryName = e.target.dataset.categoryName;
                this.currentCategory = categoryName;
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
                render();
            }
        })
        }
    
    }

//인스턴스 생성 (인스턴스를 생성해야 this를 사용이 가능하다 -> 객체에서 사용하므로)
const app = new App();
app.init();