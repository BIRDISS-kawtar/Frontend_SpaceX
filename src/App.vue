<template>
  <v-app>
    <v-main>
      <!--------------Main Title------------>
      <h1>Your place to track SpaceX launches!</h1>
      <!----------Last 10 launches---------->
      <Launches/>
      <!----------Upcoming Launch----------->
    </v-main>
  </v-app>
</template>

<script>
import Launches from "./components/Launches.vue";
export default {
  name: 'App',
  components: {
    "Launches" : Launches,
  },
  data(){
    return{
      // TO ADD
    };
  },
}
</script>
