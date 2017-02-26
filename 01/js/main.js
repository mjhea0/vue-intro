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
