<template>
  <v-app>
    <SidebarNavigation/>
    <v-app-bar>
      <!--------------Main Title------------>
      <v-app-bar-title>SpaceX Launches Tracker</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <!----------Upcoming Launch----------->
      <UpcomingLaunch/>
      <!----------Last 10 launches---------->
      <RouterView/>
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
