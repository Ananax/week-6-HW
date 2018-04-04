$(document).ready(function(){

    var topics = ["Hodor", "Khaleesi", "Tyrion Lannister", "Jon Snow"];

    function giphytime(){

    var input = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";   
        // Ajax Request
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {
            console.log(response);
            for(var i = 0; i < limit; i++) {    

                var Divgif = $("<div>");
                    Divgif.addClass("float");
                
                var image = $("<img>");
                    image.attr("src", response.data[i].images.original_still.url);
                    image.attr("data-still", response.data[i].images.original_still.url);
                    image.attr("data-animate", response.data[i].images.original.url);
                    image.attr("data-state", "still");
                    image.attr("class", "gif");
                    Divgif.append(image);

                var rating = response.data[i].rating;
                
                var Rating = $("<p>").text("Rating: " + rating);
                    Divgif.append(Rating)

                $("#display-images").prepend(Divgif);
            }
        });
    }

    function renderButtons(){ 

        $("#gif-area").empty();

        for (var i = 0; i < topics.length; i++){

            var button = $("<button>") 
                button.attr("id", "input")  
                button.attr("data-name", topics[i]); 
                button.text(topics[i]); 
            $("#gif-area").append(button); 
        }
    }

    function stillanimate() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#pressButton").on("click", function(){

        var input = $("#user-input").val();
            form.reset();
            topics.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", giphytime);
    $(document).on("click", ".gif", stillanimate);
});