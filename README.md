## Snap Link

Modern URL shortening platform that transforms long and complex URLs into short, shareable links in just seconds. With its user-friendly interface and fast processing capabilities, SnapLink helps you keep your web links organized and easily accessible


## Swagger Endpoints

<p align="center">
  <img width="1710" alt="image" src="https://github.com/user-attachments/assets/1921bef5-0123-427f-a434-71923327e342" />
</p>


### Authentication Endpoints

| HTTP Method | Endpoint             | Description           | Request Body           | Response Body            | Status Codes                         |
|-------------|----------------------|-----------------------|------------------------|--------------------------|--------------------------------------|
| `POST`      | `/auth/login`         | Login                 | `LoginDto`             | `AuthResponse`           | 200 OK, 400 Bad Request             |
| `POST`      | `/auth/register`      | Register              | `RegisterDto`          | `UserDto`                | 201 Created, 400 Bad Request        |
| `POST`      | `/auth/refresh-token` | Refresh Token         | `RefreshTokenDto`      | `TokenResponse`          | 200 OK, 400 Bad Request             |

### User Endpoints

| HTTP Method | Endpoint           | Description                        | Request Body            | Response Body         | Status Codes                         |
|-------------|--------------------|------------------------------------|-------------------------|-----------------------|--------------------------------------|
| `GET`       | `/user`             | Get all users                      | N/A                     | `UserDto[]`           | 200 OK                              |
| `GET`       | `/user/:id`         | Get user by ID                     | N/A                     | `UserDto`             | 200 OK, 404 Not Found               |
| `POST`      | `/user`             | Create a new user                  | `UserCreateDto`         | `UserDto`             | 201 Created, 400 Bad Request        |
| `PUT`       | `/user`             | Update an existing user            | `UserUpdateDto`         | `UserDto`             | 200 OK, 400 Bad Request             |
| `DELETE`    | `/user/:id`         | Delete user by ID                  | N/A                     | N/A                   | 204 No Content, 404 Not Found       |
| `PATCH`     | `/user/:id`         | Toggle user status (e.g., active/inactive) | N/A                 | N/A                   | 200 OK, 404 Not Found               |


### URL Endpoints

| HTTP Method | Endpoint                          | Description                                 | Request Body              | Response Body             | Status Codes                         |
|-------------|-----------------------------------|---------------------------------------------|---------------------------|---------------------------|--------------------------------------|
| `GET`       | `/url`                            | Get all short URLs                          | N/A                       | `UrlDto[]`                 | 200 OK                              |
| `GET`       | `/url/:shortUrl`                  | Redirect to the URL with the given short URL | N/A                       | `String` (Redirect URL)    | 302 Found, 404 Not Found            |
| `GET`       | `/url/info/:shortUrl`             | Get information about a URL with the given short URL | N/A               | `UrlInfoDto`               | 200 OK, 404 Not Found               |
| `GET`       | `/url/analytics/:shortUrl`        | Get analytics for the given short URL       | N/A                       | `UrlAnalyticsDto`          | 200 OK, 404 Not Found               |
| `POST`      | `/url/shorten`                    | Create a new short URL                      | `UrlCreateDto`            | `String` (Short URL)       | 201 Created, 400 Bad Request        |
| `DELETE`    | `/url/delete/:shortUrl`           | Delete a short URL by its short URL          | N/A                       | N/A                       | 204 No Content, 404 Not Found       |
| `PATCH`     | `/url/toggle-status/:shortUrl`    | Toggle the status of a short URL (active/inactive) | N/A                    | N/A                       | 200 OK, 404 Not Found               |



## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Compile and run on Docker

```bash
# build
$ docker-compose build

# watch mode
$ docker-compose up

```

