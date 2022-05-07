<template>
    <h1>Launch Details Component {{launch_details}}</h1>
</template>

<script>
export default{
    name:'Launch',
    data(){
        return{
            launch_details : {},
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
            })
            .catch(error => {
                console.error(error);
            });
        }
    },
}
</script>