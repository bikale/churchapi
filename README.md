# churchapi

> Backend api for church app
> check it here [https://eotcchurch.herokuapp.com/](https://eotcchurch.herokuapp.com/)

## Technology Used

- NodeJs
- mongoDB
- expressJs

## Security

- Authentication done by using JWT/cookies
- Encrypt passwords
- Prevent cross site scripting
- XSS- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param pollution
- Use cors

## Basic public api

> get bible verses [https://eotcchurch.herokuapp.com/api/v1/church/bibleverses](https://eotcchurch.herokuapp.com/api/v1/church/bibleverses)
> get single bible verse with id [https://eotcchurch.herokuapp.com/api/v1/church/bibleverse/2](https://eotcchurch.herokuapp.com/api/v1/church/bibleverse/2)
