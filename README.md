# FrontEnd-Take-Home_Exercise

This basic React Application allows a user to input data into a form which then will be sumbitted onto an API endpoint.

## Functionality of the Application
---
The React App contains two pages with two url routes being the home page and the success page. This was done by using the react-router-dom which allowed the creation of the two 'routes'.

The Home Page offers the form which provides input for name, email, password, occupation, and state.

For the three initial form inputs they are basic in the sense that they allow the user to type their inputs whereas the last two are select where the user is given occupation and states to choose from via drop down list. For the last two inputs the options provided are from the API endpoint.

The form is only able to be submitted if the user provided inputs for all the fields. I created a validation which iterated through the react state objects checking to see if any of them are empty strings, when the submit is triggered. In the situation where that is the case, we inform the user that the form is incomplete via text which disappears after a couple seconds. 

In the situation where all the inputs are filled and the submit is triggered we send our data from the form onto the api endpoint via POST.If successful we are then taken to a success page showing that we have successfully completed the form and after a few seconds are redirected back onto the home page.




## Improvements
-----
Given the nature of the exercise, I focused heavily on providing the functionality for submission of the form but one thing that certainly needs improvement is the UI of the webpage.  

Definately refactor code to make much more clean would be another thing to potentially improve on.