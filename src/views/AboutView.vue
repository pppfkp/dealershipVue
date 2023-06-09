<template>
  <div class="d-flex justify-content-center flex-wrap">
    <div class="card p-3">
      <form v-on:submit.prevent="submitForm">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="registerForm.email">
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Username</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="registerForm.username">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="registerForm.password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>

    <div class="w-100">
      <p v-for="error in errors" :key="error">
        {{error}}
      </p>
    </div>
  </div>

</template>

<script>
    import axios from 'axios'
export default {
  data() {
    return {
      registerForm: {
        email: "",
        username: "",
        password: ""
      },
      errors:[],
      email: ""
    }
  },
  methods: {
    submitForm(){

      let data = JSON.stringify({
        "email": this.registerForm.email,
        "password": this.registerForm.password,
        "name": this.registerForm.username
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      withCredentials: true,
      url: 'http://localhost:8000/api/register',
      headers: { 
      'Content-Type': 'application/json'
    },
    data : data
    };

    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response));
      if(response.status === 200) {
        this.sendVerificationEmail(response.data.email);
      }
    })
    .catch((error) => {
      this.errors = [];
      console.log(error.response.data);
      this.errors = error.response.data.errors;
      // registerResponse = error.response.status;
    })

    // console.log(registerResponse);
    // if (registerResponse.status === 200) {
    //   // sendVerificationEmail(response.data.);
    // }
  },
  sendVerificationEmail(email) {
    let data = JSON.stringify({
        "email": email
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      withCredentials: true,
      url: 'http://localhost:8000/api/sendVerificationEmail',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
}
</script>

<style>

</style>