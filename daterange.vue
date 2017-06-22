<template>
    <div class="date-range-picker"
         :class="[{ 'no-bootstrap' : !bootstrapStyles },{ 'is-bootstrap' : bootstrapStyles }]">
        <slot name="header-title"><h3>Select a date range.</h3></slot>
        <fieldset class="form-inline" :class="{ 'row' : bootstrapRow }">
            <slot name="header-legend">
                <legend>Dates</legend>
            </slot>
            <div class="form-group" :class="{ 'col-sm-5' : bootstrapRow }">
                <label :for="start_id" v-if="startLabel != ''">{{ startLabel }}</label>
                <datepicker :id="start_id" :calendar-button="calendarButton" :calendar-button-icon="calendarButtonIcon"
                            :format="format" :language="language" :monday-first="mondayFirst"
                            :initial-view="initialView" :wrapper-class="wrapperClass" :input-class="inputClass"
                            :required="required" :disabled-picker="disabledPicker" :placeholder="placeholder"
                            :inline="inline" :clear-button="clearButton" :clear-button-icon="clearButtonIcon"
                            :name="start_name" v-model="sDate" :disabled="disabled_start"
                            :bootstrap-styling="bootstrapStyles" :highlighted="highlighted_obj"></datepicker>
            </div>
            <slot name="button">
                <div class="form-group" :class="{ 'col-sm-2' : bootstrapRow }">
                    <button type="submit" class="btn btn-primary btn-block"
                            v-on:click="submitIt($event)">{{ submitText }}
                    </button>
                </div>
            </slot>
            <div class="form-group" :class="{ 'col-sm-5' : bootstrapRow }">
                <label :for="end_id" v-if="endLabel != ''">{{ endLabel }}</label>
                <datepicker :id="end_id" :calendar-button="calendarButton" :calendar-button-icon="calendarButtonIcon"
                            :format="format" :language="language" :monday-first="mondayFirst"
                            :initial-view="initialView" :wrapper-class="wrapperClass" :input-class="inputClass"
                            :required="required" :disabled-picker="disabledPicker" :placeholder="placeholder"
                            :inline="inline" :clear-button="clearButton" :clear-button-icon="clearButtonIcon"
                            :name="end_name" v-model="eDate" :disabled="disabled_end"
                            :bootstrap-styling="bootstrapStyles" :highlighted="highlighted_obj"></datepicker>
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
      value: {
        type: Object,
        default: function() {
          return {
            start: new Date(),
            end: new Date('+14 days')
          }
        },
        validator: function(val) {
          if (val.start === null || val.start instanceof Date || typeof val.start === 'string') {
            if (val.end === null || val.end instanceof Date || typeof val.end === 'string') {
              return true;
            }
          }
          return false;
        }
      },
      startDate: {
        validator: function(val) {
          return val === null || val instanceof Date || typeof val === 'string'
        }
      },
      endDate: {
        validator: function(val) {
          return val === null || val instanceof Date || typeof val === 'string'
        }
      },
      eventMsg: {
        value: String,
        default: ''
      },
      restrictDates: {
        value: Boolean,
        default: true
      },
      bootstrapStyles: {
        value: Boolean,
        default: true
      },
      bootstrapRow: {
        value: Boolean,
        default: true
      },
      start_id: {
        value: String,
        default: 'start_date'
      },
      end_id: {
        value: String,
        default: 'end_date'
      },
      start_name: {
        value: String,
        default: 'start_date'
      },
      end_name: {
        value: String,
        default: 'end_date'
      },
      startLabel: {
        value: String,
        default: 'FROM:'
      },
      endLabel: {
        value: String,
        default: 'TO:'
      },
      inline: {
        value: Boolean,
        default: false
      },
      inputClass: {
        value: String,
        default: ''
      },
      placeholder: {
        value: String,
        default: ''
      },
      clearButton: {
        value: Boolean,
        default: false
      },
      clearButtonIcon: {
        value: String,
        default: ''
      },
      calendarButton: {
        value: Boolean,
        default: false
      },
      calendarButtonIcon: {
        value: String,
        default: ''
      },
      disabledPicker: {
        value: Boolean,
        default: false
      },
      required: {
        value: Boolean,
        default: true
      },
      wrapperClass: {
        value: String,
        default: ''
      },
      initialView: {
        value: String,
        default: 'day'
      },
      mondayFirst: {
        value: Boolean,
        default: false
      },
      language: {
        value: String,
        default: 'en'
      },
      submitCallback: null,
      submitText: {
        value: String,
        default: 'UpDate'
      },
      format: {
        value: String,
        default: 'dd MMM yyyy'
      },
    },
    data () {
      // data must be defined here for the child component to have access to it.
      return {
        eDate: null,
        sDate: null
      }
    },
    watch: {
      // watching the data is not recommended unless you need to do some major function calls on changes.
      sDate: function() {
        this.$emit('input', {
          start: this.sDate,
          end: this.eDate,
          updated: 'start'
        });
      },
      eDate: function() {
        this.$emit('input', {
          start: this.sDate,
          end: this.eDate,
          updated: 'end'
        });
      },
      value (value) {
        if (value) {
          this.setValue(value)
        }
      }
    },
    created () {
      // format the dates properly...
      // using eData rather than endDate because you do not want to "modify" properties.
      if (this.endDate) {
        this.eDate = this.dateInit(this.endDate);
      }
      if (this.startDate) {
        this.sDate = this.dateInit(this.startDate);
      }
      if (this.eDate < this.sDate) {
        this.eDate = null;
        this.sDate = null;
        console.error('end date is before start date! -- Resetting all dates');
      }
    },
    init () {
      if (this.value) {
        this.setValue(this.value)
      }
    },
    computed: {
      days: function() {
        return 14;
      },
      disabled_start: function() {
        if(!this.restrictDates){
          return {};
        }
        return {
          //from: endDate, // Disable everything FROM end date
          from: this.eDate
        };
      },
      disabled_end: function() {
        if(!this.restrictDates){
          return {};
        }
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
      setValue (dates) {
        if (!this.endDate && dates.start) {
          this.eDate = this.dateInit(dates.start);
        }
        if (!this.startDate && dates.end) {
          this.sDate = this.dateInit(dates.end);
        }
        if (this.eDate < this.sDate) {
          if(this.restrictDates){
            this.eDate = null;
            this.sDate = null;
            console.error('end date is before start date! -- Resetting all dates');
          }
        }
      },
      submitIt: function($event) {
        if (typeof this.submitCallback === 'function') {
          return this.submitCallback($event);
        }
      },
      dateInit: function(date) {
        if (typeof date === 'string') {
          let parsed = new Date(date);
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
    .date-range-picker input, .date-range-picker select {
        padding: .75em .5em;
        font-size: 100%;
        border: 1px solid #ccc;
        width: 100%
    }

    .date-range-picker select {
        height: 2.5em;
    }

    .date-range-picker .example {
        background: #f2f2f2;
        border: 1px solid #ddd;
        padding: 0em 1em 1em;
        margin-bottom: 2em;
    }

    .date-range-picker code,
    .date-range-picker pre {
        margin: 1em 0;
        padding: 1em;
        border: 1px solid #bbb;
        display: block;
        background: #ddd;
        border-radius: 3px;
    }

    .date-range-picker .settings {
        margin: 2em 0;
        /*padding: 0 1.5em 1.5em;*/
        border-top: 1px solid #bbb;
        background: #eee;
    }

    .date-range-picker h5 {
        font-size: 100%;
        padding: 0;
    }

    .date-range-picker.no-bootstrap .form-group {
        margin-bottom: 1em;
    }

    .date-range-picker.no-bootstrap .form-group label {
        font-size: 80%;
        display: block;
    }

    .form-group .vdp-datepicker .input-group,
    .form-group .vdp-datepicker .input-group input.form-control {
        width: 100%;
    }

    @media (min-width: 768px) {
        .form-group .vdp-datepicker .input-group,
        .form-group .vdp-datepicker .input-group input.form-control {
            width: 100%;
        }
    }
</style>