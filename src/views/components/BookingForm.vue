<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Edit Booking</p>
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
                  <input class="form-control" :value="reservation.id" name="hname" placeholder="Name" type="number" disabled />
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label"
                    >Booking Status</label
                    >
                    <select id="reservation_status" class="form-select" aria-label="form-select">
                        <option selected>Select reservation status</option>
                        <option v-for="item in status" 
                                :value="item" 
                                :key="item.id"
                                :selected="sel === item.name"
                                >{{ item.name }}
                        </option>
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
                  <input :value="reservation.date_in" name="startDate" class="form-control" type="date" />
                </div>
                <div class="col-md-6">
                  <label for="endDate" class="form-control-label"
                    >Date out</label
                  >
                  <input :value="reservation.date_out" name="endDate" class="form-control" type="date" />
                </div>
                
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Additional Information</p>
              <div class="row">
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Room Id</label
                  >
                  <argon-input :value="reservation.room_id" name="rid" placeholder="Id" type="number" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Hotel Id</label
                  >
                  <argon-input :value="reservation.hotel_id" name="hid" placeholder="Id" type="number" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Customer Id</label
                  >
                  <argon-input :value="reservation.user_id" name="cid" placeholder="Id" type="number" />
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
    name: "booking-form",
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
                status: null,
                no_rooms: 1,
                room_id: 0,
                hotel_id: 0,
                user_id: 0,
            },
            status: [
                {name:'ACTIVE',id:1},
                {name:'CANCEL',id:2}
            ],
            sel: 'ACTIVE'
        };
    },
    methods: {
        save() {
            
            let id = document.getElementsByName('hname')[0].value;
            let nr = document.getElementsByName('nroom')[0].value;
            let ds = document.getElementsByName('startDate')[0].value;
            let de = document.getElementsByName('endDate')[0].value;
            let rd = document.getElementsByName('rid')[0].value;
            let hd = document.getElementsByName('hid')[0].value;
            let ud = document.getElementsByName('cid')[0].value;
            let st = document.getElementById('reservation_status');
            let txt = st.options[st.selectedIndex].text;

            let ht = {id:id, hotel_id:hd, room_id:rd, user_id:ud, date_in:ds, date_out:de, 
                    status:txt, no_rooms:nr }
            this.$emit('save',ht);
        },
        close() {
           this.$emit('close'); 
        }
    },
    components: { ArgonInput, ArgonButton },

    created() {
        this.sel = this.reservation.status;
    },
};

</script>
