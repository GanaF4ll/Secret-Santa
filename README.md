Secret Santa
Description
Secret Santa application managing users (CRUD), groups, and invitations for a secret santa.

Installation
"dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "nodemon": "^3.0.2",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
}

Configuration
Create a .env file with the following content:
JWT_KEY=AZERTYUIOP

Documentation
Access the API documentation at http://localhost:3000/api-docs/#/ once the project is launched.

Author
Gana Fall

Project Status
In development

Areas for Improvement
The invitation creation uses user_id instead of user_email because the email can be changed (which could cause some problems I think), but not the ID.
Add a controller to send invitations to a user using their email instead of their ID.
If the email is not specified in the user table, the controller creates the user with the provided email.