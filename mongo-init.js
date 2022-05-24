
// conn = new Mongo();
// db = conn.getDB("serverMsg")
// db.createUser(
//     {
//         user: "msg",
//         pwd: "123321",
//         roles: [
//             {
//                 role: "readWrite",
//                 db: "serverMsg"
//             }
//         ]
//     }
// );
//
// db.createCollection(
//     'messages',
//     {
//         date: Number,
//         from: String,
//         to: String,
//         message: String,
//     }
// )
//
// db.createCollection( "messages", {
//     validator: { $jsonSchema: {
//             bsonType: "object",
//             required: ["from", "to"],
//             properties: {
//                 from: {
//                     bsonType: "string",
//                     description: "must be a string and is required"
//                 },
//                 to: {
//                     bsonType: "string",
//                     description: "must be a string and is required"
//                 },
//                 message: {
//                     bsonType: "string",
//                     description: "must be a string"
//                 },
//             }
//         } }
// } )
//
// db.messages.createIndex({ "date": 1 }, { unique: false });
//
// db.messages.insert({from: 'dan', to: 'bug', message: 'dan test 1'});
// db.messages.insert({from: 'bug', to: 'dan', message: 'bug test 1'});
