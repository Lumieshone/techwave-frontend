<template>
  <v-app>
    <v-main>
      <v-container fluid id="our_container">
        <vue-particles
            id="particles-js"
            color="#39AFFD"
            :particleOpacity="0.7"
            :particlesNumber="100"
            shapeType="star"
            :particleSize="6"
            linesColor="#409EFF"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="100"
            :moveSpeed="1"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="repulse">
        </vue-particles>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Footer
  },
};
</script>

<style scoped>
#particles-js {
  width: 100%;
  height: calc(100%);
  position: absolute;
}
#our_container{
  background: #000000
}
</style>
