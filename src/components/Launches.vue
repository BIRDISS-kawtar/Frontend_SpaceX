<template>
    <!------------------Select dropdown list------------------->
    <select v-model="selectedOption" @change="fetchLaunches">
        <option v-for="option in selectOptions" :key=option>{{option}}</option>
    </select>
    <!-----------------The 10 Launches cards------------------->
    <v-container v-for="launch in launches_final_results" :key="launch[0]">
        <v-row >
            <v-col>
                 <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px" v-bind:src="launch[1].links.patch.small">
                        <v-card-title>{{launch[1].name}}</v-card-title>
                    </v-img>
                    <v-card-text class="text--primary">
                        <h3>Launched The</h3>
                        {{launch[1].date_local}}
                    </v-card-text>
                    <v-card-actions>
                        <RouterLink :to="{ name: 'launchDetails', params: { id: launch[1].id} }">SEE MORE</RouterLink>
                        <!-- <v-btn color="blue" to="{ name: 'launchDetails', params: { id: launch[1].id } }">See More</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Launches',
  data(){
    return{
      launches_initial_results : {},
      launches_final_results : [],
      selectedOption : "All launches",
      selectOptions : ["All launches","Failed launches","Successful launches"],
    };
  },
  created(){
      this.fetchLaunches();
  },
  methods :{
      fetchLaunches(){
        /*---------------Fetch the data from the API---------------*/
        const url = " https://api.spacexdata.com/v4/launches/past";
        fetch(url) // Using asynchronous code 
        .then(async response => {
            this.launches_initial_results = await response.json(); // This is an object of objects
            if (!response.ok) {// in case the Fetch request done correctly but the response is incorrect 
				const error = (this.launches_initial_results && this.launches_initial_results.message) || response.statusText;
				return Promise.reject(error);
			}
            /*---------------Set the value of launches_results list in function of the currentOption-------------*/ 
            switch (this.selectedOption) { 
                case 'Failed launches':
                    this.launches_final_results = [];
                    for(const launch of Object.entries(this.launches_initial_results)){ 
                        if(!launch[1].success){
                            console.log("LAUNCH Failed ",launch[1].success);
                            this.launches_final_results.push(launch);
                        }
                    }
                    break;
                case 'Successful launches':
                    this.launches_final_results = [];
                    for(const launch of Object.entries(this.launches_initial_results)){ 
                        if(launch[1].success){
                            console.log("LAUNCH Successful ",launch[1].success);
                            this.launches_final_results.push(launch);
                        }
                    }
                    break;
                default: // Default case : all launches 
                    this.launches_final_results = [];
                    this.launches_final_results = Object.entries(this.launches_initial_results);
                    break;
            }
            /*-------------------Date formatting and Sorting--------------------*/
            this.launches_final_results.reverse((date1,date2) => Date(date1.date_local)-Date(date2.date_local));// Descending sort
            console.log("Before ",this.launches_final_results.length);
            if(this.launches_final_results.length > 10){// Pick only the last 10 past launches in function of the dropdown selected option
                this.launches_final_results = this.launches_final_results.slice(0,10);
            }
            console.log("After ",this.launches_final_results.length);
            for(const value of this.launches_final_results){// Formatting : UTC string date to dd/mm/yyyy format
                console.log("Final ",value);
                const UTCdate = new Date(value[1].date_local);
                const formattedDate = UTCdate.toLocaleDateString();
                value[1].date_local = formattedDate;
                console.log(value[1].date_local); 
            }
        })
        .catch(error => {
            console.error(error);
        });
        
      }
  }
}
</script>
