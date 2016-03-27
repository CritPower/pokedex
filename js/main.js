$(function () {

    $(document).ready(function () {
        var pokemonContainer = {
            page: 0,
            itemsPerPage: 12,
            block: $(".pokemons-container")
        }

        $("#btn-loader").on("click", loadMorePokemons);
        $(".pokemons-container").on("click", ".pokemon-item", function () {
            var id = $(this).data("id");

            var pokemonPromise = getPokemon(id);

            pokemonPromise.done(function (data) {
                data.movesCount = data.moves.length;
                getTemplate("selected-pokemon").done(function (html) {
                    var rendered = Mustache.render(html, data);
                    $(".selected-pokenmon-container").empty();
                    $(".selected-pokenmon-container").append(rendered);
                });
            })
        });

        function loadPokemonDescription() {

        }

        function loadMorePokemons() {
            $("#btn-loader").hide();
            var amount = pokemonContainer.itemsPerPage;
            var skip = pokemonContainer.page * pokemonContainer.itemsPerPage;
            var pokemonPromise = getPokemons(amount, skip);

            pokemonPromise.done(function (data) {
                getTemplate("pokemon-item").done(function (html) {
                    var rendered;
                    for (var i = 0; i < data.objects.length; i++) {
                        rendered = Mustache.render(html, data.objects[i]);
                        $(".pokemon-items").append(rendered);
                    }
                    pokemonContainer.page++;
                    $("#btn-loader").show();
                });
            });
        }

        function initPage() {
            $("#btn-loader").hide();
            var amount = pokemonContainer.itemsPerPage;
            var skip = pokemonContainer.page * pokemonContainer.itemsPerPage;
            var pokemonPromise = getPokemons(amount, skip);

            pokemonPromise.done(function (data) {
                getTemplate("pokemon-item").done(function (html) {
                    var rendered;
                    for (var i = 0; i < data.objects.length; i++) {
                        rendered = Mustache.render(html, data.objects[i]);
                        $(".pokemon-items").append(rendered);
                    }
                    pokemonContainer.page++;
                    $("#btn-loader").show();
                });
            });
        }

        function getTemplate(templateName) {
            return $.get({
                url: "/templates/" + templateName + ".html",
                _: (new Date()).getTime()
            });
        }

        function getPokemons(amount, skip) {
            return $.ajax({
                url: "http://pokeapi.co/api/v1/pokemon/",
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
                url: "http://pokeapi.co/api/v1/pokemon/" + id,
                type: "GET"
            });
        }

        initPage();
    });

}());