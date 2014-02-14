answerjs
========

AnswerJS is a framework to allow novice users to quickly and easily build complex queries.

Components:
- UI Widgets:
  - Answer Field Picker: Display the available fields to the user to be dragged and dropped onto other widgets.
  - Answer Field List: Build a list of fields to be returned.
  - Answer Criteria List: Build a list of criteria.
  - Answer Query Description: Display an English language representation of the query.
  - Answer Results: Display the results of the query.
  - Answer Save Dialog: Edit the query metadata attributes for saving.
  - Answer Query Browser: Browse a list a saved queries and choose one to load.
  
- Backend:
  - Query Compiler: Compiles the query into an executable form that can be executed by the Query Execution Engine.
  - Query Execution Engine: Takes a compiled query, executes it, and returns the results as JSON.
  - Query Persistance: Save and load query models.
  

  
