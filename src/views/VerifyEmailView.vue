<template>
  <div class="d-flex justify-content-center align-items-center flex-wrap">
    <!-- <div class="card p-3 w-100">
      <button type="button" class="btn btn-primary" @click="submitForm">Get user info</button>
    </div> -->
    <div class="d-flex justify-content-center">
      <div class="card p-3">
        <form class="was-validated" v-on:submit.prevent="verify">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Verification code</label>
            <input type="text" class="form-control" required v-model="verificationForm.code">
          </div>
          <button type="submit" class="btn btn-primary m-1">Submit</button>
          <br>
          <a class="w-100" @click="resend">Resend verivication code</a>
        </form>
      </div>
  
    </div>
  </div>

  
          <!-- Button trigger modal -->
          <button type="button" id="modalOpenBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"  style="display: none">
    Launch demo modal
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <p>Invalid verification code</p>
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
      userInfo: "",
      email: "",
      verificationForm: {
        code: ""
      }
    }
  },
  mounted() {
   this.email = this.$route.params.email;
  },
  methods: {
    submitForm(){
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
            console.log(JSON.stringify(response.data));
            this.userInfo = JSON.stringify(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    verify(){
          let data = JSON.stringify({
            "email": this.email,
            "verificationCode": this.verificationForm.code
          });
  
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            withCredentials: true,
            url: this.$verifyEmailEndpoint,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
  
  
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response));
              if(response.status === 200) {
                this.userInfo = "Success"
                this.$router.push('/verificated');
              }
            })
            .catch((error) => {
              console.log(error);
              document.getElementById('modalOpenBtn').click();
            })
        },
        resend(){
          let data = JSON.stringify({
            "email": this.email
          });
  
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            withCredentials: true,
            url: this.$sendVerificationEmailEndpoint,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
  
  
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response));
              if(response.status === 200) {
                this.userInfo = "Resent"
              }
            })
            .catch((error) => {
              console.log(error);
            })
        },
  
}
}
</script>

<style>

</style>