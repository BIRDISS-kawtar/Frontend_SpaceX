<template>
    <v-parallax src="/src/assets/images/space.jpg" height="300">
        <div class="d-flex flex-column fill-height justify-center align-center text-amber darken-1">
            <div class="text-h5 font-weight-bold">
                Within <span class="text-h1 text-white font-weight-bold">{{countdown}}</span> Seconds
            </div>
            <div class="text-h5 font-weight-bold">
                will be the Launch of 
                <span class="text-h3 font-weight-bold">{{upcoming_launch.name}}</span> 
                on 
                <span class="text-h3 font-weight-bold">{{upcoming_launch.date_utc}}</span>
            </div>
        </div>
    </v-parallax>
</template>
<script>
export default {
  name: 'UpcomingLaunch',
  data(){
    return{
      upcoming_launch : {},
      countdown : null, 
      UTCdate : null,
      formattedDate : null,
      IDsetIntervall : null,
    };
  },
  created(){
      this.fetchUpcomingLaunche();
  },
  mounted(){
      this.setCountdown();
  },
  beforeDestroy(){
      clearInterval(this.IDsetIntervall);
  },
  methods :{
      fetchUpcomingLaunche(){
        /*---------------Fetch the data from the API---------------*/
        const url = " https://api.spacexdata.com/v4/launches/next";
        fetch(url) // Using asynchronous code 
        .then(async response => {
            this.upcoming_launch = await response.json(); // This is an object of objects
            if (!response.ok) {// in case the Fetch request done correctly but the response is incorrect 
				const error = (this.upcoming_launch && this.upcoming_launch.message) || response.statusText;
				return Promise.reject(error);
			}
            /*----------------------Date formatting-------------------*/
            this.UTCdate = new Date(this.upcoming_launch.date_utc);
            this.formattedDate = this.UTCdate.toLocaleDateString();
            this.upcoming_launch.date_utc = this.formattedDate;
            
        })
        .catch(error => {
            console.error(error);
        }); 
      },
      setCountdown(){
        /*----------------------Set Realtime Countdown-------------------*/
        this.IDsetIntervall = 
        setInterval(()=>{  
                            if(this.UTCdate){
                                const UTC_currentTimeStamp = (new Date()).getTime();
                                this.countdown = parseInt((this.UTCdate.getTime() - UTC_currentTimeStamp)/1000);// Convert milliseconds to seconds
                            }
                        },1000);
      }
  }
}
</script>
<style scoped>
.scroll-left {
 height: 50px;	
 overflow: hidden;
 position: relative;
 background: yellow;
 color: orange;
 border: 1px solid orange;
}
.scroll-left p {
 position: absolute;
 width: 100%;
 height: 100%;
 margin: 0;
 line-height: 50px;
 text-align: center;
 /* /* Starting position */
 /* transform:translateX(100%); */
 /* Apply animation to this element */
 /* animation: scroll-left 15s linear infinite; */
}
/* Move it (define the animation) */
/* @keyframes scroll-left {
 0%   {
 transform: translateX(100%); 		
 }
 100% {
 transform: translateX(-100%); 
 } */ 
</style>