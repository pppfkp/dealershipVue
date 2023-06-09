<template>
  <nav class="navbar bg-body-tertiary sticky-top bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">BBBauto</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="">Menu</span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link v-if="!loggedUser" to="/register">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!loggedUser" to="/login">Sign In</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedUser" to="/logout">Logout</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedUser?.is_admin || loggedUser?.is_customer_service"
              to="/userAdmin">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedUser?.is_admin"
              to="/addCarModel">Add car model</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedUser?.is_admin"
              to="/addCarVersion">Add car version</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedUser?.is_admin"
              to="/addCarConfiguration">Add car configuration</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedUser?.is_admin || loggedUser?.is_customer_service"
              to="/orderTable">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!loggedUser?.is_admin && !loggedUser?.is_customer_service"
              to="/orderCard">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/carModels">Cars</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="d-flex justify-content-center">
    <router-view @login="(userData) => {
      loggedUser = userData;
      console.log(userData);
    }" @logout="() => loggedUser = null" />


    <!-- ------------------------------------------------------- -->

    <!-- ------------------------------------------------------- -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loggedUser: null
    }
  },
  methods: {
    testEndpoint1() {
      let data = JSON.stringify({

      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/user',
        withCredentials: true,
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
        })
        .catch((error) => {
          console.log(error);
        });
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
    this.getUserInfo();
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
