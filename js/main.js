$(function () {

    $(document).ready(function () {
        var pokemonContainer = {
            page: 0,
            itemsPerPage: 12,
            block: $(".pokemons-container")
        }

        $("#btn-loader").on("click", loadMorePokemons);
        $(".pokemons-container").on("click", ".pokemon-item", loadPokemonDescription);

        function loadPokemonDescription(pokemonId) {
            var id;
            if (pokemonId.type !== undefined) {
                var id = $(this).data("id");
            }
            else {
                id = pokemonId;
            }

            var pokemonPromise = getPokemon(id);

            pokemonPromise.done(function (data) {
                data.movesCount = data.moves.length;
                getTemplate("selected-pokemon").done(function (html) {
                    var rendered = Mustache.render(html, data);
                    $(".selected-pokenmon-container").empty();
                    $(".selected-pokenmon-container").append(rendered);
                });
            })
        }

        function loadMorePokemons() {
            $("#btn-loader").hide();
            var amount = pokemonContainer.itemsPerPage;
            var skip = pokemonContainer.page * pokemonContainer.itemsPerPage;
            var pokemonPromise = getPokemons(amount, skip);

            pokemonPromise.done(function (data) {
                getTemplate("pokemon-item").done(function (html) {
                    var rendered;
                    for (var i = 0; i < data.results.length; i++) {
                        var pokemonPromise = getPokemon(data.results[i].name);
                        pokemonPromise.done(function (data) {
                            rendered = Mustache.render(html, data);
                            $(".pokemon-items").append(rendered);
                        })
                    }
                    pokemonContainer.page++;
                    $("#btn-loader").show();
                });
            });
        }

        function success(data) {
            console.log(data);
        }

        function initPage() {
            $("#btn-loader").hide();
            var amount = pokemonContainer.itemsPerPage;
            var skip = pokemonContainer.page * pokemonContainer.itemsPerPage;
            var pokemonPromise = getPokemons(amount, skip);

            pokemonPromise.done(function (data) {
                loadPokemonDescription(data.results[0].name);
                getTemplate("pokemon-item").done(function (html) {
                    var rendered;
                    for (var i = 0; i < data.results.length; i++) {
                        var pokemonPromise = getPokemon(data.results[i].name);
                        pokemonPromise.done(function (data) {
                            rendered = Mustache.render(html, data);
                            $(".pokemon-items").append(rendered);
                        })
                    }
                    pokemonContainer.page++;
                    $("#btn-loader").show();
                });
            });
        }

        function getTemplate(templateName) {
            return $.get({
                url: "./templates/" + templateName + ".html",
                _: (new Date()).getTime()
            });
        }

        function getPokemons(amount, skip) {
            return $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/",
                type: "GET",
                dataType: "json",
                data: {
                    limit: amount,
                    offset: skip
                }
            });
        }

        function getPokemon(id) {
            return $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/" + id,
                type: "GET"
            });
        }

        initPage();
    });

}());
