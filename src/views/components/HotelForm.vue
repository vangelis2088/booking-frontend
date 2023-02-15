<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Add New Hotel</p>
                <argon-button @click="save" color="success" size="sm" class="ms-auto"
                  >Save</argon-button
                >
                <argon-button @click="close" variant="gradient" color="light" size="sm" class="ms-3"
                  >Close</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Hotel Information</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Hotel Name</label
                  >
                  <argon-input :value="hotel.name" name="hname" placeholder="Name" type="text"  />
                </div>
                <div class="col-md-3" style="display:none;">
                  <label for="example-text-input" class="form-control-label"
                    >Hotel Id</label
                  >
                  <argon-input :value="hotel.id" name="hid" placeholder="Id" type="text"  />
                </div>
                
                <div class="col-md-12">
                  <label for="hotel_desc" class="form-control-label"
                    >Description</label
                  >
                  <textarea :value="hotel.desc" name="hdesc" class="form-control" placeholder="Description" rows="5"></textarea>
                </div>
                
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Additional Information</p>
              <div class="row">              
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Location</label
                  >
                  <argon-input :value="hotel.location" name="hloc" placeholder="New York" type="text" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Total Rooms</label
                  >
                  <argon-input :value="hotel.rooms" name="hroom" placeholder="100" type="text" />
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
    name: "hotel-form",
    props: {
      hotel: {
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
        };
    },
    methods: {
        save() {
            let id = document.getElementsByName('hid')[0].value;
            let nm = document.getElementsByName('hname')[0].value;
            let ds = document.getElementsByName('hdesc')[0].value;
            let lc = document.getElementsByName('hloc')[0].value;
            let rm = document.getElementsByName('hroom')[0].value;
            let ht = {id:id, hotel_name:nm, description:ds, location:lc, total_rooms:rm }
            this.$emit('save',ht);
        },
        close() {
           this.$emit('close'); 
        }
    },
    components: { ArgonInput, ArgonButton },
};

</script>
