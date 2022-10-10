<template>
  <a-table sticky :columns="columns" :data-source="this.data" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column , text}">



      <template v-if="column.key === 'operation'">

        <a-button type="primary"  @click="showModal">Edit</a-button>
        <a-button type="primary" danger @click="this.delete(text.id)">Delete</a-button>
      </template>
    </template>
  </a-table>

  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
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
    </a-form>
  </a-modal>

</template>
<script>
import {defineComponent, reactive, ref} from 'vue';
import axios from "axios";


export default defineComponent({
  data() {
    const columns = ref([{
      title: 'Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    }, {
      title: 'model',
      width: 100,
      dataIndex: 'model',
      key: 'model',
    }, {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
    }, {
      title: 'year',
      dataIndex: 'year',
      key: 'year',
      width: 150,
    }, {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    }, {
      title: 'nation',
      dataIndex: 'nation',
      key: 'nation',
      width: 150,
    }, {
      title: 'amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
    }, {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
    }]);

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

    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };

    const onFinish = values => {
      console.log('Success:', values);
    };
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
    return {
      data: [],
      columns,
      isEdit: false,
      visible,
      showModal,
      handleOk,
      formState,
      onFinish,
      layout,
      validateMessages,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios.get('http://localhost:8051/swagger-resources/svehicle/get-all')
          .then(response => {
            this.data = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    delete(id) {
      axios.delete('http://localhost:8051/swagger-resources/svehicle/delete?id=' + id)
          .then(
              response => {
                this.getAll();
                console.log(response);
              }
          )
          .catch(error => {
            console.log(error);
          });
    },
    edit() {

    },
  }

});
</script>
<style>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}

[data-theme='dark'] #components-table-demo-summary tfoot th,
[data-theme='dark'] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>