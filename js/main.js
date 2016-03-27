(function () {

    var pokemonPromise = getPokemons(12);

    pokemonPromise.done(function (data) {
        console.log(data);
        getTemplate("pokemon-item").done(function (html) {

            var rendered;
            var pokemonContainer = $(".pokemons-container");
            for (var i = 0; i < data.objects.length; i++) {
                rendered = Mustache.render(html, data.objects[i]);
                pokemonContainer.append(rendered);
            }
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