<template>
    <v-container>
        <v-row align="center">
            <v-col cols="12">
                <!------------------Select dropdown list------------------->
                <v-select
                    :items="selectOptions"
                    :menu-props="{ top: true, offsetY: true }"
                    label="Launches display type"
                    model-value="selectedOption" 
                    v-model="selectedOption"
                    @update:modelValue="fetchLaunches"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <!-----------------The 10 Launches cards------------------->
            <v-col v-for="launch in launches_final_results" :key="launch[0]" cols=6>
                <v-card elevation="6"> 
                    <v-img height="200" v-bind:src="launch[1].links.patch.small">
                    </v-img>
                    <v-card-title class="text-h5 font-weight-bold">{{launch[1].name}}</v-card-title>
                    <v-card-text class="text-h6">
                        Launched the <span class="font-weight-bold">{{launch[1].date_local}}</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-col class="text-right">
                            <v-btn rounded="pill" 
                                color="#344955"
                                variant="contained-text" 
                                @click="seeMore(launch[1].id)">SEE MORE</v-btn>
                        </v-col>
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
            if(this.launches_final_results.length > 10){// Pick only the last 10 past launches in function of the dropdown selected option
                this.launches_final_results = this.launches_final_results.slice(0,10);
            }
            for(const value of this.launches_final_results){// Formatting : UTC string date to dd/mm/yyyy format
                const UTCdate = new Date(value[1].date_local);
                const formattedDate = UTCdate.toLocaleDateString();
                value[1].date_local = formattedDate;
            }
        })
        .catch(error => {
            console.error(error);
        });
        
      },
      seeMore(id_launch){
        this.$router.push({ name: 'launchDetails', params: { id: id_launch} });
      }
  }
}
</script>
