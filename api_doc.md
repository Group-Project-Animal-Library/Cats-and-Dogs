# Cats and Dogs Gallery/Facts

# Cats and Dogs Gallery/Facts App is an application to show you cat and dog's pictures and facts. It performs based on RESTful concept.

This app has :

RESTful endpoint for asset's operation
JSON formatted response

Tech Stack used to build this app :

Node JS
Express JS framework
Axios framework
Bycryptjs framework
Cors framework
Cross-env framework
Google-auth-library
Oath framework
Post-gres framework
Sequelize framework

# Global Responses

These responses are applied globally on all endpoints

Response (400 - Bad Request)
{
"message": "<your message for 400>"
}

Response (401 - Unauthorized)
{
"message": "<your message for 401>"
}

Response (403 - Forbidden)
{
"message": "<your message for 401>"
}

# RESTful endpoints

POST / login <br>
POST / register <br>
POST / loginGoogle

3rd-Party endpoints

GET / catFacts<br>
GET / catImg<br>
GET / dogImg<br>
GET / dogFacts
<br><br>

# POST / login

Check user in database

Request Body
```
{
"name": "<name to get insert into>",
"email": "<description to get insert into>"
}
```
Response (200)
```
{
token :"<access token>"
}
```
<br><br>
# POST / register

Create new user in database

Request Body
```
{
"name": "<name to get insert into>",
"email": "<description to get insert into>"
}
```
Response (200)
```
{
id: "<id user from database>",
email: <email user from database>
}
```
<br><br>
# POST / loginGoogle

Check user in Google database

Request user data in Google database
```
{
"name": "<name to get insert into>",
"email": "<description to get insert into>"
}
```
response(200)
```
{
token: <access_token>,
name: <given_name>,
email: <user_email>
}
```
<br><br>
# ------3rd Party Endpoint-------

# GET / catFacts

Request header
```
{
token: <access_token>,
}
```
response(200)
```
{
data:"<data from API 3rd Party>"
}
```
<br><br>
# GET / catImg

Request header
```
{
token: <access_token>,
}
```
response(200)
```
{
data:"<data from API 3rd Party>"
}
```
<br><br>
# GET / dogImg

Request header
```
{
token: <access_token>,
}
```
response(200)
```
{
data:"<data from API 3rd Party>"
}
```
<br><br>
# GET / dogFacts

Request header
```
{
token: <access_token>,
}
```
response(200)
```
{
data:"<data from API 3rd Party>"
}
```