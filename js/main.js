(function () {

    var pokemonPromise = getPokemons(12);

    pokemonPromise.done(function (data) {
        console.log(data);

        var view = {
            name: "test name"
        }

        var html = $.get("templates/pokemon-item.html");

        var rendered = Mustache.render(html, view);

        var pokemonContainer = $(".pokemons-container");
        pokemonContainer.append(rendered);
    });

    function getPokemons(amount) {
        return $.ajax({
            url: "http://pokeapi.co/api/v1/pokemon/",
            type: "GET",
            dataType: "json",
            data: { limit: amount }
        });
    }
}());