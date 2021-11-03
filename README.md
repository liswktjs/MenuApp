# MenuApp
☕바닐라 JS 에서의 자바스크립트를 통한 상태관리, 이벤트 처리, 웹서버와의 비동기 통신, 모듈관리 등을 배우기 위한 공간 

umedy의 블랙커피 vanilla JS lv1 강의 내용을 바탕으로 진행


✨ 2021.11.02 

- 오늘의 요구 사항 

### 메뉴 추가
[X] 메뉴의 이름을 입력받고 확인 버튼을 누르면 메뉴가 추가 된다

[X] 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다

[X] 메뉴가 추가되고 나면, input 값은 빈 값으로 초기화 한다 

[X] 추가되는 마크업은 ```<ul id="espresso-menu-list" class="mt-3 p1-0"></ul> ```에 추가해야 한다

[X] 총 메뉴 개수를 count하여 상단을 보여준다

[X] 사용자 입력값이 빈 값이라면 추가되지 않는다

### 메뉴 수정
[X] 메뉴의 수정 이벤트를 클릭하면 메뉴이름을 업데이트를 한다 

[X] 메뉴 수정 시 prompt 창을 띄워서 신규 메뉴 명을 입력받고 확인 시 메뉴가 수정된다 

### 메뉴 삭제 

[X] 메뉴 삭제 버튼을 클릭시 comfirm 창을 띄워서 확인 버튼을 클릭시 메뉴가 삭제 된다 

[X] 총 메뉴 개수를 count하여 상단을 보여준다 


<hr>

- 이벤트 위임 : 특정 이벤트에 해당하는 자식 요소를 생성하지 않고도 부모요소에서 위임을 받아서 처리가 가능하다 

유저의 앱 내에서의 활동에 의해서 element가 추가 되는 경우에 추가될 것으로 예상되는 element에 대해서 사용한다 

이벤트 위임으로 처리를 할때에는 현재 클릭된 요소의 부모요소로 이동해서 다시 querySelector를 통해서 접근해주는 것이 좋다


- e.target을 통해서 어떤 것이 클릭 되었는지 (이벤트가 발생하였는지) 판단할 때에는 .classList.contains를 활용해서 특정 class를 포함하는 요소인지 확인한다

<hr>


🔨 2021.11.03 


- 오늘의 요구 사항 

### 로컬스토리지에서 데이터 읽고 쓰기

[ ] localStoarge에 데이터 저장한다

[ ] localStoarge에 저장된 데이터를 읽어서 새로고침해도 메뉴가 보이도록 한다 


### 카테고리별 메뉴판 관리

[ ] 에스프레소 메뉴판 관리 

[ ] 프라푸치노 메뉴판 관리

[ ] 티바나 메뉴판 관리

[ ] 블렌디드 메뉴판 관리

[ ] 디저트 메뉴판 관리

### 페이지 접근시 최초 데이터 read & rendering

[ ] 최초로 메뉴판에 접근했을때 localStoarge에서  에스프레소 메뉴를 가져와서 맨 처음 보이도록 한다

### 품절 상태 관리 

[ ] 품절 상태 일 경우 품절 버튼을 추가한다 

[ ] 품절 버튼을 클릭 시 localStoarge에 품절 상태가 저장이 된다 

[ ] 품절 메뉴의 경우 상태값이 페이지에 그려진다 

[ ] 클릭 이벤트로 가장 가까운 li tag에 sold-out class를 추가한다 
