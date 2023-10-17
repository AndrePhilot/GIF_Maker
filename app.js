console.log("Let's get this party started!");

$('#search-form').on('submit', function(e) {
    e.preventDefault();

//Animates the magnifying glass when a search is made
    $('#search-icon').addClass('fa-beat');
    setTimeout(function() {
        $('#search-icon').removeClass('fa-beat');
    }, 500);

//Calls the function that matches the term with a GIF
gifSearch($('#search-input').val());
//Cleans up the search input area
$('#search-input').val("");
});

$('#remove-button').on('click', function(e) {
//Removes any GIF that may exist in the page
$('#gif-list').empty();

//Animates the remove button when clicked
    $('#remove-button').addClass('fa-shake');

    setTimeout(function() {
        $('#remove-button').removeClass('fa-shake');
    }, 500);
});

//Makes a get request to the Giphy API.
//If a GIF is found, the getGifUrl function is triggered
//If a GIF is not found, an alert is returned
async function gifSearch(q) {
    try {
        const response = await axios.get('https://api.giphy.com/v1/gifs/search',
        {params: {
            q, 
            api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}});
        getGifUrl(response);
        console.log(response);
    } catch(error) {
        console.error(error);
        alert('No GIF was found that matches your search');
    }
}

//Extracts the first GIF URL for the searched term
//Triggers the appendGif function
function getGifUrl(response) {
    appendGif(response.data.data[0].images.original.url);
}

//Creates a div column, an img tag and append the latter
//to the first
function appendGif(url) {
    const div = document.createElement('div');
    $(div).addClass('col-4 p-2');
    $('#gif-list').append(div);
    const img = document.createElement('img');
    img.src = url;
    div.append(img);
}