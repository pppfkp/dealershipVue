<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div v-if="chosenConfig" id="carouselExampleControls" class="carousel carousel-dark slide w-100" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="chosenConfig?.front_image" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img :src="chosenConfig?.back_image" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="" style="width: 100%">
      <h2 class="card-title"></h2>
    </div>


    <div class="d-flex flex-wrap justify-content-center w-100">
      <div v-for="version in cars" :key="version" class="card bg-dark text-white d-flex p-3 m-3 ratio ratio-1x1" style="max-width: 10rem;" @click="setVersion(version)">
          <h5 class="card-title">{{version.name}}</h5>
      </div>
    </div>

    <div class="d-flex flex-wrap justify-content-center w-100">
      <div v-for="config in chosenVersion.configurations" :key="config" class="card d-flex p-3 m-3 ratio ratio-1x1" style="max-width: 5rem;" @click="setConfig(config)">
          <h5 class="card-title">{{config.color.name}}</h5>
      </div>
    </div>


    <div class="w-75">
      <h5 class="card-title">Specification</h5>
    </div>


    <div class="d-flex flex-wrap justify-content-center w-100" v-if="chosenVersion">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Engine</h5>
          <p class="card-text">{{chosenVersion.engine.name}} {{chosenVersion.engine.horse_power}}KM ({{chosenVersion.engine.fuel_type.name}})</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Fuel tank</h5>
          <p class="card-text">{{chosenVersion.fuel_tank_capacity}}L</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Seats</h5>
          <p class="card-text">{{chosenVersion.number_of_seats}}</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Weight</h5>
          <p class="card-text">{{chosenVersion.car_models.base_weight}}KG</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Height</h5>
          <p class="card-text">{{chosenVersion.car_models.height}}mm</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Width</h5>
          <p class="card-text">{{chosenVersion.car_models.width}}mm</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Length</h5>
          <p class="card-text">{{chosenVersion.car_models.length}}mm</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Trunk capacity</h5>
          <p class="card-text">{{chosenVersion.car_models.trunk_capacity}}L</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Body type</h5>
          <p class="card-text">{{chosenVersion.car_models.body_type.name}}</p>
        </div>
      </div>
    </div>

    <div class="d-flex w-100 justify-content-center" v-if="chosenVersion">
      <div class="d-flex flex-column" style="text-align: left;">
        <div class="card border-dark m-1">
          <div class="card-body bg-outline-success text-success">
            <h5 class="card-title">{{chosenVersion.price}} PLN</h5>
          </div>
        </div>
        <button type="button" class="btn btn-success m-1" @click="getToCheckout">Buy</button>
      </div>
    </div>

  </div>
</template>
    
<script>
import axios from 'axios';
export default {
  data() {
    return {
      cars: '',
      chosenVersion: '',
      chosenConfig: '',
      loggedUser: ''
    }
  },
  methods: {
    getVersions() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/carVersion/byModel/"+this.$route.params.modelId,
        withCredentials: true,
        origin: "http://localhost:8080",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios.request(config)
        .then((response) => {
          console.log(response.data);
          this.cars = response.data;
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
    setVersion(version) {
      this.chosenVersion = version;
    },
    setConfig(config) {
      this.chosenConfig = config;
    },
    getToCheckout() {
      if(this.loggedUser) {
        this.$router.push({name: 'buyCar', params: { configId: this.chosenConfig.id}})
      } else {
        this.$router.push('/login');
      }
      
    },
    getUserInfo() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: this.$userDetailsEndpoint,
        withCredentials: true,
        origin: "http://localhost:8080",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios.request(config)
        .then((response) => {
          this.loggedUser = response.data;
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
  },
  mounted() {
    this.getUserInfo();
    this.getVersions();         
  }
}
</script>
    
<style></style>