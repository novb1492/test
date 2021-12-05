# test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


생각해논 어플 구상전  
지도를 사용해야 해서 테스트중입니다  

주의 검색후 지도를 자동으로 움직이고 싶다면  
//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services  
맨뒤에 &libraries=services  를 꼭 붙혀야한다  

마커표시법  
걷색후 카테고리가 가정,생활 > 슈퍼마켓/가정,생활 > 식품판매 인 상점만  마커표시  
(추후 카테고리를 더알아내서 추가예정)  

거리계산법  
거리계산은 백엔드 에서 이뤄짐  
배달받을 우치의 위도/경도 x,y  
상점 위치의 위도/경도 mx,my  
전송후 계산이 완료되면 받는다  
물론 네비게이션 처럼 계산하는게 아닌  
반영 nkm이내 가 필요하기 때문에 저렇게 계산한다  

기본적 테스트는 여기까지 본프젝트 생성하자  


