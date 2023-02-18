<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Edit Reservation</p>
                <argon-button @click="save" color="success" size="sm" class="ms-auto"
                  >Save</argon-button
                >
                <argon-button @click="close" variant="gradient" color="light" size="sm" class="ms-3"
                  >Close</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Booking Information</p>
              <div class="row">
                <div class="col-md-3">
                  <label for="example-text-input" class="form-control-label"
                    >Reservation Id</label
                  >
                  <argon-input :value="reservation.id" name="hname" placeholder="Name" type="text"  />
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                    >Booking Status</label
                    >
                    <select v-model="status" class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">Active</option>
                        <option value="2">Cancel</option>
                    </select>
                </div>
                <div class="col-md-3">
                  <label for="example-text-input" class="form-control-label"
                    >Number of rooms booked</label
                  >
                  <argon-input :value="reservation.no_rooms" name="nroom" placeholder="1" type="number" />
                </div>

                <div class="col-md-6">
                  <label for="startDate" class="form-control-label"
                    >Date in</label
                  >
                  <input :value="reservation.date_in" id="startDate" class="form-control" type="date" />
                </div>
                <div class="col-md-6">
                  <label for="endDate" class="form-control-label"
                    >Date out</label
                  >
                  <input :value="reservation.date_out" id="endDate" class="form-control" type="date" />
                </div>
                
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Additional Information</p>
              <div class="row">
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Hotel Id</label
                  >
                  <argon-input :value="reservation.hotel_id.toString()" name="hid" disabled placeholder="Id" type="number" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Customer Id</label
                  >
                  <argon-input :value="reservation.user_id" name="cid" placeholder="Id" type="number" disabled />
                </div>
              </div>   
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "reservation-form",
    props: {
      reservation: {
        type: Object,
        default: () => {
          return {};
        }
      },
      action: {
        type: String,
      }
    },
    data() {
        return {
            booking: {
                id: 0,
                date_in: null,
                date_out: null,
                no_rooms: 1,
                hotel_id: 0,
                user_id: 0,
            },
            status: '',
        };
    },
    methods: {
        save() {
            /*
            let id = document.getElementsByName('hid')[0].value;
            let nm = document.getElementsByName('hname')[0].value;
            let ds = document.getElementsByName('hdesc')[0].value;
            let lc = document.getElementsByName('hloc')[0].value;
            let rm = document.getElementsByName('hroom')[0].value;
            let ht = {id:id, hotel_name:nm, description:ds, location:lc, total_rooms:rm }
            this.$emit('save',ht);
            */
           console.log(this.booking.id);
           console.log(this.booking.date_in);
           console.log(this.status);
        },
        close() {
           this.$emit('close'); 
        }
    },
    components: { ArgonInput, ArgonButton },

    created() {
        //console.log('Reservation Form child comp has:'+this.reservation.id);
        //console.log('Reservation Form child comp and:'+this.booking.id);
        //this.booking.id = this.reservation.id;
    },
};

</script>
