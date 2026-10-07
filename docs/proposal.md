## Problem and Users

Most people tend to watch multiple tv shows at a time and you can have trouble keeping track of all the shows they are watching as well as what episode they are on, considering that we know have multiple different 
streaming services as well as weekly cable tv. WatchList will make it easier for users to track all this data by allowing them to track what shows they are currently watching, what episode they are on, as well as what 
shows they have finished, the users will also be able to leave ratings on these shows. The main users of this would be people who tend to watch multiple tv shows at once, keeping up with new releases across multiple 
different streaming services and weekly airings of shows. This will allow them to track everything they are watching in organized way, as well keep track of how close they are to finish a show, and rate the ones that 
they have completed. 

## Features/MVP

1. TV show search functionality using the API 

2. Add shows to a list for currently watching 

3. tracker for the current season and episode of a show

4. Mark a completed show as watched and add a show to a watch later list 

5. 1-5 star ratings

6. add/remove and edit a watchlist 

7. sorting shows by rating 

## Data Model Draft

  ## Users
    ID - a unique number for each user 
   
    Username - name used to login 
   
    Email - the users email

  ## Show 
    ID - unique number for each show

    Title - title of show 

    Description - about the show 

    Image url - image for the show 

    Genre - the category of show 

    Number of seasons - how many seasons the show has 

  ## Watchlist 
    User ID - shows which user added the show
   
    Show ID - shows which tv show the item is for 
   
    Current season - season the user is on 
   
    Current episode - episode the user is on 
   
    Rating - rating for the show 

  ## Relationships
    One user can have many shows on their watchlist 
   
    One watchlist item belongs to one user 
   
    One show can be in many users watchlists
   
    User id connects watchlist to the user 
   
    Show id connects the watchlist to the show 


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

## endpoint list
### Watchlists

| Method | Path | What it does | Success | Errors |
|---|---|---|---|---|
| GET | `/api/watchlists` | Gets all watchlists | 200 | 401, 500 |
| GET | `/api/watchlists/:id` | Gets one watchlist | 200 | 401, 404, 500 |
| POST | `/api/watchlists` | Creates a watchlist | 201 | 400, 401, 500 |
| PUT | `/api/watchlists/:id` | Updates a watchlist | 200 | 400, 401, 404, 500 |
| DELETE | `/api/watchlists/:id` | Deletes a watchlist | 204 | 401, 404, 500 |

### Watchlist Items

| Method | Path | What it does | Success | Errors |
|---|---|---|---|---|
| GET | `/api/watchlist-items` | Gets all saved shows | 200 | 401, 500 |
| GET | `/api/watchlist-items/:id` | Gets one saved show | 200 | 401, 404, 500 |
| POST | `/api/watchlist-items` | Adds a show to a watchlist | 201 | 400, 401, 409, 500 |
| PUT | `/api/watchlist-items/:id` | Updates show progress, status, rating, or notes | 200 | 400, 401, 404, 500 |
| DELETE | `/api/watchlist-items/:id` | Removes a show from the watchlist | 204 | 401, 404, 500 |

### External API Search

| Method | Path | What it does | Success | Errors |
|---|---|---|---|---|
| GET | `/api/search/shows?q=:title` | Searches TVmaze for shows | 200 | 400, 429, 500, 502 |
