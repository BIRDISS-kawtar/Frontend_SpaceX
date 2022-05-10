<template>
    <!--------------Open Video Popup Button in Parent--------------->
    <v-btn color="amber darken-1" @click="dialog = true">
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
            <v-card-actions d-flex flex-column justify-end>
              <v-col class="text-right">
                <v-btn icon class="bg-amber darken-1" @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
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