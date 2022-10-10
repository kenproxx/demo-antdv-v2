<template>
  <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
  >
    <a-form-item :name="['vehicle', 'name']" label="Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.vehicle.name"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'model']" label="Model" :rules="[{ required: true  }]">
      <a-input v-model:value="formState.vehicle.model"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'price']" label="Price" :rules="[{  required: true , min: 1 }]">
      <a-input v-model:value="formState.vehicle.price"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'year']" label="Year" :rules="[{ required: true , min: 1}]">
      <a-input v-model:value="formState.vehicle.year"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'type']" label="Type" :rules="[{ required: true }]">
      <a-input v-model:value="formState.vehicle.type"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'nation']" label="Nation" :rules="[{ required: true }]">
      <a-input v-model:value="formState.vehicle.nation"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'color']" label="Color" :rules="[{ required: true }]">
      <a-input v-model:value="formState.vehicle.color"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'vehicleCode']" label="Vehicle Code" :rules="[{required: true }]">
      <a-input v-model:value="formState.vehicle.vehicleCode"/>
    </a-form-item>
    <a-form-item :name="['vehicle', 'amount']" label="Amount" :rules="[{  required: true, min: 1}]">
      <a-input v-model:value="formState.vehicle.amount"/>
    </a-form-item>


    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit" @click="addVehicle">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import {defineComponent, reactive} from 'vue';
import axios from "axios";
import router from "@/router/router";

export default defineComponent({
  setup() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const formState = reactive({
      vehicle: {
        id: 1,
        name: '',
        model: '',
        price: '',
        year: '',
        type: '',
        nation: '',
        color: '',
        vehicleCode: '',
        amount: '',
      }
    });

    const onFinish = values => {
      console.log('Success:', values);
    };

    return {
      formState,
      onFinish,
      layout,
      validateMessages,
    };
  },
  methods: {
    addVehicle() {

      axios.post('http://localhost:8051/swagger-resources/svehicle/save', this.formState.vehicle)
          .then(
              router.go("/")
          )
          .catch(error => {
            console.log(error);
          });
    }
  }

});
</script>