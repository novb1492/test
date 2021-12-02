<template>
    <div id="map"> </div>
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
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32";
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
    
  },
 
   
}

</script>
