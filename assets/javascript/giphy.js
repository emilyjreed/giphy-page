var tvShows = ["The Office", "Archer", "Parks and Recreation", "Bob's Burgers", "Friends"];

function displayGiphyImages() {
    var show = $(this).attr("data-show");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        $(this).data("show") + "&api_key=F7N29iBpxvGva62UI6K5nNANg5QteRhH&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            $(".show").empty();
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var figcap = $("<figcaption>").text("Rating: " + results[i].rating.toUpperCase());
                var figure = $("<figure class='show'>");
                var showImage = $("<img>");
                showImage.addClass("gif");
                figure.addClass("float-left");
                showImage.attr("src", results[i].images.fixed_height_still.url);
                showImage.attr("data-still", results[i].images.fixed_height_still.url);
                showImage.attr("data-animate", results[i].images.fixed_height.url);
                showImage.attr("data-state", "still");
                figure.append(showImage, figcap);
                $("#main-content").append(figure);
            }
        });
};

function renderButtons() {
    $("#show-view").empty();

    for (var i = 0; i < tvShows.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-light newShow");
        a.attr("data-show", tvShows[i]);
        a.text(tvShows[i]);
        $("#show-view").append(a);
    };
};

$("#add-show").on("click", function (event) {
    event.preventDefault();
    var tvShow = $("#show-input").val().trim();
    tvShows.push(tvShow);
    renderButtons();
});

$(document).on("click", ".newShow", displayGiphyImages);

renderButtons();

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

