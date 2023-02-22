<template>
  <div class="py-4 container-fluid">
    <loader :active="loaderActive" message="Please wait 5 seconds" />
    <div v-if="display_table" class="mt-4 row">
      <div class="col-12">
        <bookings-table :booking="bookings"/>
      </div>
    </div>
  </div>
</template>

<script>
import BookingsTable from "./components/BookingsTable.vue";
import Loader from "./components/Loader.vue";
import axios from "axios";

export default {
  name: "bookings",
  components: {
    Loader,
    BookingsTable
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
        trip: {
          title: "Today's Trip",
          desc: "145 KM",
          classIcon: "text-dark ni ni-money-coins",
        },
        health: {
          title: "Battery Health",
          desc: "99 %",
          classIcon: "text-dark ni ni-controller ",
        },
        speed: {
          title: "Average Speed",
          desc: "56 Km/h",
          classIcon: "text-dark ni ni-delivery-fast",
        },
        volume: {
          title: "Music Volume",
          desc: "15/100",
          classIcon: "text-dark ni ni-note-03",
        },
      },
      bookings: [],
      display_table: false,
      loaderActive: false,
    };
  },
  methods: {
    showLoader() {
        this.loaderActive = true;
    },
    hideLoader() {
        this.loaderActive = false;
    },
  },
  async created() {
    this.showLoader();
    var token = "Token " + localStorage.getItem('token');
    //var ms = this;
    await axios
        .get("http://127.0.0.1:8000/api/bookings/?user_id=1",{
            headers: {
              'Authorization': token
            }
        })
        .then((response) => {
            this.bookings = response.data;
            this.display_table = true;
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('general error');
            }
        });
    console.log(this.bookings);
    this.hideLoader();
  },
  beforeCreate() {
    var token = localStorage.getItem('token');
    if (token) {
        console.log('Is Logged in');
    } else {
        this.$store.state.isLogged = false;
        this.$router.push({ name: 'Signin' })
    }
  },
};
</script>
