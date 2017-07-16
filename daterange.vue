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
                            @click="submitIt($event)">{{ submitText }}
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
			disabledDates: {
				type: Array,
				default: function() {
					return []
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
			noOverlap: {
				value: Boolean,
				default: true
			},
			endPlus: {
				value: Number,
				default: 1
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
				sDate: null,
				disabledStartDates: [],// these change via user interaction and defaultDisabledDates
				disabledEndDates: [],// these change via user interaction and defaultDisabledDates
                /* use the prop disabledDates for static dates or this for dates that may change via the partent! */
				defaultDisabledDates: {
					to: new Date('1990-12-31'),
					from: new Date('3333-12-31'),
					dates: []
				},
			}
		},
		watch: {
			// watching the data is not recommended unless you need to do some major function calls on changes.
			sDate: function() {
				if (this.overlapsDisabledDates() || this.sDate > this.eDate) {
					// allow the start date to be set to anything not disabled,
					// but change the end date to this.endPlus if there are any conflicts with disabled dates
					this.eDate = this.addDays(this.sDate, this.endPlus);
				}
				// check if
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
			this.setValue(this.value);
		},
		init () {
			// setup the initial value
			if (this.value) {
				this.setValue(this.value)
			}
		},
		mounted() {
			// setup disabled dates.
			var length = this.disabledDates.length;
			this.disabledStartDates = {};
			this.disabledEndDates = {};
			for (var i = 0; i < length; i++) {
				var d = this.newDay(this.disabledDates[i]);
				// set end dates
				this.disabledEndDates[d.getTime()] = this.newDay(d);
				// disable the date for start dates
				this.disabledStartDates[d.getTime()] = this.newDay(d);
				// also disable dates after that date to allow for a proper end date!
				var dMinusOne = this.subDays(d, this.endPlus);
				this.disabledStartDates[dMinusOne.getTime()] = dMinusOne;
			}
		},
		computed: {
			days: function() {
				var timeDiff = Math.abs(this.eDate.getTime() - this.sDate.getTime());
				return Math.ceil(timeDiff / (1000 * 3600 * 24));
			},
			disabled_start: function() {
				var ret = Object.assign({}, this.defaultDisabledDates);
				if (this.disabledStartDates && Object.keys(this.disabledStartDates).length > 0) {
					if (ret.dates && Object.keys(ret.dates).length > 0) {
						ret.dates = Object.values(Object.assign(ret.dates, this.disabledStartDates));
					} else {
						ret.dates = Object.values(this.disabledStartDates)
					}
				}
				return ret;
			},
			disabled_end: function() {
				var ret = Object.assign({}, this.defaultDisabledDates);
				if (this.disabledEndDates && Object.keys(this.disabledEndDates).length > 0) {
					if (ret.dates && Object.keys(ret.dates).length > 0) {
						ret.dates = Object.values(Object.assign(ret.dates, this.disabledEndDates));
					} else {
						ret.dates = Object.values(this.disabledEndDates)
					}
				}
				if (this.restrictDates) {
					//to: startDate, // Disable everything TO start date
					// cannot set end date before start date.
					ret.to = this.sDate;
				}
				if (this.noOverlap && Object.keys(this.disabledEndDates).length > 0) {
					// set the "to" date restriction to be the first date after start date...
					///  the date rance cannot overlap any of the disabled dates..
					ret.from = new Date('9999-12-31');
					for (var key in this.disabledEndDates) {
						if (this.disabledEndDates[key] > this.sDate && this.disabledEndDates[key] < ret.from
								&& this.sDate && this.disabledEndDates[key] < this.defaultDisabledDates.from
						) {
							ret.from = new Date(this.disabledEndDates[key].getTime());
						}
					}
				}
				return ret;
			},
			highlighted_obj: function() {
				return {
					from: this.sDate,
					to: this.eDate
				};
			}
		},
		methods: {
			newDay(date) {
				if (Object.prototype.toString.call(date) !== '[object Date]') {
					var d = new Date(date);
				} else {
					var d = new Date(date.getTime());
				}
				return d;
			},
			addDays(d, addDays) {
				return new Date(new Date(d.getTime()).setDate(d.getDate() + addDays));
			},
			subDays(d, subDays) {
				return new Date(new Date(d.getTime()).setDate(d.getDate() - subDays));
			},
			overlapsDisabledDates(){
				for (var key in this.disabledEndDates) {
					if ((this.disabledEndDates[key] <= this.eDate && this.disabledEndDates[key] >= this.sDate)) {
						return true;
					}
				}
			},
			setValue (dates) {
				if (!this.endDate && dates.start) {
					this.eDate = this.dateInit(dates.end);
				}
				if (!this.startDate && dates.end) {
					this.sDate = this.dateInit(dates.start);
				}
				if (this.eDate < this.sDate) {
					if (this.restrictDates) {
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