var apiKey = ''
var storedLocation = JSON.parse(localstorage.getItem('city')) || [];

$(document).ready(function) {
    $('#searchButton').on('click', function(){
        var searchValue = $('#searchBar').val();

        console.log(searchValue)
        
    });
}