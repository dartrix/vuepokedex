var app = new Vue({
  el: '#app',
  data: {
    pokemon:'missingno',
    sprite:{ "front_default": 'http://24.media.tumblr.com/5c105ca160b48f8e14ed74f8ca2fe9e1/tumblr_mp15qnwFRR1qey76no1_400.gif'},
    searching: '',
    types:[ {"type": { "name": "none" } },{"type": { "name": "none" } } ],
    abilities: [ {"ability": { "name": "none" } },{"ability": { "name": "none" } } ],
    stats: [ {"stat": { "name": "none" } },{"stat": { "name": "none" } } ],
    moves: [ {"move": { "name": "none" } },{"move": { "name": "none" } } ]
  },
  watch: {
   pokemon: function() {
     this.sprite = {front_default:'http://24.media.tumblr.com/5c105ca160b48f8e14ed74f8ca2fe9e1/tumblr_mp15qnwFRR1qey76no1_400.gif'}
       if (this.pokemon.length >= 2) {
         this.lookuppokemon()

       }
     }
   },
  methods: {
    lookuppokemon: _.debounce(function() {
        var app = this
       app.searching = 'Searching...';
      axios.get('https://pokeapi.co/api/v2/pokemon/' + app.pokemon.toLowerCase(), {
	headers: {
	  'Access-Control-Allow-Origin': '*'}})
            .then(function (response) {
              app.searching = '';

              app.types = response.data.types;
              app.abilities = response.data.abilities;
              app.stats = response.data.stats;
              app.moves = response.data.moves;
              app.sprite = response.data.sprites;

            })
            .catch(function (error) {
              app.searching = "Pokemon Not Found!";

            })

    }, 1500)
  }
})
