
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $street = $("#street").val();
    var $city = $("#city").val();
    var $state = $("#state").val();
    var city_state = $city + ", " + $state;
    var address = $street + " " + $city + ", " + $state;
    
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '">');
    $greeting.text(address);
    
    //NYT AJAX request
    
    var nytURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city_state + "&api-key=7e3a8f0ed647b0606b020a7fb49c7c02%3A9%3A70648110";
    $.getJSON(nytURL, function(data) {
        $nytHeaderElem.text('Here are New York Times Articles About ' + city_state);
        for (article in data.response.docs) {
            $nytElem.append("<li><a target='_blank' href='" + data.response.docs[article].web_url 
            + "'>" + data.response.docs[article].headline.main 
            + "</a> - " + data.response.docs[article].pub_date.slice(0,4) 
            + "<br><p>" + data.response.docs[article].snippet 
            + "</p></li>");
        }
    }).error(function () {
        $nytHeaderElem.text('Failed to Load New York Times Articles');
    }); 
     
    //Wikipedia AJAZ request
    
    var wikiURL = "http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=" + city_state;
    
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("Failed to get Wikipedia articles");
    }, 8000);
    
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {
            for (article in response[1]) {
                $wikiElem.append("<li><a target='_blank' href='http://en.wikipedia.org/wiki/" + response[1][article] + "'>" + response[1][article] + "</a></li>");
            }
            clearTimeout(wikiRequestTimeout);
        }
    });
    
    
    
        
    

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();


