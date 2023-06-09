<template>
  <table class="table table-dark table-hover" v-if="users">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Role</th>
      <th scope="col">Nick</th>
      <th scope="col">Email</th>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in this.users" :key="user" @click="goToDetails(user.id)">
      <th scope="row">{{user.id}}</th>
      <td>{{getRole(user.is_admin, user.is_customer_service)}}</td>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
      <td>{{user.first_name}}</td>
      <td>{{user.last_name}}</td>
      <td>{{user.city}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            users: ''
        }
    },
    methods: {
        resend() {
            let data = JSON.stringify({
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/user",
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
                    this.users = (JSON.parse(JSON.stringify(response.data.data)));
                    console.log(this.users);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getRole(is_admin, is_customer_service) {
            if(is_admin) {
                return "admin";
            }
            if (is_customer_service) {
                return "customer service";
            }
            return "user";
        },
        goToDetails(id) {
            this.$router.push({name: 'userDetails', params: { userId: id}});
        }
    },
    mounted() {
        this.resend();
    }
}
</script>

<style>

</style>