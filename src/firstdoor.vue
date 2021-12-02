<template>
    <div id="mapPage">
        <div id="map"></div>
        <input type="text" @keyup="search()" id="name">
    </div>
   
    
</template>
<style scoped>
#map {
  width: 400px;
  height: 400px;
}
</style>
<script>
export default {
   name :'firstdoor',
    data() {
    return {
      map: null,
    };
  },
    created() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
      document.head.appendChild(script);
    
  },
   methods: {
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
        console.log(n);
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(n, (result,status)=>{
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();
                for (var i=0; i<result.length; i++) {
                    //displayMarker(result[i]);    
                    bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x));
                }       

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                this.map.setBounds(bounds);
            } 

        });
        
    },
  
  },
 
   
}

</script>
