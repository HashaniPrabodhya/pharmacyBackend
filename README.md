# WireApps_Backend
1. clone the repositery by using following command 
     git clone <repository_url>
     cd <project_directory>

2. Install the required dependencies.Type below command
     npm install
3. If you haven't created database file create using below command
     touch <databasename.db>

4. Run your node app using following command\
    node app.js
5. now you can see in your terminal server running message and the port .
6. next to test the api endpoints use postman or any othe tool\
   -to test the registration use below endpoint\
       'POST http://localhost:3000/auth/register' \
   -to test the login \
       'POST http://localhost:3000/auth/login' 
   
   get the jwt token got from the login response and use the jwt token in the 'Authorization' header for the subsequent request that require aunthontication. Test subsequent request as follow,  

    Medication Records:

      .Query All Medication Records: GET http://localhost:3000/medication-records 
   
      .Insert Medication Record: POST http://localhost:3000/medication-records \
           Body (JSON): { "name": "Medicine A", "description": "Description A", "quantity": 100 } \
      .Update Medication Record: PUT http://localhost:3000/medication-records/1 \
          Body (JSON): { "name": "Updated Medicine A", "description": "Updated Description A", "quantity": 150 } \
      .Delete Medication Record: DELETE http://localhost:3000/medication-records/1 \
      .Soft Delete Medication Record: PUT http://localhost:3000/medication-records/soft-delete/1 

   Customer Records: 
    
      .Query All Customer Records: GET http://localhost:3000/customer-records  
      .Insert Customer Record: POST http://localhost:3000/customer-records \
          Body (JSON): { "name": "Customer X", "email": "customer_x@example.com" } \
      .Update Customer Record: PUT http://localhost:3000/customer-records/1 \
          Body (JSON): { "name": "Updated Customer X", "email": "updated_customer_x@example.com" } \
      .Delete Customer Record: DELETE http://localhost:3000/customer-records/1 \
      .Soft Delete Customer Record: PUT http://localhost:3000/customer-records/soft-delete/1    

   In here based on the user role they can do their operation. If user not previledge to do the relavant operattion it will show the error message relavent to the operation.likewise you can login as an Owner,     
   Manager and cashier and check the accessability of the operations.
