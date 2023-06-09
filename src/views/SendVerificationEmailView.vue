<template>
<div class="d-flex justify-content-center">
    <div class="card p-3">
        <form v-on:submit.prevent="resend" class="was-validated">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.email" required>
            </div>
            <button type="submit" class="btn btn-primary">Send verification code</button>
        </form>
    </div>
</div>
          <!-- Button trigger modal -->
          <button type="button" id="modalOpenBtn2" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" style="display: none">
    Launch demo modal
  </button>
  
  <!-- Modal -->
  <div class="modal fade bg-success" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Code was sent</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p>If you've provided correct email you should get a verification code</p>
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
        return{
            form: {
                email: ""
            }
        }
    },
    methods: {
        resend(){
          let data = JSON.stringify({
            "email": this.form.email
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
              if(response.status === 200) {
                document.getElementById('modalOpenBtn2').click();
                this.$router.push({name: 'verifyEmail', params: { email: this.form.email}});
              }
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