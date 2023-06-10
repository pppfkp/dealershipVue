<template>
  <div class="d-flex justify-content-center">
    <div class="card p-3">
      <form v-if="versionCreationData" class="was-validated" v-on:submit.prevent="submitForm">
        <h1>Create a car version</h1>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" v-model="versionCreationForm.name" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Price (PLN)</label>
          <input type="number" class="form-control" v-model="versionCreationForm.price" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Fuel tank capacity (l)</label>
          <input type="number" class="form-control" v-model="versionCreationForm.fuel_tank_capacity" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Number of seats</label>
          <input type="number" class="form-control" v-model="versionCreationForm.number_of_seats" required>
        </div>

        <select class="form-select mb-3" v-model="versionCreationForm.engine" required>
          <option v-for="engine in versionCreationData.engines" :key="engine" :value="engine.id">{{ engine.name }}
            {{ engine.horse_power }}KM {{ engine.fuel_type.name }}</option>
        </select>


        <select class="form-select mb-3" v-model="versionCreationForm.model" required>
          <option v-for="model in versionCreationData.models" :key="model" :value="model.id">{{ model.model_year }}
            {{ model.manufacturer.manufacturer_name }} {{ model.name }} ({{ model.body_type.name }})</option>
        </select>
        <button type="submit" class="btn btn-primary m-1">Submit</button>
      </form>
    </div>

  </div>

            
  <!-- Button trigger modal -->
  <button type="button" id="modalOpenBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="display: none;">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal bg-success fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New version was added</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p></p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      versionCreationData: '',
      versionCreationForm: {
        name: '',
        price: '',
        fuel_tank_capacity: '',
        number_of_seats: '',
        engine: '',
        model: ''
      }
    }
  },
  methods: {
    submitForm() {
      let data = JSON.stringify({
        "name": this.versionCreationForm.name,
        "price": this.versionCreationForm.price,
        "fuel_tank_capacity": this.versionCreationForm.fuel_tank_capacity,
        "number_of_seats": this.versionCreationForm.number_of_seats,
        "engine_id": this.versionCreationForm.engine,
        "model_id": this.versionCreationForm.model
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: "http://localhost:8000/api/carVersion",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        data: data
      };


      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response));
          if (response.status === 200) {
            document.getElementById('modalOpenBtn').click();
            this.$router.push('/carModels');
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getModelCreationData() {
      let data = JSON.stringify({
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: "http://localhost:8000/api/carVersion/creationInfo",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };


      axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.data);
            this.versionCreationData = JSON.parse(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted() {
    this.getModelCreationData();
  }
}
</script>
  
<style></style>