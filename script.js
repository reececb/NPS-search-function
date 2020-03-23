'use-strict'
const apiKey = 'UMtDobIqOKVxyenpyKARbb1HZWlmOvxcfeCafKsW';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

 function formatQueryParams(params) {
   const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
 }
 function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      <p>${responseJson.data[i].description}</p>
      </li>`
      );
    }
};

function getNews(query, maxResults = 10, state) {
  const params = {
    q: query,
    stateCode: state,
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#js-error-message').hide();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    const searchState = $('#js-state').val();
    getNews(searchTerm, maxResults, searchState);
  });
}

$(watchForm);