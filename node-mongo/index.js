const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log("Connected correctly to server");

  const db = client.db(dbname);

  dboper.insertDocument(
    db,
    { name: "Valdonut", description: "Test" },
    "dishes",
    result => {
      console.log("Insert Document:\n", result.ops);

      dboper.findDocuments(db, "dishes", docs => {
        console.log("FOund docs:\n", docs);

        dboper.updateDocument(
          db,
          { name: "Valdonut" },
          { description: "Update test" },
          "dishes",
          result => {
            console.log("Updated document:\n", result.result);
            dboper.findDocuments(db, "dishes", docs => {
              console.log("FOund updated docs:\n", docs);

              db.dropCollection("dishes", result => {
                console.log("Dropped collection\n", result);
              });
            });
          }
        );
      });
    }
  );
});
