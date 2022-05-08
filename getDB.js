let MongoClient = require('mongodb').MongoClient;

let todaydate = new Date("2022-05-06");

async function getDB(){

    const uri = "mongodb://localhost:27017/contacts";

const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect ();
        // Make the appropriate DB calls
        record = await contactList(client);
        return record;
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
async function contactList(client){
    let query = { birthday: todaydate}
    list = await client.db("contact").collection("contacts").find(query).toArray();
    return list;
};

module.exports = getDB(); 