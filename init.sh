#ensure path to mongo and mongod executables are set in environment
mongo
use healthera
db.users.insert({firstName: "Mohit", lastName: "Sorde", emailId: "mohit@mohit.com", password: "test1234"})
show dbs 