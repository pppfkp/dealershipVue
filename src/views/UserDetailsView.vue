<template>
    <div class="card p-5" v-if="user">
        <h1>{{ user.email }}</h1>
        <h3>{{ user.name }}</h3>
        <h3>{{ user.first_name }} {{ user.last_name }}</h3>
        <h4>{{ user.city }}</h4>
        <h4>{{ user.phone }}</h4>
        <h4>{{ user.role }}</h4>
        <button type="button" v-if="!user.is_admin && loggedUser.is_admin" class="btn btn-primary m-3" @click="promoteToAdmin">Promote to
            admin</button>
        <button type="button" v-if="!user.is_admin && !user.is_customer_service && loggedUser.is_admin" class="btn btn-primary m-3"
            @click="promoteToCustomerService">Promote to customer service</button>
        <button type="button" class="btn btn-danger m-3" @click="deleteAccount">Delete account</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: [
        'userId'
    ],
    data() {
        return {
            user: '',
            loggedUser: ''
        }
    },
    methods: {
        getUser(id) {
            let data = JSON.stringify({
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/user/" + id,
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    console.log(JSON.parse(JSON.stringify(response.data.data)));
                    this.user = JSON.parse(JSON.stringify(response.data.data));
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        promoteToAdmin() {
            let data = JSON.stringify({
            });

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/user/" + this.$route.params.userId + "/promoteToAdmin",
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    console.log(response);
                    this.getUser(this.$route.params.userId);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        promoteToCustomerService() {
            let data = JSON.stringify({
            });

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/user/" + this.$route.params.userId + "/promoteToCustomerService",
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    console.log(response);
                    this.getUser(this.$route.params.userId);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        deleteAccount() {
            let data = JSON.stringify({
            });

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/user/" + this.$route.params.userId,
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    console.log(response);
                    this.getUser(this.$route.params.userId);
                    this.$router.push({ name: 'userAdmin' });
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
    },
    mounted() {
        this.getUser(this.$route.params.userId);
        this.getUserInfo();
    },
}
</script>

<style></style>