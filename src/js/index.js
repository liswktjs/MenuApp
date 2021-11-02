const $ = (selector) => document.querySelector(selector);

function App() {
    //form tag 자동으로 전송되는 것 막기 
    $('#espresso-menu-form').addEventListener("submit", (e) => {
        e.preventDefault();
    });

    //메뉴추가되는 함수
    const addMenuName = () => {
        //사용자 입력값이 빈값일 때에
        if($('#espresso-menu-name').value === ''){
            alert('값을 입력해 주세요');
            //뒷부분 실행되지 않기 위해 return 
            return;
        }
        const menuName = $('#espresso-menu-name').value;
        const menuItemTemplate = (menuName) => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${menuName}</span>
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
        };
        $('#espresso-menu-list').insertAdjacentHTML(
            "beforeend",menuItemTemplate(menuName)
        );
        //메뉴의 개수 세기 
        const menuCount = $('#espresso-menu-list').querySelectorAll("li").length;

        $(".menu-count").innerText = `총 ${menuCount}개`;

        //input 안에 내용 초기화 
        $("#espresso-menu-name").value = '';    
            
        
    }

    //확인버튼 클릭시 
    $('#espresso-menu-submit-button').addEventListener("click", () => {
        addMenuName();
    });

    // 메뉴의 입력 
    $('#espresso-menu-name').addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            addMenuName();
        };
    });

    //menu 수정 
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains('menu-edit-button')) {
            const $whatName = e.target.closest("li").querySelector('.menu-name');
            const updateName = prompt("수정할 메뉴이름을 입력해주세요", $whatName.innerText);

            $whatName.innerText = `${updateName}`;
        }
    })
    
}

App();