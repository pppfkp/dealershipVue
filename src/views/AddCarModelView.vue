<template>
  <div class="d-flex justify-content-center">
    <div class="card p-3">
      <form v-if="modelCreationData" class="was-validated" v-on:submit.prevent="verify">
        <h1>Create a car model</h1>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Weight (kg)</label>
          <input type="number" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Number of doors</label>
          <input type="number" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Trunk capacity (l)</label>
          <input type="number" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Length (mm)</label>
          <input type="number" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Height (mm)</label>
          <input type="number" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Width (mm)</label>
          <input type="number" class="form-control" required>
        </div>
        <select class="form-select mb-3" required>
          <option v-for="manufacturer in modelCreationData.manufacturers" :key="manufacturer" :value="manufacturer.id">{{manufacturer.manufacturer_name}}</option>
        </select>

        <select class="form-select mb-3" aria-label="Default select example" required>
          <option v-for="bodyType in modelCreationData.body_types" :key="bodyType" :value="bodyType.id">{{bodyType.name}}</option>
        </select>

        <button type="submit" class="btn btn-primary m-1">Submit</button>
      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      modelCreationData: ''
    }
  },
  methods: {
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