<template>
    <div id="mapPage">
        <div id="map"></div>
        <input type="text" @keyup="search()" id="name">
        <input type="button" @click="getHomeAddress()" value="받을 주소 불러오기">
        <input type="button" @click="tryOrder()" value="주문하기">
    </div>
   
    
</template>
<style scoped>
#map {
  width: 400px;
  height: 400px;
}
</style>
<script>
import axios from 'axios';
export default {
   name :'firstdoor',
    data() {
    return {
      map: null,
      destinationFlag:true,
      destinationX:0,
      destinationY:0,
      maketX:0,
      maketY:0
    };
  },
  created() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
    document.head.appendChild(script);

  },
   methods: {
    tryOrder(){
      axios.get("http://localhost:8080/getMeter",{withCredentials: true}).then(result=>{
        console.log(result);
      });
    },
    getHomeAddress(){
      var num=2;
      var address=null;
      if(num==1){
        address='서울특별시 동작구 흑석동 서달로 2길';
      }else{
        address='서울특별시 동작구 흑석동 서달로 2길 29';
      }
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status)=> {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) { 
            this.destinationX=result[0].x;
            this.destinationY=result[0].y
            var coords = new kakao.maps.LatLng(this.destinationY, this.destinationX);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: this.map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">배달 받으실 주소</div>'
            });
            infowindow.open(this.map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            this.map.setCenter(coords);
            this.destinationFlag=false;
        } 
      });    
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    search(){
        var n=document.getElementById('name').value;
        if(this.destinationFlag){
          alert('배달 받으실 주소를 먼저 선택해주세요');
          document.getElementById('name').value="";
          return;
        }
        console.log("검색한 마트 키워드"+n);
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(n, (result,status)=>{
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();
                for (var i=0; i<result.length; i++) {
                    console.log(result[i]);
                    if(result[i].category_name.includes('가정,생활 > 슈퍼마켓')||result[i].category_name.includes('가정,생활 > 식품판매 >')){
                      this.displayMarker(result[i]);    
                      bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x));
                    }

                }       

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                this.map.setBounds(bounds);
            } 

        });
        
    },
    displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        // 마커위에 상호명 표시
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(this.map, marker);
         // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            
        
        });
    } 
  
  },
 
   
}

</script>
