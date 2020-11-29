## Intro

This project is an online coding envirment that allows user to run python code online and store/retrive their submissions.

## How to run the application

The project is deployed on AWS, you can try the application online [here](http://ec2-18-224-108-229.us-east-2.compute.amazonaws.com:3000).

You can also clone this github repository to your local environment, and run:

### `npm install`

to install all dependencies.

After installing all dependencies, run:
### `npm start`
It runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

However, users must create their own secret files which contains database access key.

## Application Features

### Running Python Code

The application uses [ACE Editor](https://ace.c9.io), user can type python code in the editor, and click run button to see the result.

The code is evaluated using a support program that runs on AWS Lambda.

### Register/Login

The Application provides user registration and authentication, user can register their account on the login page page.

### View Submission History

Users can view their submission histroy after logged in.

