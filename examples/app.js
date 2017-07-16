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
      },
		alreadyReservedDates: [
			'06-01-2017','06-21-2017','06-22-2017','06-23-2017'
		]
    };
  },
  methods: {
    submitIt: function($event) {
      /* MouseEvent */
      this.formdata.event = $event;
    }
  }
})