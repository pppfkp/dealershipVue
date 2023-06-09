<template>
  <div class="d-flex justify-content-center">
    <div class="card p-3">
      <form v-on:submit.prevent="submitForm" class="was-validated">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            v-model="loginForm.email" required>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="loginForm.password" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <br>
        <a class="w-100" @click="verifyEmail">Send verivication code</a>
        <br>
        <a class="w-100" @click="resetPassword">Reset password</a>
      </form>
    </div>

  </div>


  <!-- Button trigger modal -->
  <button type="button" id="modalOpenBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
    style="display: none">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal bg-danger fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sign In failed</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p>Invalid login or password</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Button trigger modal -->
  <button type="button" id="modalOpenBtn2" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2"
    style="display: none">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade bg-success" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sign in succesfull</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p>Logged in succesfully</p>
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
import axios from 'axios'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    }
  },
  emits: {
    login: null
  },
  methods: {
    submitForm() {
      let data = JSON.stringify({
        "email": this.loginForm.email,
        "password": this.loginForm.password,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: this.$loginEndpoint,
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
          console.log(JSON.stringify(response.data));
          console.log("Success");
          document.getElementById('modalOpenBtn2').click();
          let userInfo = this.getUserInfo();
          if (userInfo) {
            this.$router.push('/verificated');
          }
        })
        .catch((error) => {
          console.log(error);
          document.getElementById('modalOpenBtn').click();
        });

    },
    verifyEmail() {
      this.$router.push('/sendVerificationEmail');
    },
    resetPassword() {
      this.$router.push('/sendPasswordResetEmail');
    },
    getUserInfo() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: this.$userDetailsEndpoint,
        withCredentials: true,
        origin: "http://localhost:8080",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios.request(config)
        .then((response) => {
          this.$emit('login', response.data);
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
  }
}
</script>
  
<style></style>