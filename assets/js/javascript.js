$(document).ready(function() {
    console.log("ready!");

    var topics = ['IPA', 'Lager', 'Amber', 'Pilsner', 'Wheat'];

    function showButtons() {

    	$('#all-topic-buttons').empty();
	    
	    for (var i = 0; i < topics.length; i++) {
	    	// var topicText = topics[i];
	    	var topicButtons = $('<button>');
	    	topicButtons.text(topics[i]);
	    	$('#all-topic-buttons').append(topicButtons);
	    	topicButtons.addClass('buttons');
	    	topicButtons.attr('data-attribute',topics[i]);
	    	console.log(topics[i]);
	    }
	}

	showButtons();

    $('#new-topic-button').on('click', function(event) {
    	event.preventDefault();
    	$('#gifs-go-here').empty();
    	var newTopic = $('#new-topic').val();
    	topics.push(newTopic);
    	console.log(newTopic);
    	console.log(topics)
    	showButtons();
    });

    $(document).on('click', ".buttons", function() { // this can be $(document).on('click'... as well)
    	$('#gifs-go-here').empty();
 		var topicText = $(this).attr('data-attribute');
 		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + encodeURIComponent(topicText) + '&api_key=dc6zaTOxFJmzC&limit=10';
	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {

	    	var results = response.data;
	    	console.log(results);
	   		
	   		for (var j = 0; j < results.length; j++) {

	            var gifDiv = $('<div>');
	            var rating = results[j].rating;
	            // console.log(rating);
	            var ratingDiv = $('<div>').text('Rating: ' + rating);
	            var topicImage = $('<img>');
	            topicImage.addClass('gif');
	            topicImage.attr({'src':results[j].images.fixed_height_still.url, 'data-state': 'still',});
	            gifDiv.prepend(topicImage);
	            gifDiv.prepend(ratingDiv);
	            $('#gifs-go-here').prepend(gifDiv);
        	}
	    });
	});
});






