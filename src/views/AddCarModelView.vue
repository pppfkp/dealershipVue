<template>
  <div class="d-flex justify-content-center">
    <div class="card p-3">
      <form v-if="modelCreationData" class="was-validated" v-on:submit.prevent="submitForm">
        <h1>Create a car model</h1>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" v-model="modelCreationForm.name" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Weight (kg)</label>
          <input type="number" class="form-control" v-model="modelCreationForm.weight" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Number of doors</label>
          <input type="number" class="form-control" v-model="modelCreationForm.number_of_doors" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Trunk capacity (l)</label>
          <input type="number" class="form-control" v-model="modelCreationForm.trunk_capacity" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Length (mm)</label>
          <input type="number" class="form-control" v-model="modelCreationForm.length" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Height (mm)</label>
          <input type="number" class="form-control" v-model="modelCreationForm.height" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Width (mm)</label>
          <input type="number" class="form-control" v-model="modelCreationForm.width" required>
        </div>
        <select class="form-select mb-3" v-model="modelCreationForm.manufacturer" required>
          <option v-for="manufacturer in modelCreationData.manufacturers" :key="manufacturer" :value="manufacturer.id">
            {{ manufacturer.manufacturer_name }}</option>
        </select>

        <select class="form-select mb-3" aria-label="Default select example" v-model="modelCreationForm.body_type"
          required>
          <option v-for="bodyType in modelCreationData.body_types" :key="bodyType" :value="bodyType.id">{{ bodyType.name }}
          </option>
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
          <h5 class="modal-title" id="exampleModalLabel">New model was added</h5>
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
      modelCreationData: '',
      modelCreationForm: {
        name: '',
        weight: '',
        number_of_doors: '',
        trunk_capacity: '',
        length: '',
        height: '',
        width: '',
        manufacturer: '',
        body_type: ''
      }
    }
  },
  methods: {
    submitForm() {
      let data = JSON.stringify({
        "name": this.modelCreationForm.name,
        "base_weight": this.modelCreationForm.weight,
        "number_of_doors": this.modelCreationForm.number_of_doors,
        "trunk_capacity": this.modelCreationForm.trunk_capacity,
        "length": this.modelCreationForm.length,
        "height": this.modelCreationForm.height,
        "width": this.modelCreationForm.width,
        "manufacturer_id": this.modelCreationForm.manufacturer,
        "body_type_id": this.modelCreationForm.body_type
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: "http://localhost:8000/api/carModel",
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
            console.log(response.data);
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
        url: "http://localhost:8000/api/carModel/creationInfo",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };


      axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.data);
            this.modelCreationData = JSON.parse(response.data.data);
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