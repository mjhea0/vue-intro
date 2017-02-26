# VueJS Intro

> **NOTE:** This tutorial uses Vue version 2.1.10.

## Getting Started

Start by creating a new HTML page called *index.html* and pulling in Vue from a CDN:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Vue Intro</title>
  </head>
  <body>
    <script type="text/javascript" src="https://unpkg.com/vue@2.1.10/dist/vue.js">
    </script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
```

Next, add a `div` tag with an `id` of `app` to the `body`:

```html
<div id="app"></div>
```

Add a file called *main.js* to a new folder called "js":

```javascript
var app = new Vue({
  el: '#app'
});
```

This creates a new Vue instance, which is bound to the DOM element via the CSS selector. Vue is now aware of anything that we add to the `div` tag.

### Data Binding

We can use the `v-model` directive to obtain user input.

*index.html*:

```html
<div id="app">
  <p>Enter a greeting: <input type="text" v-model="greeting"></p>
  <p>{{ $data }}</p>
</div>
```

*main.js*:

```javascript
var app = new Vue({
  el: '#app',
  data: {
    greeting: 'Welcome!'
  }
});
```

Try this out.

The value of the input is now bound to the `greeting`. So, when you update the input, you should see the text update as well. Notice how we used a property called `$data` to display the actual `data object.`

### Event Handling

The `v-on` directive is used for handling events.

Add a new input box along with a button to your HTML page:

```html
<div id="app">
  <p>Enter a greeting: <input type="text" v-model="greeting"></p>
  <br>
  Enter your name: <input type="text" v-model="name"> <button v-on:click="sayHello">Hey there!</button>
  <br><br>
  <p>All Data:</p>
  <p>{{ $data }}</p>
</div>
```

Then add the `sayHello` method and the `name` to our Vue instance:

```javascript
var app = new Vue({
  el: '#app',
  data: {
    greeting: 'Welcome!',
    name: ''
  },
  methods: {
    sayHello: function() {
      alert('Hey there, ' + this.name);
    }
  }
});
```

Try it out.

You can also use a shorter version with the `@`. Simply update:

```html
<button v-on:click="sayHello">Hey there!</button>
```

to:

```html
<button @click="sayHello">Hey there!</button>
```

### Conditionals

Vue makes handling conditional logic simple with the `v-if` and `v-show` directives.

Start by creating a new instance of Vue:

```javascript
var app2 = new Vue({
  el: '#app2',
  data: {
    value: false
  },
  methods: {
    click: function() {
      this.value = !this.value;
    }
  }
});
```

> **NOTE:** `this` refer to the instance, `app2`.

Mount it to the DOM:

```html
<div id="app2">
  <button @click="click">Click</button>
  <div v-if="value">
    <p>Yay!</p>
  </div>
  <div v-else>
    <p>Nay!</p>
  </div>
</div>
```

Try this out.

### Loops

`v-for` is used for rendering lists. Create a new Vue instance for this:

```javascript
var app3 = new Vue({
  el: '#app3',
  data: {
    dogs: [
      { name: 'Hank', age: 2 },
      { name: 'Fred', age: 5 },
      { name: 'Ann', age: 3 }
    ]
  }
});
```

Mount it to the DOM:

```html
<div id="app3">
  <ul>
    <li v-for="dog in dogs">
      {{ dog.name }} - {{ dog.age }}
    </li>
  </ul>
</div>
```

Want to grab the index value? Update the `li` like so:

```html
<li v-for="(dog, index) in dogs">
  {{ index }} - {{ dog.name }} - {{ dog.age }}
</li>
```

## Components

Components are used to encapsulate reusable code. Create new HTML and JS files.

HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Vue Components</title>
  </head>
  <body>
    <div id="app">
      <p>{{ test }}</p>
    </div>
    <script type="text/javascript" src="https://unpkg.com/vue@2.1.10/dist/vue.js">
    </script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
```

JavaScript:

```javascript
var app = new Vue({
  el: '#app',
  data: {
    test: 'Sanity Check!',
  }
});
```

Use `Vue.component()` to create a new component, which takes two properties - components name and options. The latter is similar to the properties we used in the `Vue()` constructor. Add the following to the JavaScript file above the constructor.

```javascript
Vue.component('greeting', {
  template: '<h1>Welcome!</h1>'
});
```

To use this components, add the `<greeting></greeting>` element. Test this out. Essentially, the value of the template property replaces the `<greeting></greeting>` element.

If you have more HTML, you can use the HTML5 template tag, which does not render on page load:

```html
<template id="greeting-template">
  <h1>Welcome!</h1>
</template>
```

Update the JavaScript:

```javascript
Vue.component('greeting', {
  template: '#greeting-template'
});
```

### Props

Each component has it's own isolated scope, in order for child components to get access to a parent component's data you have to use props.

Add the props as a property:

```javascript
Vue.component('greeting', {
  template: '#greeting-template',
  props: ['message']
});
```

This component now expects to receive a `message` from it's parent.

Update the template:

```html
<template id="greeting-template">
  <h1>{{ message }}</h1>
</template>
```

Then add a `message` attribute:

```html
<greeting message="Testing"></greeting>
```

You can also add validation to the props like so:

```javascript
Vue.component('greeting', {
  template: '#greeting-template',
  props: {
    message: {
      type: String,
      required: true
    }
  }
});
```

Let's look at another example - a blog post. Update the `data` property:

```javascript
data: {
  test: 'Sanity Check!',
  author: 'Michael Herman',
  title: 'Some cool title',
  content: 'Lots of content'
}
```

Add a new template:

```html
<template id="post-template">
  <div>
    <h1>{{ title }}</h1>
    <h4>{{ author }}</h4>
    <p>{{ content }}</p>
  </div>
</template>
```

Add a new component:

```javascript
Vue.component('post', {
  template: '#post-template',
  props: ['title', 'author', 'content']
});
```

Add the component to the page:

```html
<post :title="title" :author="author" :content="content"></post>
```
