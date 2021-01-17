# Functional Javascript 

## Description

This is my version of the Udacity Intermediate Javascript Nano Degree Functional Project.

This project does the following:

* Allows user to select Nasa Rover of Interest
* Loads Rover info and photos for user from Nasa Api

---

## Highlights/Features

My solution to this project utilizes the following:

* React like Vanilla JS App - Utilizing functional techniques and component code for ui.

* Functional Techniques

  * Pure functions / no side effects (1x state / 1x render functions = only exceptions)
  * Utilizes HOF (Higher Order Function) array methods: map and reduce
  * Utilizes the ImmutableJS library
  
* Backend code:

  * Uses Node/Express server intermedary for front end and Nasa api
  * Hides sensitive info from plublic view (in .env)
  
* Responsive design with flex box

  * Number of Columns of photos varies by screen size


---

## API Setup

A NASA Api key is required to use this app.  Please following the following steps to get an API key and configure this app to use your key.

* Visit https://api.nasa.gov/
* Click "Get Started" > Fill in required info > Click "Signup"
* You will receive an API key in the e-mail you sign up with above.
* In the application code, update the API_KEY value in the .env with your API key.
* You should now be able to successfully run the application.

