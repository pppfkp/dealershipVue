<template>
    <div class="d-flex justify-content-around flex-wrap">
        <CarCard v-for="car in activeModels" :key="car" :image1="car.versions[0].configurations[0].front_image" :image2="car.versions[0].configurations[0].back_image" :model="car.name" :manufacturer="car.manufacturer.manufacturer_name" :price="calculateStartingPrice(car)" :id="car.id"></CarCard>
    </div>
</template>
  
<script>
import CarCard from '../views/CarCardView.vue'
import axios from 'axios';
export default {
    components: {
        CarCard
    },
    data() {
        return {
            cars: []
        }
    },
    methods: {
        getModels() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: "http://localhost:8000/api/carModel",
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
                    this.cars = response.data;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
        },
        calculateStartingPrice(car) {
            let min = 9_999_999;
            car.versions.forEach(version => {
                if (version.price < min) {
                    min = version.price;
                }
            });
            return min;
        }
    },
    mounted() {
        this.getModels();
    },
    computed: {
        activeModels: function() {
            return this.cars.filter(function(car) {
                return car.versions.length !== 0 && car.versions[0].configurations.length !== 0; 
            })}
        }
    }
</script>
  
<style scoped>
div {
    width: 70%;
}
</style>