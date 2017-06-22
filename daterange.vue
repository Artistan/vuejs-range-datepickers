<template>
    <div class="date-range-picker">
        <slot name="header"><h3>Select a date range.</h3></slot>
        <fieldset class="form-inline">
            <slot name="header"><legend>Dates</legend></slot>
            <div class="form-group">
                <label :for="start_id">FROM:</label>
                <datepicker :id="start_id" :calendar-button="calendarButton" :calendar-button-icon="calendarButtonIcon" :format="format" :language="language" :monday-first="mondayFirst" :initial-view="initialView" :wrapper-class="wrapperClass" :input-class="inputClass" :required="required" :disabled-picker="disabledPicker" :placeholder="placeholder" :inline="inline" :clear-button="clearButton" :clear-button-icon="clearButtonIcon" :name="start_name" v-model="sDate" :disabled="disabled_start" :bootstrap-styling="bootstrapStyles" :highlighted="highlighted_obj"></datepicker>
            </div>
            <div class="form-group">
                <label :for="end_id">TO:</label>
                <datepicker :id="end_id"   :calendar-button="calendarButton" :calendar-button-icon="calendarButtonIcon" :format="format" :language="language" :monday-first="mondayFirst" :initial-view="initialView" :wrapper-class="wrapperClass" :input-class="inputClass" :required="required" :disabled-picker="disabledPicker" :placeholder="placeholder" :inline="inline" :clear-button="clearButton" :clear-button-icon="clearButtonIcon" :name="end_name" v-model="eDate" :disabled="disabled_end" :bootstrap-styling="bootstrapStyles" :highlighted="highlighted_obj"></datepicker>
            </div>
        </fieldset>
    </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  export default {
    components: {
      Datepicker
    },
    props: {
      startDate: null,
      endDate: null,
      eventMsg: null,
      bootstrapStyles: true,
      start_id: 'start_date',
      end_id: 'end_date',
      start_name: 'start_date',
      end_name: 'end_date',
      inline: true,
      inputClass: null,
      placeholder: null,
      clearButton: false,
      clearButtonIcon: '',
      disabledPicker: false,
      required: true,
      wrapperClass: '',
      initialView: 'day',
      mondayFirst: false,
      language: 'en',
      format: {
        value: String,
        default: 'dd MMM yyyy'
      },
    },
    data: function() {
      // data must be defined here for the child component to have access to it.
      return {
        eDate: null,
        sDate: null
      }
    },
    watch: {
      // watching the data is not recommended unless you need to do some major function calls on changes.
      sDate: function() {
        console.log(this.sDate);
      }
    },
    created: function() {
      // format the dates properly...
      // using eData rather than endDate because you do not want to "modify" properties.
      this.eDate = this.dateInit(this.endDate);
      this.sDate = this.dateInit(this.startDate);
      if(this.eDate  < this.sDate ){
        this.eDate = null;
        this.sDate = null;
        console.error('end date is before start date! -- Resetting all dates')
      }
    },
    computed: {
      days: function() {
        return 14;
      },
      disabled_start: function() {
        return {
          //from: endDate, // Disable everything FROM end date
          from: this.eDate
        };
      },
      disabled_end: function() {
        return {
          //to: startDate, // Disable everything TO start date
          to: this.sDate
        };
      },
      highlighted_obj: function() {
        return {
          from: this.sDate,
          to: this.eDate
        };
      }
    },
    methods: {
      dateInit (date) {
        if (typeof date === 'string') {
          let parsed = new Date(date)
          date = isNaN(parsed.valueOf()) ? null : parsed
        }
        if (!date) {
          return null;
        }
        return date;
      }
    }
  }
</script>

<style>
    body {
        font-family: 'Helvetica Neue Light', Helvetica, sans-serif;
        padding: 1em 2em 2em;
    }

    input, select {
        padding: .75em .5em;
        font-size: 100%;
        border: 1px solid #ccc;
        width: 100%
    }

    select {
        height: 2.5em;
    }

    .example {
        background: #f2f2f2;
        border: 1px solid #ddd;
        padding: 0em 1em 1em;
        margin-bottom: 2em;
    }

    code,
    pre {
        margin: 1em 0;
        padding: 1em;
        border: 1px solid #bbb;
        display: block;
        background: #ddd;
        border-radius: 3px;
    }

    .settings {
        margin: 2em 0;
        /*padding: 0 1.5em 1.5em;*/
        border-top: 1px solid #bbb;
        background: #eee;
    }

    h5 {
        font-size: 100%;
        padding: 0;
    }

    .form-group {
        margin-bottom: 1em;
    }

    .form-group label {
        font-size: 80%;
        display: block;
    }

</style>