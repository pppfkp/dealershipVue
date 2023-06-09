<template>
    <div class="card p-5"> 
      <form action="" class="was-validated" v-on:submit.prevent="submitForm">
        <h1>Sign Up</h1>
  
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" aria-describedby="emailHelp" required v-model="registerForm.email">
          <div class="form-text">{{}}</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">First name</label>
          <input type="text" class="form-control" required v-model="registerForm.first_name">
          <div class="form-text"></div>
        </div>

        <div class="mb-3">
          <label class="form-label">Last name</label>
          <input type="text" class="form-control" required v-model="registerForm.last_name">
          <div class="form-text"></div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">City</label>
          <input type="text" class="form-control" required v-model="registerForm.city">
          <div class="form-text"></div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Phone number</label>
          <input type="text" class="form-control" required v-model="registerForm.phone_number" pattern="[1-9][0-9]{8}">
          <div class="form-text"></div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" required v-model="registerForm.username">
          <div class="form-text"></div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" required v-model="registerForm.password">
          <div class="form-text"></div>
        </div>
  
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
  
      <!-- Button trigger modal -->
  <button type="button" id="modalOpenBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="display:none">
    Launch demo modal
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sign Up failed</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p v-for="error in errors" :key="error">
              {{error[0]}}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
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
            password: "",
            first_name: "",
            last_name: "",
            city: "",
            phone_number: ""
          },
          errors: []
        }
      },
      methods: {
        changeToVerify() {
          this.$router.push({name: 'verifyEmail', params: { email: "email"}});
        },
        submitForm(){
          let data = JSON.stringify({
            "email": this.registerForm.email,
            "password": this.registerForm.password,
            "name": this.registerForm.username,
            "first_name": this.registerForm.first_name,
            "last_name": this.registerForm.last_name,
            "city": this.registerForm.city,
            "phone_number": this.registerForm.phone_number
          });
  
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            withCredentials: true,
            url: this.$registerEndpoint,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
  
  
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response));
              if(response.status === 200) {
                let userEmail = response.data.email;
                this.sendVerificationEmail(userEmail);
              }
            })
            .catch((error) => {
              console.log(error);
              this.errors = [];
              this.errors = error.response.data.errors;
              document.getElementById('modalOpenBtn').click();
            })
        },
  
        sendVerificationEmail(email) {
          let data = JSON.stringify({
            "email": email
          });
  
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            withCredentials: true,
            url: this.$sendVerificationEmailEndpoint,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            data : data
          };
  
          axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response));
            this.$router.push({name: 'verifyEmail', params: { email: this.registerForm.email}});
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