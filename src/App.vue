<template>
  <v-app>
    <SidebarNavigation/>
    <v-main>
      <!--------------Main Title------------>
      <h1>Your place to track SpaceX launches!</h1>
      <!----------Last 10 launches---------->
      <UpcomingLaunch/>
      <RouterView/>
      <!----------Upcoming Launch----------->
    </v-main>
  </v-app>
</template>

<script>
import Launches from "./components/Launches.vue";
import UpcomingLaunch from "./components/UpcomingLaunch.vue"
import SidebarNavigation from "./components/SidebarNavigation.vue"
export default {
  name: 'App',
  components: {
    "Launches" : Launches,
    "UpcomingLaunch" : UpcomingLaunch,
    "SidebarNavigation" : SidebarNavigation,
  },
  data(){
    return{
      // TO ADD
    };
  },
}
</script>
