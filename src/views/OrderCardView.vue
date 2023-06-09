<template>
  <div class="d-flex justify-content-center flex-wrap">
    <div v-for="order in orders" :key="order" class="card bg-info text-white m-3" style="width: 18rem;">
      <img :src="order.configuration.front_image" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ order.configuration.version.car_models.manufacturer.manufacturer_name }} {{
          order.configuration.version.car_models.name }}</h5>
        <p class="card-text">{{ order.order_status.name }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Id: {{ order.id }}</li>
        <li class="list-group-item">{{ order.configuration.version.price }} PLN</li>
        <li class="list-group-item">VIN: {{ order.vin_number }}</li>
        <li class="list-group-item"><button class="btn btn-info text-white" @click="changeToDetailsView(order.id)">Details</button></li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      orders: ''
    }
  },
  methods: {
    getOrders() {
      let data = JSON.stringify({
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: "http://localhost:8000/api/order",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };


      axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            this.orders = response.data;

          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    changeToDetailsView(id) {
      this.$router.push({name: 'orderDetails', params: { orderId: id}});
    }
  },
  mounted() {
    this.getOrders();
  }
}
</script>
  
<style></style>