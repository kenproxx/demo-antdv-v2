<template>
  <a-table sticky :columns="columns" :data-source="this.data" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column , text}">
      <template v-if="column.key === 'operation'">
        <a-button type="primary">Edit</a-button>
        <a-button type="primary" danger @click="this.delete(text.id)">Delete</a-button>
      </template>
    </template>
  </a-table>
</template>
<script>
import {defineComponent, ref} from 'vue';
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


    return {
      data: [],
      columns,
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