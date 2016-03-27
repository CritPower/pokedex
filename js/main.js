$(function () {

    $(document).ready(function () {
        var pokemonContainer = {
            page: 0,
            itemsPerPage: 12,
            block: $(".pokemons-container")
        }

        $("#btn-loader").on("click", loadMorePokemons);

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

        initPage();
    });

}());