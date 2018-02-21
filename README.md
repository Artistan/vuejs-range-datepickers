vuejs-range-datepickers
=============

Component utilizing VueJS-Datepicker for a Data Range Select for VueJs.

## Installation
---------------
### npm
``` sh
npm install --save vuejs-range-datepickers
```

## Usage
---------------

```javascript 
//   app.js
window.Vue = require('vue');

Vue.component('range-datepickers',require('vuejs-range-datepickers'));

const app = new Vue({
  el: '#app'
})
```

*value* prop if passed should be a Date object or valid date string
```HTML  
//   index.html
<!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
    </head>
    <body>
      <div id="app">
        <range-datepickers start-date="06-10-2017" end-date="06-20-2017"></range-datepickers>
      </div>
      <script src="main.js"></script>
    </body>
  </html>
```

## more uses cases

``` html
<script>
var state = {
    date: new Date(2016, 9,  16)
}
</script>
<range-datepickers :value="state.date"></range-datepickers>
```
support name attribute for normal html form submission
``` html
<range-datepickers :value="state.date" name="uniquename"></range-datepickers>
```
Use `v-model` for two-way binding
``` html
<range-datepickers v-model="state.date" name="uniquename"></range-datepickers>
```
Inline always open version
``` html
<range-datepickers :inline="true"></range-datepickers>
```

## Available props

| Prop                  | Type         | Default     | Description                              |
|-----------------------|--------------|-------------|------------------------------------------|
| value                 | Date/String  |             | Date value of the datepicker             |
| name                  | String       |             | Input name property                      |
| id                    | String       |             | Input id                                 |
| format                | String       | dd MMM yyyy | Date formatting string                   |
| language              | String       | en          | Translation for days and months          |
| disabled              | Object       |             | See below for configuration              |
| placeholder           | String       |             | Input placeholder text                   |
| inline                | Boolean      |             | To show the datepicker always open       |
| input-class           | String       |             | CSS class applied to the input el        |
| wrapper-class         | String       |             | CSS class applied to the outer div       |
| monday-first          | Boolean      | false       | To start the week on Monday              |
| clear-button          | Boolean      | false       | Show an icon for clearing the date       |
| clear-button-icon     | String       |             | Use icon for button (ex: fa fa-times)    |
| calendar-button       | Boolean      | false       | Show an icon that that can be clicked    |
| calendar-button-icon  | String       |             | Use icon for button (ex: fa fa-calendar) |
| bootstrapStyling      | Boolean      | false       | Output bootstrap styling classes         |
| initial-view          | String       | 'day'       | If 'month' or 'year', open on that view  |
| disabled-picker       | Boolean      | false       | If true, disable Datepicker on screen    |
| required              | Boolean      | false       | Sets html required attribute on input    |
| bootstrap-row         | Boolean      | true        | Sets html styles for .row with even cols |
| restrict-dates        | Boolean      | true        | Restrict the end date to be past start   |
| start-label           | String       | "FROM:"     | Adjust/remove a label for the start input|
| end-label             | String       | "TO:"       | Adjust/remove a label for the end input  |
| submit-callback       | Function     | null        | Set a callback to handle button event    |
| submit-text           | String       | "UpDate"    | Sets submit button text                  |
| disabled-dates        | Array        | []          | Array of Dates|date strings              |
| no-overlap            | Boolean      | true        | Forces End Date to change if overlapping after start date changed|
| minimum-duration      | Number       | 1           | Sets end date to start + minimum-duration if overlap occurs|


## Available data attributes
This data is used to restrict both calendars for a date range and specific dates that may change
use the `recommended` disabled-dates property if your data will not change
```
defaultDisabledDates: {
    to: new Date('1990-12-31'),
    from: new Date('3333-12-31'),
    dates: []
},
```

## slots

* header-title
* header-legend
* button

## Date formatting

NB. This is not very robust at all - use at your own risk! Needs a better implementation.

| Token | Desc                   | Example     |
|-------|------------------------|-------------|
| d     | day                    | 1           |
| dd    | 0 prefixed day         | 01          |
| D     | abbr day               | Mon         |
| su    | date suffix            | st, nd, rd  |
| M     | month number (1 based) | 1 (for Jan) |
| MM    | 0 prefixed month       | 01          |
| MMM   | abbreviated month name | Jan         |
| MMMM  | month name             | January     |
| yy    | two digit year         | 16          |
| yyyy  | four digit year        | 2016        |

#### Translations

``` html
<datepicker language="es"></datepicker>
```
Available languages

| Abbr        | Language         |          |
| ----------- |------------------|----------|
| en          | English          | *Default*|
| bs          | Bosnian          |          |
| es          | Spanish          |          |
| fi          | Finnish          |          |
| fr          | French           |          |
| hu          | Hungarian        |          |
| hr          | Croatian         |          |
| id          | Indonesian       |          |
| it          | Italian          |          |
| nl          | Dutch            |          |
| de          | German           |          |
| da          | Danish           |          |
| nb-no       | Norwegian Bokmål |          |
| cs          | Czech            |          |
| pt-br       | Portuguese-Brazil|          |
| ro          | Romanian         |          |
| vi          | Vietnamese       |          |
| zh          | Chinese          |          |
| ja          | Japanese         |          |
| he          | Hebrew           |          |
| ru          | Russian          |          |
| sk          | Slovak           |          |
| sl-si       | Slovenian        |          |
| sv          | Swedish          |          |
| th          | Thai             |          |
| bg          | Bulgarian        |          |
| lt          | Lithuanian       |          |
| pl          | Polish           |          |
| ar          | Arabic           |          |
| ee          | Estonian         |          |
| ko          | Korean           |          |
| tr          | Turkish          |          |
| uk          | Ukrainian        |          |
| is          | Icelandic        |          |

## Live Example
---------------
I have created an [example](https://www.webpackbin.com/bins/-KpBRW5ApXMKlUxne80q) vue webapp (documentation [here](https://github.com/Artistan/vuejs-range-datepickers#readme)), demonstrating this range date selector via simple vue app.


## TODOs
---------------
- allow minimum-duration to be and array of dates with a duration
- get more feedback!


## Contributions
---------------
All contributions are welcome: use-cases, documentation, code, patches, bug reports, feature requests, etc. You do not need to be a programmer to speak up!

## version changes
v1.0.0
 - start date is no longer restricted by end date.
 - can disable an array of dates `:disable-dates`
 - defaults to not allow overlapping disabled dates `:no-overlap`
 - defaults to `:end-plus="1"` which adds this value to end date if the overlapping forces the end-date to change
 - `:default-disabled-dates` is the datepicker 'disabled' option for both of the range pickers. this allows for setting max (from), min (to), and dates (disabled individual dates)  that can be modified by parent components


v1.2.0
 - removed end-plus , changed to minimum-duration
 - other date restrictions based on minimum-duration and disabled-dates...
