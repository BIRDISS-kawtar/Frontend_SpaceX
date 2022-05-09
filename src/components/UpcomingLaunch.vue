<template>
    <v-banner class="scroll-left">
        <p>In the Upcoming {{countdown}} seconds, the Launch of {{upcoming_launch.name}} exactly on {{upcoming_launch.date_utc}}</p>
    </v-banner>
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
            /* console.log(this.upcoming_launch.date_utc);
            console.log(UTCdate.getTime() - UTC_currentTimeStamp);
            console.log(UTCdate," and today is ",UTC_currentTimeStamp);
            console.log("the difference is",this.countdown);
            console.log(UTCdate.getTime(),"offset",UTCdate.getTimezoneOffset()); */
            //console.log("UTC date is (Created):",this.UTCdate,"formatted : ",this.formattedDate);
            
        })
        .catch(error => {
            console.error(error);
        }); 
      },
      setCountdown(){
        /*----------------------Set Realtime Countdown-------------------*/
        this.IDsetIntervall = 
        setInterval(()=>{   //console.log("UTC date is (Mounted):",this.UTCdate,"formatted : ",this.formattedDate);
                            if(this.UTCdate){
                                const UTC_currentTimeStamp = (new Date()).getTime();
                                this.countdown = (this.UTCdate.getTime() - UTC_currentTimeStamp)/1000;// Convert milliseconds to seconds
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