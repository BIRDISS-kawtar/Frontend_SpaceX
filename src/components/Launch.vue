<template>
    <v-container>
        <v-row>
            <v-col>
                <!-------------Name,Date and image------------------>
                <v-card>  
                    <v-img v-bind:src="image_link">
                        <v-card-title>{{launch_details.name}}</v-card-title>
                    </v-img>
                    <v-card-text class="text--primary">
                        <h3>Launched The</h3>
                        {{launch_details.date_local}}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <!-----------------Description------------------>
                <v-sheet color="grey">
                    <h2>Description</h2>
                    <p v-if="launch_details.details">{{launch_details.details}}</p>
                    <p v-else> No description available for this launch!</p>
                </v-sheet>
                <v-divider></v-divider>
                <!-----------------Links------------------>
                <v-sheet color="grey">
                    <h2>Some Links</h2>
                    <v-btn color="green" @click="goToArticle(article_link)">
                        Article
                        <v-icon>mdi-text-box</v-icon>
                    </v-btn>
                    <VideoPopup :youtubeID="`https://www.youtube.com/embed/${youtube_id}?enablejsapi=1`" />
                </v-sheet>
                <v-divider></v-divider>
                <!-----------------Payloads------------------>
                <v-sheet color="grey">
                    <h2>Payloads</h2>
                    <li v-for="payload in payloads_details" :key="payload">
                        {{payload[0]}}
                    </li>
                </v-sheet>
                <v-divider></v-divider>
                <!-----------------Customers------------------>
                <v-sheet color="grey">
                    <h2>Customers</h2>
                    <template v-for="payload in payloads_details" :key="payload">
                        <li v-for="customer in payload[1]" :key="customer">
                            {{customer}}
                        </li>
                    </template>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
    <!-------------Description------------------>
</template>

<script>
import VideoPopup from "../components/VideoPopup.vue"
export default{
    name:'Launch',
    components:{
        "VideoPopup" : VideoPopup,
    },
    data(){
        return{
            launch_details : {},
            payloads_id : {},
            payloads_details : [],
            image_link : {},
            youtube_id : null,
            article_link :null,
        };
    },
    created(){
        this.fetchLaunch(this.$route.params.id);
    },
    methods :{
        fetchLaunch(idLaunch){
            /*---------------Fetch the data from the API---------------*/
            const url = `https://api.spacexdata.com/v4/launches/${idLaunch}`;
            fetch(url) // Using asynchronous code 
            .then(async response => {
                this.launch_details = await response.json(); // This is an object of objects
                if (!response.ok) {// in case the Fetch request done correctly but the response is incorrect 
                    const error = (this.launch_details && this.launch_details.message) || response.statusText;
                    return Promise.reject(error);
                }
                /*-------------------Date formatting--------------------*/
                const UTCdate = new Date(this.launch_details.date_local);
                const formattedDate = UTCdate.toLocaleDateString();
                this.launch_details.date_local = formattedDate;
                /*-------------------Needed Informations-----------------------*/
                this.image_link = this.launch_details.links.patch.small;
                this.youtube_id = this.launch_details.links.youtube_id;
                this.article_link = this.launch_details.links.article;
                this.payloads_id = this.launch_details.payloads;
                console.log(typeof this.payloads_id);
                this.fetchPayloads(this.payloads_id);
            })
            .catch(error => {
                console.error(error);
            });
        },
        goToArticle(link){
            window.open(link);// Redirect to an external link using vanilla js in a new tab
        },
        fetchPayloads(paylaods){
            for(const payload of Object.values(paylaods)){
                console.log("paylaod id = ",payload);
                /*---------------Fetch the data from the API---------------*/
                const url = `https://api.spacexdata.com/v4/payloads/${payload}`;
                fetch(url) // Using asynchronous code 
                .then(async response => {
                    const result = await response.json(); // This is an object of objects
                    if (!response.ok) {// in case the Fetch request done correctly but the response is incorrect 
                        const error = (result && result) || response.statusText;
                        return Promise.reject(error);
                    }
                    this.payloads_details.push([result.name,result.customers]);
                })
                .catch(error => {
                    console.error(error);
                });
            } 
        }
    },
}
</script>