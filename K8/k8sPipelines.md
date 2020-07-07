# Pipeline

For a pipeline specific to a project we need to have 2 repositories:

* **Project** - contains the following

    * actual project with the default structure used in new x applications : Api, Application, Domain , Infrastructure and Tests 

    * **.Jenkinsfile** - settings related to jenkins flow : sonarqube, unitTests, deploy automatically on live etc.

    * **.Dockerfile** - docker image used, application entry point and other settings for the docker

* **Chart**

    * contains yaml files with docker specific information related to deployment, services etc.

These split was made in order to keep infrastructure related configuration separate to avoid building whole app when this is not needed. 

After we have above 2 repositories created we can proceed with setting each of them up. We can use as a starting point the projects created for x Booking Search API X.

These split was made in order to keep infrastructure related configuration separate to avoid building whole app when this is not needed. 

After we have above 2 repositories created we can proceed with setting each of them up. We can use as a starting point the projects created for x Booking Search API X.
## 1. Main project configuration

 

You can use the x API Starter template which can be found here: 

api-starter EXAMPLE - Connect to preview or do it manually by following the next steps.

 

a) Create a branch from first commit made on x-booking-search-api-X and copy the project files in our new project folder.

b) Start renaming solution and all namespaces corresponding to our new project naming. In bellow example we have changed all project names from X.Booking.Search.X.Api to X.X.Availability.Api

    Very important : 

    Don’t change the structure of the project

    Don’t create additional Tests projects cause this will break the pipeline for tests executions. You can structure your tests in the current one by creating different folders for Integration Tests, Unit Tests etc.

c) Edit .Jenkins file and add new project values which will be used to configure Jenkins pipeline

d) Edit .Dockerfile and add new project values. Mainly the changes here are related to new project file names. 

 
## 2. Chart project configuration

a) Create a branch from first commit made on -booking-search-api-X-chart and copy the project files in our new project folder.

b) Go through all files and change the names and settings to correspond to new project

c) Rename the files values.mallorca.dev-yaml and values.sweeden-live.yaml with server names in which the new project will be deployed.

3. Create ticket in Platform Engineering
Create a ticket in Platform Engineering project to create pipeline in Jenkins, ArgoCD and Sonarqube with bellow specifications: 

        -repositories for above created projects
        -namespace