(function () {

    var pokemonPromise = getPokemons(12);

    pokemonPromise.done(function (data) {
        console.log(data);

        var view = {
            name: "test name"
        }

        getTemplate("pokemon-item").done(function (html) {

            var rendered = Mustache.render(html, view);

            var pokemonContainer = $(".pokemons-container");
            pokemonContainer.append(rendered);

        });
    });

    function getTemplate(templateName) {
        return $.get({
            url: "/templates/" + templateName + ".html",
            _: (new Date()).getTime()
        });
    }

    function getPokemons(amount) {
        return $.ajax({
            url: "http://pokeapi.co/api/v1/pokemon/",
            type: "GET",
            dataType: "json",
            data: { limit: amount }
        });
    }
}());