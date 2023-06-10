<template>
    <!-- Credit card form -->
        <div class="row">
            <div class="col-md-8 mb-4">
                <div class="card mb-4">
                    <div class="card-header py-3">
                        <h5 class="mb-0">Biling details</h5>
                    </div>
                    <div class="card-body">
                        <form class="" v-on:submit.prevent="submitForm">
                            <h5 class="mb-4">Payment</h5>


                            <div class="row mb-4">
                                <div class="col">
                                    <div class="form-outline">
                                        <input type="text" id="formNameOnCard" class="form-control" required/>
                                        <label class="form-label" for="formNameOnCard">Name on card</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-outline">
                                        <input type="text" id="formCardNumber" class="form-control" required/>
                                        <label class="form-label" for="formCardNumber">Credit card number</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col-3">
                                    <div class="form-outline">
                                        <input type="text" id="formExpiration" class="form-control" required/>
                                        <label class="form-label" for="formExpiration">Expiration</label>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-outline">
                                        <input type="text" id="formCVV" class="form-control" required/>
                                        <label class="form-label" for="formCVV">CVV</label>
                                    </div>
                                </div>
                            </div>

                            <select class="form-select mb-3" required v-model="buyForm.dealership_id">
                                <option v-for="dealership in dealerships" :key="dealership" :value="dealership.id">{{
                                    dealership.name }} {{ dealership.city }}</option>
                            </select>

                            <button class="btn btn-primary btn-lg btn-block" type="submit">
                                Pay
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card mb-4">
                    <div class="card-header py-3">
                        <h5 class="mb-0">Summary</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li
                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                    <strong>Total amount</strong>
                                </div>
                                <span v-if="config"><strong>{{ config.version.price }} PLN</strong></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
        
  <!-- Button trigger modal -->
  <button type="button" id="modalOpenBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="display: none;">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal bg-success fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Payment completed</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-100">
            <p></p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    <!-- Credit card form -->
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            dealerships: '',
            config: '',
            buyForm: {
                dealership_id: '',
            }
        }
    },
    methods: {
        submitForm() {
            let data = JSON.stringify({
                "dealership_id": this.buyForm.dealership_id,
                "configuration_id":  this.$route.params.configId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                withCredentials: true,
                url: "http://localhost:8000/api/order",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response));
                    if (response.status === 200) {
                        console.log(response.data);
                        document.getElementById('modalOpenBtn').click();
                        this.$router.push('/orderCard');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        getConfigDetails() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: "http://localhost:8000/api/carConfiguration/" + this.$route.params.configId,
                withCredentials: true,
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            axios.request(config)
                .then((response) => {
                    console.log(response.data);
                    this.config = response.data;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
        },
        getDealerships() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: "http://localhost:8000/api/dealership",
                withCredentials: true,
                origin: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            axios.request(config)
                .then((response) => {
                    this.dealerships = response.data;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
        },
    },
    mounted() {
        this.getDealerships();
        this.getConfigDetails();
    }
}
</script>

<style></style>