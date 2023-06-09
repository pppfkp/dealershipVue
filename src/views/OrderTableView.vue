<template>
    <div class="container w-100">
        <table class="table table-dark table-striped table-hover w-100" v-if="orders">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Status</th>
                    <th scope="col">Model</th>
                    <th scope="col">User</th>
                    <th scope="col">VIN</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order" @click="changeToDetailsView(order.id)">
                    <th style="font-size: small; word-break: break-all;" scope="row">{{ order.id }}</th>
                    <td>{{ order.order_status.name }}</td>
                    <td>{{ order.configuration.version.car_models.manufacturer.manufacturer_name }}
                        {{ order.configuration.version.car_models.name }}</td>
                    <td>{{ order.user_id }}</td>
                    <td style="font-size: small;  word-break: break-all;">{{ order.vin_number }}</td>
                </tr>
            </tbody>
        </table>
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