## External API

We will use the TVmaze API to search for TV shows and retrieve show information.

Documentation:
https://www.tvmaze.com/api

The TVmaze public API does not require an API key.

TVmaze allows at least 20 requests every 10 seconds per IP address. If the limit is exceeded, the API may return HTTP 429 Too Many Requests.

TVmaze data is provided under a CC BY-SA licence, so our app will credit TVmaze as the source of the TV show information.

This API will be used for the show search feature. The React frontend will send a search request to our Express server, and the Express server will request the show data from TVmaze.

Example request:

https://api.tvmaze.com/search/shows?q=stranger%20things

[
  {
    "show": {
      "id": 2993,
      "name": "Stranger Things",
      "genres": [
        "Drama",
        "Horror",
        "Science-Fiction"
      ],
      "status": "Ended",
      "premiered": "2016-07-15",
      "rating": {
        "average": 8.4
      },
      "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/595/1489169.jpg"
      },
      "summary": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
    }
  }
]