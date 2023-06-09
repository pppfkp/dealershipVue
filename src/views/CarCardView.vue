<template>
    <div class="card m-3" style="width: 18rem;"  @mouseenter="scaleUp()" @mouseleave="scaleDown()">
    <img :class="{'scaledUp':isScaledUp}" :src="image" class="card-img-top" alt="..." @click="changePhoto()">

    <div class="card-body">
    <h5 class="card-title">{{manifacturer}} {{model}}</h5>
    <p class="card-text"> <span style="font-weight: bold;">Price </span> {{price}} PLN</p>
    </div>

    <div class="card-body">
    <button type="button" class="btn btn-outline-primary" @click="() => this.$router.push({name: 'versionDetails', params: { modelId: id}})">Show versions</button>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'image1',
        'image2',
        'model',
        'price',
        'manifacturer',
        'id'
    ],
    data() {
        return {
            isScaledUp: false,
            image: this.image1       
        }
    },
    methods: {
        scaleUp() {
            this.isScaledUp = true;
        },
        scaleDown() {
            this.isScaledUp = false;
        },
        changePhoto() {
            if(this.image === this.image1) {
                this.image = this.image2;
            } else {
                this.image = this.image1;
            }
        }
    }
}
</script>

<style>
    .scaledUp {
        transform: scale(1.5);
    }
</style>