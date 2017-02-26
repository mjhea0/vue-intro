Vue.component('greeting', {
  template: '#greeting-template',
  props: {
    message: {
      type: String,
      required: true
    }
  }
});

Vue.component('post', {
  template: '#post-template',
  props: ['title', 'author', 'content']
});

var app = new Vue({
  el: '#app',
  data: {
    test: 'Sanity Check!',
    author: 'Michael Herman',
    title: 'Some cool title',
    content: 'Lots of content'
  }
});
