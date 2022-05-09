<template>
    <!--------------Open Video Popup Button in Parent--------------->
    <v-btn color="green" @click="dialog = true">
        Youtube Video
        <v-icon>mdi-youtube</v-icon>
    </v-btn>
    <!--------------Content of the Popup--------------------->
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-content>
                <iframe id="player" type="text/html" width="1000" height="500"
                    v-bind:src="youtubeID"
                    frameborder="0">
                </iframe>
            </v-card-content>
            <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props :{ 
        youtubeID : String
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>