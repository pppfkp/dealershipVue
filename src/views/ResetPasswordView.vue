<template>
    <div class="d-flex justify-content-center">
        <div class="card p-3">
            <form v-on:submit.prevent="resetPassword" class="was-validated">
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">New password</label>
                    <input type="password" class="form-control" v-model="setPasswordForm.newPassword" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Confirm new password</label>
                    <input type="password" class="form-control" v-model="setPasswordForm.confirmNewPassword" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

    <!-- Button trigger succes modal -->
    <button type="button" id="successModalOpenBtn" class="btn btn-primary" data-toggle="modal"
        data-target="#successModal" style="display: none;">Success</button>

    <!-- success Modal -->
    <div class="modal fade bg-success" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Password was succesfully reset</h5>
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
</template>



<script>
import axios from 'axios'
export default {
    data() {
        return {
            setPasswordForm: {
                newPassword: "",
                confirmNewPassword: ""
            }
        }
    },
    methods: {
        resetPassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                //call fail modal and return
                console.log(`passwords doesnt match`);
            }

            let data = JSON.stringify({
                "password": this.setPasswordForm.newPassword,
                "confirmPassword": this.setPasswordForm.confirmNewPassword,
                "email": this.$route.query.email,
                "token": this.$route.query.token
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: this.$resetPasswordEndpoint,
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
                    this.openSuccessModal();
                    // console.log(JSON.stringify(response.data));
                    // console.log("Success");
                    // document.getElementById('modalOpenBtn2').click();
                    // let userInfo = this.getUserInfo();
                    // if (userInfo) {
                    //     this.$router.push('/verificated');
                    // }
                })
                .catch((error) => {
                    console.log(error);
                    // document.getElementById('modalOpenBtn').click();
                });
        },
        openSuccessModal() {
            document.getElementById('successModalOpenBtn').click();
        },
        openFailModal() {
            document.getElementById('modalOpenBtn2').click();
        }


    },

}
</script>

<style></style>