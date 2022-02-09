// Google maps API - Search & Place
function getInput(tagID) {
    var el = document.getElementById(tagID);
    searchLocation(el.value);
}
function searchLocation(location) {
    // Default searchString
    var search = {
        zoom: 2,
        query: 'italy',
        activeType: 'search',
    };
    // Input searchString
    if (location.length > 0) {
        search.zoom = null;
        search.query = location.replace(' ', '+');
        search.activeType = 'place';
    }
    console.log('LOCATION CLICKED: ', location);
    // API params
    var apiUrl = 'https://www.google.com/maps/embed/v1/';
    var key = 'AIzaSyDWQ0yrNgu13dnFfZ6NARvoOrUIeQa2E1U';
    var zoomQuery = search.zoom ? ('&zoom=' + search.zoom): '';
    var searchString = apiUrl + search.activeType + '?q=' + search.query + '&key=' + key + zoomQuery;
    maps.setAttribute('src', searchString);
    // Scroll to top
    window.scroll({
        top: 80,
        left: 0,
        behavior: 'smooth'
    });
};

searchLocation(''); // '' as default value;