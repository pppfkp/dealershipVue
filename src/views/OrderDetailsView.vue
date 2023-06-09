<template>
    <div v-if="order" class="card mb-3">
        <h2 class="card-title mt-3">{{ order.configuration.version.car_models.manufacturer.manufacturer_name }} {{
            order.configuration.version.car_models.name }}</h2>
        <img :src="order.configuration.front_image" class="card-img-top" alt="...">
        <div class="card-body">

            <h2>Info</h2>

            <table class="table" style="text-align: right;">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <td class="w-100">{{ order.id }}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{{ order.order_status.name }}</td>
                    </tr>
                    <tr>
                        <th>Miejsce odbioru</th>
                        <td>{{ order.dealership.name }} {{ order.dealership.city }}</td>
                    </tr>
                    <tr>
                        <th>VIN</th>
                        <td>{{ order.vin_number }}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Configuration</h2>

            <table class="table" style="text-align: right;">
                <tbody>
                    <tr>
                        <th>Marka</th>
                        <td class="w-100">{{ order.configuration.version.car_models.manufacturer.manufacturer_name }}</td>
                    </tr>
                    <tr>
                        <th>Model</th>
                        <td>{{
                            order.configuration.version.car_models.name }}</td>
                    </tr>
                    <tr>
                        <th>Version</th>
                        <td>{{
                            order.configuration.version.name }}</td>
                    </tr>
                    <tr>
                        <th>Engine</th>
                        <td>{{ order.configuration.version.engine.name }} {{ order.configuration.version.engine.horse_power
                        }}
                            KM</td>
                    </tr>
                    <tr>
                        <th>Fuel</th>
                        <td>{{ order.configuration.version.engine.fuel_type.name }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-content-evenly" v-if="!loggedUser?.is_admin">
                <button type="button" class="btn btn-outline-success m-1" @click="requestHelp">Ask for help</button>
            </div>

            <div class="d-flex justify-content-center flex-wrap" v-if="loggedUser?.is_admin || loggedUser?.is_customer_service">
                <h4 class="w-100">Change status</h4>

                <form v-on:submit.prevent="">
                    <select class="form-select mb-3" required>
                        <option v-for="status in orderStatuses" :key="status" :value="status.id">
                            {{ status.name }}
                        </option>
                    </select>
                    <button class="btn btn-primary mb-3">Change status</button>
                </form>

                <div class="card p-5" v-if="order.user">
                    <h3>{{ order.user.email }}</h3>
                    <h3>{{ order.user.name }}</h3>
                    <h4>{{ order.user.first_name }} {{ order.user.last_name }}</h4>
                    <h4>{{ order.user.city }}</h4>
                    <h4>{{ order.user.phone_number }}</h4>
                </div>
            </div>

        </div>
    </div>

    <!-- Button trigger modal -->
    <button type="button" id="helpBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
        style="display: none;">
        Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Verification failed</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="w-100">
                        <p>We will contact you soon!</p>
                        <p>Our consultant will call or email you.</p>
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
            order: '',
            loggedUser: '',
            orderStatuses: '',
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
                url: "http://localhost:8000/api/order/" + this.$route.params.orderId,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        this.order = response.data;

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getOrderStatuses() {
            let data = JSON.stringify({
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/orderStatus",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        this.orderStatuses = response.data;

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getUserInfo() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: "http://localhost:8000/api/auth/user",
                withCredentials: true,
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            axios.request(config)
                .then((response) => {
                    console.log(response);
                    this.loggedUser = response.data;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
        },
        requestHelp() {
            let data = JSON.stringify({
                id: this.$route.params.orderId
            });

            console.log(data);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/order/help/request",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        document.getElementById('helpBtn').click();

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.getOrders();
        this.getOrderStatuses();
        this.getUserInfo();
    }
}
</script>
  
<style></style>