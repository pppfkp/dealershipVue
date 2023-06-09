<template>
  <div class="d-flex justify-content-center">
    <div class="card p-3">
      <form v-if="configurationCreationData" class="was-validated" v-on:submit.prevent="verify">
        <h1>Create a car configuration</h1>

        <div class="mb-3">
          <label for="formFile" class="form-label">Photo front</label>
          <input class="form-control" type="file" id="formFile">
        </div>

        <div class="mb-3">
          <label for="formFile" class="form-label">Photo back</label>
          <input class="form-control" type="file" id="formFile">
        </div>

        <label class="form-label">Version</label>
        <select class="form-select mb-3" required>
          <option v-for="version in configurationCreationData.versions" :key="version" :value="version.id">
            {{ version.car_models.model_year }} {{ version.car_models.manufacturer.manufacturer_name }}
            {{ version.car_models.name }} {{ version.name }} {{ version.engine.name }} {{ version.engine.horse_power }} KM
            ({{ version.car_models.body_type.name }})
          </option>
        </select>

        <label class="form-label">Color</label>
        <select class="form-select mb-3" required>
          <option v-for="color in configurationCreationData.colors" :key="color" :value="color.id">{{ color.name }}</option>
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
      configurationCreationData: ''
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
        url: "http://localhost:8000/api/carConfiguration/creationInfo",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };


      axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.data);
            this.configurationCreationData = JSON.parse(response.data.data);
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