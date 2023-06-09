<template>
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary" @click="submitForm">Sign out</button>
    </div>

    <button type="button" id="modalOpenBtn2" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" style="display: none">
    Launch demo modal
  </button>
  
  <!-- Modal -->
  <div class="modal fade bg-success" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Logged out</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p>Logged out successfuly</p>
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
      logout: null
    },
    methods: {
      submitForm(){
        let data = JSON.stringify({
      });
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: this.$logoutEndpoint,
        withCredentials: true,
        origin: "http://localhost:8080",
        headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data : data
      };
  
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        document.getElementById('modalOpenBtn2').click();
        this.$emit('logout');
        this.$router.push({name: 'login'});
      })
      .catch((error) => {
        console.log(error);
      });
  
    }
  }
  }
  </script>
  
  <style>
  
  </style>