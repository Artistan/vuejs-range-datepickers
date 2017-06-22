vuejs-range-datepickers
=============

Component utilizing VueJS-Datepicker for a Data Range Select for VueJs.

## Installation
---------------
###npm
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
I have created an [example](https://www.webpackbin.com/bins/-KnCcSqurk2HvNhg3Rj2) vue webapp (documentation [here](https://github.com/Artistan/vuejs-range-datepickers#readme)), demonstrating this range date selector via simple vue app.


## TODOs
---------------
- get feedback!


## Contributions
---------------
All contributions are welcome: use-cases, documentation, code, patches, bug reports, feature requests, etc. You do not need to be a programmer to speak up!