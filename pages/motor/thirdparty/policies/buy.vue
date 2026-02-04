<template>
    <div>
      <v-row>
        <v-col cols="6">
          <h1 class="primary-text">Buy Policy</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <UiChildCard title="">
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  label="Variant"
                  v-model="policyStore.policyData.variant"
                  :items="policyStore.policyData.variants"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
              </v-col>
                <v-col cols="12" md="4">
                <v-select
                  label="Holder Type"
                  v-model="policyStore.policyData.holder_type"
                  :items="policyStore.policyData.holderTypes"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
              </v-col>
            </v-row> 
            <v-row v-if="policyStore.policyData.holder_type == 'Individual'">
              <v-col cols="12" md="4">
                <v-text-field
                  label="Surname"
                  v-model="policyStore.policyData.surname"
                >
                </v-text-field>
              </v-col>
                <v-col cols="12" md="4">
                <v-text-field
                  label="First Name"
                  v-model="policyStore.policyData.first_name"
                >
                </v-text-field>
              </v-col> 
                 <v-col cols="12" md="4">
                <v-text-field
                  label="Contact Address"
                  v-model="policyStore.policyData.contact_address"
                >
                </v-text-field>
              </v-col> 
            </v-row>
            <v-row v-if="policyStore.policyData.holder_type == 'Corporate'"> 
                 <v-col cols="12" md="4" >
                <v-text-field
                  label="Company Name"
                  v-model="policyStore.policyData.company_name"
                >
                </v-text-field>
              </v-col> 
              <v-col cols="12" md="4">
                <v-text-field
                  label="Company Address"
                  v-model="policyStore.policyData.contact_address"
                >
                </v-text-field>
              </v-col> 
            </v-row>
               <v-row >
                 <v-col cols="12" md="4">
                <v-text-field
                  label="Phone Number"
                  type="number"
                  v-model="policyStore.policyData.phone_number"
                >
                </v-text-field>
              </v-col> 
              <v-col cols="12" md="4">
                <v-text-field
                  label="Email"
                  v-model="policyStore.policyData.email"
                >
                </v-text-field>
              </v-col> 
            </v-row>
            <v-row> 
              <v-col cols="12" md="4">
                <v-select
                  v-if="policyStore.policyData.holder_type == 'Individual'"
                  label="Idendification"
                  v-model="policyStore.policyData.individual_identification"
                  :items="policyStore.policyData.individualIdentification"
                  item-value="value"
                  item-title="name"
                  @update:modelValue="selectIdentification"
                >
                </v-select>
                <v-select
                  v-if="policyStore.policyData.holder_type == 'Corporate'"
                  label="Idendification"
                  v-model="policyStore.policyData.corporate_identification"
                  :items="policyStore.policyData.CorporateIdentification"
                  item-value="value"
                  item-title="name"
                  @update:modelValue="selectIdentification"

                >
                </v-select>
              </v-col>
               <v-col cols="12" md="4">
                <v-text-field
                  label="Identification Number"
                  v-model="policyStore.policyData.identification_number"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
              <v-file-input
                label="Upload Idendtification"
                id="identification_document"
              ></v-file-input>
            </v-col>
            </v-row>
         
            <v-row >
              <v-col cols="12" md="4">
                <v-select
                  label="Class of Insurance"
                  v-model="policyStore.policyData.policy_type"
                  :items="policyStore.policyData.classOfInsurance"
                  item-value="value"
                  item-title="name"
                  @update:modelValue="selectInsurancePolicy"

                >
                </v-select>
              </v-col> 
              <v-col cols="12" md="4">
                <v-select
                  label="Year of Make"
                  v-model="policyStore.policyData.year_of_make"
                  :items="policyStore.policyData.years"
                >
                </v-select>
              </v-col> 
              <v-col cols="12" md="4">
                <v-text-field
                  label="Registration Number"
                  v-model="policyStore.policyData.registration_number"
                >
                </v-text-field>
              </v-col> 
            </v-row>
            <v-row >
              <v-col cols="12" md="4">
                <v-text-field
                  label="Engine Number"
                  v-model="policyStore.policyData.engine_number"
                >
                </v-text-field>
              </v-col> 
              <v-col cols="12" md="4">
                <v-text-field
                  label="Chasis Number"
                  v-model="policyStore.policyData.chasis_number"
                >
                </v-text-field>
              </v-col> 
              <v-col cols="12" md="4">
                <v-select
                  label="Color"
                  v-model="policyStore.policyData.vehicle_color"
                  :items="colors"
                >
                </v-select>
              </v-col> 
            </v-row>
            <v-row >
              <v-col cols="12" md="3">
                <v-select
                  label="Make of Vehicle"
                  v-model="policyStore.policyData.vehicle_make_id"
                  :items="policyStore.policyData.vehicle_makes"
                  @update:modelValue="selectVehicleMakes"
                  item-value="id"
                  item-title="name"
                >
                </v-select>
              </v-col> 
              <v-col cols="12" md="3">
                <v-select
                  label="Model of Vehicle"
                  v-model="policyStore.policyData.vehicle_model_id"
                  :items="policyStore.policyData.vehicle_models"
                  item-value="id"
                  item-title="name"
                >
                </v-select>
              </v-col> 
              <v-col cols="12" md="3">
                <v-select v-if="policyStore.policyData.policy_type == 'PM'"
                  v-model="policyStore.policyData.vehicle_type"
                  label="Type of Vehicle"
                  :items="policyStore.policyData.typeOfVehiclePm"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
                <v-select v-if="policyStore.policyData.policy_type == 'CV'"
                  v-model="policyStore.policyData.vehicle_type"
                  label="Type of Vehicle"
                  :items="policyStore.policyData.typeOfVehicleCv"
                  item-value="value"
                  item-title="name"
                >
                </v-select>

                <v-select v-if="policyStore.policyData.policy_type == 'TR'"
                  v-model="policyStore.policyData.vehicle_type"
                  label="Type of Vehicle"
                  :items="policyStore.policyData.typeOfVehicleTr"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
                <v-select v-if="policyStore.policyData.policy_type == 'MC'"
                 v-model="policyStore.policyData.vehicle_type"
                  label="Type of Vehicle"
                  :items="policyStore.policyData.typeOfVehicleMc"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
              </v-col> 
              <v-col cols="12" md="3">
                <v-select v-if="policyStore.policyData.policy_type == 'CV'"
                  v-model="policyStore.policyData.cv_type"
                  label="Purpose"
                  :items="policyStore.policyData.purpose"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
              </v-col> 
              <v-col cols="12" md="3">
                <v-select 
                  v-model="policyStore.policyData.payment_method"
                  label="Payment Method"
                  :items="policyStore.policyData.paymentMethods"
                  item-value="value"
                  item-title="name"
                >
                </v-select>
              </v-col> 
            </v-row>
            <v-row class="pb-8"  v-if="policyStore.policyData.payment_method == 'WALLET'"
            >
              <v-col cols="12" md="2">
                <BaseButton
                  id="submit_btn"
                  mode="colored"
                  @click="buyPolicy()"
                  >Buy Policy</BaseButton
                >
              </v-col>
            </v-row>
            <v-row class="pb-8" v-if="policyStore.policyData.payment_method == 'PAYSTACK'"
            >
              <v-col cols="12" md="2">
                <BaseButton
                  id="submit_btn"
                  mode="colored"
                  @click="generateTransactionRerefence()"
                  >Make Payment</BaseButton
                >
              </v-col>
            </v-row>
          </UiChildCard>
        </v-col>
      </v-row>
    </div>
  </template>
  <script>
  definePageMeta({
  layout: 'motor'
});
import { defineComponent } from "@vue/composition-api";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import BaseButton from "@/components/ui-components/buttons/BaseButton";
import { usePolicyStore } from "~/store/motor/thirdparty/policy";
import { useStateStore } from "~/store/state";
import { useVehicleStore } from "~/store/vehicle";

export default defineComponent({
  components: {
    BaseButton,
    UiChildCard,
  },
  setup() {
    const { notify } = useNotification();
    const router = useRouter();
    const policyStore = usePolicyStore();
    const stateStore = useStateStore()
    const vehicleStore = useVehicleStore()
    const config = useRuntimeConfig();
    const { $paystack } = useNuxtApp()
    const errors = ref(false)


    const transaction_reference = ref("")

    const policyData = ref({
      bounce_customers: [],
      status: null,
      vehicle_makes: [],
      vehicle_models: [],
      all_vehicle_models: [],
      all_states: [],
      all_local_government: [],
      all_policies: [],
      years: [],
      name: "",
      niid_status: "",
      status: "",
      insured_name: "",
      company_name: "",
      contact_address: "",
      phone_number: "",
      email: "",
      state_id: "",
      local_government_id: "",
      policy_type: "",
      year_of_make: "",
      registration_number: "",
      engine_number: "",
      chasis_number: "",
      vehicle_color: "",
      vehicle_make_id: "",
      vehicle_model_id: "",
      vehicle_type: "",
      geographical_zone: "",
      purpose: "",
      cv_type: "",
      colors: [],
      policy_number: "",
      policy_id: "",
      show_renew: 0,
      payment_method: "",
      transaction_reference: "",
      amount: 0,
      bounce_customers: [],
      classOfInsurance: [
        { name: "Select Insurance class", value: "" },
        { name: "Private Motor", value: "PM" },
        { name: "Commercial Vehicle", value: "CV" },
        { name: "Tricycle", value: "TR" },
        { name: "Truck", value: "TK" },
        { name: "Staff Bus", value: "SB" },
      ],
      typeOfVehiclePm: [
        { name: "Convertible", value: "convertible" },
        { name: "Coupe", value: "coupe" },
        { name: " Hatchback", value: "hatchback" },
        { name: "Saloon", value: "saloon" },
        { name: "Suv", value: "suv" },
        { name: "Wagon", value: "wagon" },
        { name: "Jeep", value: "jeep" },
        { name: "Truck", value: "truck" },
      ],
      typeOfVehicleCv: [
        { name: "Bus", value: "bus" },
        { name: "Pickup", value: "pickup" },
        { name: "Mini-Truck", value: "minitruck" },
        { name: "Mini-Van", value: "minivan" },
      ],
      typeOfVehicleTr: [{ name: "Tricycle", value: "tricycle" }],
      typeOfVehicleMc: [{ name: "Motor-Cycle", value: "motorcycle" }],
      purpose: [
        {name: "Own Goods", value: "Own Goods"},
        {name: "General Cartage", value: "General Cartage"},
      ],
      paymentMethods: [
        { name: "WALLET PAYMENT", value: "WALLET" },
        { name: "CARD/BANK PAYMENT", value: "PAYSTACK" },
      ],

      
    });

    // Fetch all vehicle years with a start year
    onMounted(() => {
      let currentYear = new Date().getFullYear();
      let startYear = 1990;
      while(startYear < currentYear){
        policyStore.policyData.years.push((startYear++).toString());
      }

      // call paystac inline script
      const script = document.createElement('script');
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = () => {
        console.log("Paystack script loaded successfully");
      };
      document.body.appendChild(script);
    });

    // al vehicle colors
    const colors = ref([
      "White",
      "Black",
      "Red",
      "Yellow",
      "Blue",
      "Brown",
      "Green",
      "Ash",
      "Gold",
      "Orange",
      "Grey",
      "Purple",
      "Pink",
      "Silver",
      "Custom",
    ])
    // fetch all states
    // const getStates = async () =>{
    //   try{
    //     const data = await stateStore.allState();
    //     policyData.value.all_states = data.data
    //     console.log( policyData.value.all_states);
    //   }catch(e){
    //     console.log(e)
    //   }
    // }

    // stateStore.allState()
    // .then((states) =>{
    //   policyStore.policyData.value.all_states = states.data
    // }).catch((e) =>{
    //   console.log(e)
    // })

    // const selectLocalGovernment = async (event) => {
    //   try{
    //     const state_id = event;
    //     policyData.value.all_states.forEach((item) => {
    //       if(item.id == state_id){
    //         policyData.value.all_local_government = item.local_governments;
    //       }
    //     })
    //   }catch(e){
    //     console.log(e);
    //   }
    // };

    // Fetch all vehicle makes
    vehicleStore.vehicleMakes()
    .then((vehicle) =>{
      policyStore.policyData.vehicle_makes = vehicle.data
      // console.log( "All vehicle makes",policyData.value.vehicle_makes )
    }).catch((e) =>{
      console.log(e)
    })


    // fetch vehicle models from vehicle makes
    const selectVehicleMakes = async (event) => {
      if(policyStore.policyData.policy_type == ""){
        notify({
          title: "Error",
          text: "Please select an Insurance class",
          type: "error"
        })
      }
      const vehicle_id = event;
      policyStore.policyData.vehicle_makes.forEach((item) =>{
        // console.log(item)
        if(item.id == vehicle_id){
          policyStore.policyData.all_vehicle_models = item.vehicle_models
        
          // console.log( policyData.value.all_vehicle_models)
        }
      })

        policyStore.policyData.vehicle_models = [];

        policyStore.policyData.all_vehicle_models.forEach((item) =>{
          if(item.insurance_class == policyStore.policyData.policy_type){
            policyStore.policyData.vehicle_models.push(item);
          }
        })
    }

    const selectIdentification = (event) => {
      policyStore.policyData.identification_selected = event
    }


      const selectInsurancePolicy = async (event) => {
      if(policyStore.policyData.vehicle_model_id != ""){
        notify({
          title: "Error",
          text: "Insurance Class has changed... <br>Select Vehicle Model",
          type: "error"
        })
      }

      // policyData.value.vehicle_makes.forEach((item) =>{
      //   if(item.id == policyData.vehicle_id){
      //   console.log("The policy vehicle id is", policyData.vehicle_id)
      //     policyData.value.all_vehicle_models = item.vehicle_models
      //   }
      // })
      policyStore.policyData.vehicle_model_id = null;

        policyStore.policyData.vehicle_models = [];

        policyStore.policyData.all_vehicle_models.forEach((item) =>{
          if(item.insurance_class == policyStore.policyData.policy_type){
            // console.log("Insurance class is",item.insurance_class)
            policyStore.policyData.vehicle_models.push(item);
          }
        })
    }


    // Buy policy using wallet payment methos
    const buyPolicy = async () => {
      if(policyStore.policyData.identification_selected !== ""){
        console.log("The Selected ID is", policyStore.policyData.identification_selected)
        await verifyId()
      }

      console.log("Checking for erros", errors.value)

      // Step 4: Stop if saving produced an error
      if (errors.value) {
        console.log(errors.value)
        return;
      }
    // const submit_btn = document.getElementById("submit_btn");
    // const submit_btn_selector = document.querySelector("#submit_btn");
    // submit_btn.disabled = true;
    // submit_btn_selector.innerHTML = "Buying Policyyyyyyyyyyy" 
        try{
          if(policyStore.policyData.variant == ""){
          notify({
          title: "failed!",
          type: "error",
          text: "Plase Select Variant",       
          });
      return;
          }
      if(policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.first_name == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Plase Enter First Name",       
      });
      return;
    }
     if (policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.surname == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Plase Enter Surname",       
      });
      return;
    }
    // if (policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.contact_address == "") {
    //   notify({
    //     title: "failed!",
    //     type: "error",
    //     text: "Please Enter  Contact Address",
    //   });
    //   return;
    // }
    //   if (policyStore.policyData.holder_type == 'Corporate' && policyStore.policyData.company_address == "") {
    //   notify({
    //     title: "failed!",
    //     type: "error",
    //     text: "Please Enter Company Address",
    //   });
    //   return;
    // }
    if (policyStore.policyData.phone_number == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Phone Number",
      });
      return;
    }
    if (policyStore.policyData.email == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Insured Email Address",
      });
      return;
    }
    if (policyStore.policyData.holder_type == 'Corporate' && policyStore.policyData.corporate_identification == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Company Address",
      });
      return;
    }
      if (policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.inividual_identification == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Contact Address",
      });
      return;
    }

    if (policyStore.policyData.policy_type == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Select an Insurance Class",
      });
      return;
    }
    if(policyStore.policyData.policy_type == 'CV' && policyStore.policyData.cv_type == ""){
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Purpose",
      });
      return;
    }
    if (policyStore.policyData.year_of_make == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Vehicle Year",
      });
      return;
    }
    if (policyStore.policyData.registration_number == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please enter Vehicle Registration Number",
      });
      return;
    }
    if (policyStore.policyData.chasis_number == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Vehicle Chasis Number",
      });
      return;
    }
    if (policyStore.policyData.vehicle_color == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please selec Vehicle Color",
      });
      return;
    }
    if (policyStore.policyData.vehicle_make_id == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Vehicle Make",
      });
      return;
    }
    
    if (policyStore.policyData.vehicle_model_id == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Vehicle Model",
      });
      return;
    }

    const submit_btn = document.getElementById("submit_btn");
    const submit_btn_selector = document.querySelector("#submit_btn");
    submit_btn.disabled = true;
    submit_btn_selector.innerHTML = "Buyiny Policy......" 


  const data = {
    holder_type: policyStore.policyData.holder_type,
    variance: policyStore.policyData.variant,
    first_name: policyStore.policyData.first_name,
    surname: policyStore.policyData.surname,
    company_name: policyStore.policyData.company_name,
    contact_address: policyStore.policyData.contact_address || policyStore.policyData.company_address,
    phone_number: policyStore.policyData.phone_number,
    email: policyStore.policyData.email,
    identification: policyStore.policyData.identification_selected,
    id_number: policyStore.policyData.identification_number,
    policy_type: policyStore.policyData.policy_type,
    cv_type: policyStore.policyData.cv_type,
    year_of_make: policyStore.policyData.year_of_make,
    registration_number: policyStore.policyData.registration_number,
    engine_number: policyStore.policyData.engine_number,
    chasis_number: policyStore.policyData.chasis_number,
    vehicle_color: policyStore.policyData.vehicle_color,
    vehicle_make_id: policyStore.policyData.vehicle_make_id,
    vehicle_model_id: policyStore.policyData.vehicle_model_id,
    vehicle_type: policyStore.policyData.vehicle_type,
    geographical_zone: 6,
    channel: "Agent",
    payment_method: policyStore.policyData.payment_method,
  }

    const purchase  = await  policyStore.buyPolicy(data)
    if(purchase.status == 'success'){
      notify({
        title: "Success",
        text: "Policy purchased successfully",
        type: "Success"
      })
      submit_btn.disabled = false;
      submit_btn_selector.innerHTML = "Buy Policy" 
      console.log(purchase);
      policyStore.resetStore()
      return;
    }else{
      const error = purchase?.value?.data?.message;
      console.log("The Purchase  Error is", error)
      notify({
        title: "Error",
        text: error,
        type: "error"
      })
      submit_btn.disabled = false;
      submit_btn_selector.innerHTML = "Buy Policy" 
      return;
    }
      }catch(e){
        console.log(e)
      }
    }

    const verifyId = async () => {
        const data = {
            id_type: policyStore.policyData.identification_selected,
            id_number: policyStore.policyData.identification_number
        }
        try{
            const response = await policyStore.verifyId(data);
            console.log("The ID response is", response?.value?.data)
            if(response.status == 'success'){
               return;
    
            }
            else{
                errors.value = true
                const error = response?.value?.data?.message;
          notify({
            title: "Error",
            text: error,
            type: "error",
          });

           return;
            }
        }catch(e){
               notify({
            title: "Error",
            text: 'An Error Occoured',
            type: "error",
          });
        }
    }

    // Generate transaction reference and start payment
const generateTransactionRerefence = async () => {
        if(policyStore.policyData.identification_selected !== ""){
        console.log("The Selected ID is", policyStore.policyData.identification_selected)
         await verifyId()
      }
   
  // Step 4: Stop if saving produced an error
  if (errors.value) {
    console.log(errors.value)

    return;
  }

  try {
    const res = await policyStore.generateTransactionReference({})
    if (res) {
      transaction_reference.value = res
      await initiatePaystack()          // await so errors bubble here
    }
  } catch (error) {
    console.error('Failed to generate reference or start Paystack:', error)
  }
}

// Paystack payment initiation (function declaration = hoisted)
async function initiatePaystack() {
    
  try {
       if(policyStore.policyData.variant == ""){
          notify({
          title: "failed!",
          type: "error",
          text: "Plase Select Variant",       
          });
      return;
          }
      if(policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.first_name == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Plase Enter First Name",       
      });
      return;
    }
     if (policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.surname == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Plase Enter Surname",       
      });
      return;
    }
    // if (policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.contact_address == "") {
    //   notify({
    //     title: "failed!",
    //     type: "error",
    //     text: "Please Enter  Contact Address",
    //   });
    //   return;
    // }
    //   if (policyStore.policyData.holder_type == 'Corporate' && policyStore.policyData.company_address == "") {
    //   notify({
    //     title: "failed!",
    //     type: "error",
    //     text: "Please Enter Company Address",
    //   });
    //   return;
    // }
    if (policyStore.policyData.phone_number == "") {
      nottificatiofy({
        title: "failed!",
        type: "error",
        text: "Please Enter Phone Number",
      });
      return;
    }
    if (policyStore.policyData.email == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Insured Email Address",
      });
      return;
    }
    if (policyStore.policyData.holder_type == 'Corporate' && policyStore.policyData.corporate_identification == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Company Address",
      });
      return;
    }
      if (policyStore.policyData.holder_type == 'Individual' && policyStore.policyData.inividual_identification == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Contact Address",
      });
      return;
    }

    if (policyStore.policyData.policy_type == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Select an Insurance Class",
      });
      return;
    }
    if(policyStore.policyData.policy_type == 'CV' && policyStore.policyData.cv_type == ""){
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Purpose",
      });
      return;
    }
    if (policyStore.policyData.year_of_make == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Vehicle Year",
      });
      return;
    }
    if (policyStore.policyData.registration_number == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please enter Vehicle Registration Number",
      });
      return;
    }
    if (policyStore.policyData.chasis_number == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please Enter Vehicle Chasis Number",
      });
      return;
    }
    if (policyStore.policyData.vehicle_color == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please selec Vehicle Color",
      });
      return;
    }
    if (policyStore.policyData.vehicle_make_id == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Vehicle Make",
      });
      return;
    }
    
    if (policyStore.policyData.vehicle_model_id == "") {
      notify({
        title: "failed!",
        type: "error",
        text: "Please select Vehicle Model",
      });
      return;
    }

    const submit_btn = document.getElementById("submit_btn");
    const submit_btn_selector = document.querySelector("#submit_btn");
    submit_btn.disabled = true;
    submit_btn_selector.innerHTML = "Buyiny Policy......" 

    const email = policyStore.policyData?.email || 'customer@example.com'
    let amountKobo = 0

    if(policyStore.policyData.policy_type == 'PM'){
      amountKobo = Math.round((15000) * 100)
    }else if (policyStore.policyData.policy_type  == 'CV'){
      amountKobo = Math.round((20000) * 100)
    }else if (policyStore.policyData.policy_type  == 'TR'){
      amountKobo = Math.round((5000) * 100)
    }else if (policyStore.policyData.policy_type  == 'TK'){
      amountKobo = Math.round((100000) * 100)
    }else if (policyStore.policyData.policy_type  == 'SB'){
      amountKobo = Math.round((20000) * 100)
    }

    // console.log('Using PK:', config.public.paystackPublicKey)
    // console.log('Email:', email)
    // console.log('Amount (kobo):', amountKobo)
    // console.log('Reference:', transaction_reference.value)

    if (!config.public.paystackPublicKey) {
      throw new Error('Missing public key')
    }
    if (!email) {
      throw new Error('Missing email')
    }
    if (!amountKobo || amountKobo < 10000) {
        notify({
        title: "failed!",
        type: "error",
        text: "Amount too low. Use a realistic amount in kobo.",
      });
      return
      // e.g., ₦100 minimum => 10000 kobo (adjust to your actual minimum)
      throw new Error('Amount too low. Use a realistic amount in kobo.')
    }
    if (!transaction_reference.value) {
      
      
      throw new Error('Missing transaction reference')
    }

    await $paystack.startInline({
      key: config.public.paystackPublicKey,
      email: email,
      amount: amountKobo,                            // in kobo
      reference: transaction_reference.value,         // use the generated ref
      currency: 'NGN',
     // channels: ['card','bank_transfer'],  // include only if needed and correct
    // label: 'Third-party Motor',          // include only if a string
      metadata: {
        // add whatever you need to identify the policy
        
      },
      onSuccess: async (txRef) => {
        console.log('Paystack success ref:', txRef)
        const data = {
          holder_type: policyStore.policyData.holder_type,
          variance: policyStore.policyData.variant,
          first_name: policyStore.policyData.first_name,
          surname: policyStore.policyData.surname,
          company_name: policyStore.policyData.company_name,

          contact_address: policyStore.policyData.contact_address || policyStore.policyData.company_address,
          phone_number: policyStore.policyData.phone_number,
          email: policyStore.policyData.email,
          identification: policyStore.policyData.identification_selected,
          id_number: policyStore.policyData.identification_number,
          policy_type: policyStore.policyData.policy_type,
          cv_type: policyStore.policyData.cv_type,
          year_of_make: policyStore.policyData.year_of_make,
          registration_number: policyStore.policyData.registration_number,
          engine_number: policyStore.policyData.engine_number,
          chasis_number: policyStore.policyData.chasis_number,
          vehicle_color: policyStore.policyData.vehicle_color,
          vehicle_make_id: policyStore.policyData.vehicle_make_id,
          vehicle_model_id: policyStore.policyData.vehicle_model_id,
          vehicle_type: policyStore.policyData.vehicle_type,
          geographical_zone: 6,
          payment_method: policyStore.policyData.payment_method,
          transaction_reference: transaction_reference.value
        }

        try{
           const submit_btn = document.getElementById("submit_btn");
            const submit_btn_selector = document.querySelector("#submit_btn");
            submit_btn.disabled = true;
            submit_btn_selector.innerHTML = "Buying Policy......."
          const response = await policyStore.buyPolicy(data);
          console.log("The response is", response);
        
          if(response.status == "success"){      
            notify({
              title: "Success",
              text: `${response.message}`,
              type: "success"
            })

            const submit_btn = document.getElementById("submit_btn");
            const submit_btn_selector = document.querySelector("#submit_btn");
            submit_btn.disabled = false;
            submit_btn_selector.innerHTML = "Buy Policy" 
            policyStore.resetStore()
          }else{
      const error = response?.value?.data?.message;
      console.log("The Purchase  Error is", error)
      notify({
        title: "Error",
        text: error,
        type: "error"
      })
      submit_btn.disabled = false;
      submit_btn_selector.innerHTML = "Buy Policy" 
      return;
    }

        }catch(error){
          otify({
              title: "Error",
              text: `${error}`,
              type: "error"
            })
        }
        // call your buy-policy endpoint here
        // await $fetch('/api/policies/buy', { method: 'POST', body: { reference: txRef, ... } })
      },
      onClose: () => {
        console.log('Paystack popup closed by user')
      },
    })
  } catch (err) {
    console.error('Paystack popup error:', err)
    // optional: toast/alert to the user
  }
}

    return {
      notify,
      router,
      policyStore,
      policyData,
      stateStore,
      selectInsurancePolicy,
      selectIdentification,
      vehicleStore,
      selectVehicleMakes,
      buyPolicy,
      generateTransactionRerefence,
      colors,
      verifyId,
      errors
      
    };
  },
});
</script>
