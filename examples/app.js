window.Vue = require('vue');
Vue.component('daterange', require('vuejs-range-datepickers'));
const app = new Vue({
  el: '#app',
  data: function() {
    return {
      formdata: {
        start: '06-10-2017',
        end: '06-20-2017',
        event: {}
      }
    };
  },
  methods: {
    submitIt: function($event) {
      /* MouseEvent */
      this.formdata.event = $event;
    }
  }
})