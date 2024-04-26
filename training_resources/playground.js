db.mycollection.insertMany([
    {
        "_id": 3,
        "name": "osman",
        "surname": "yaycıoğlu",
        "age": 54,
        "address": {
            "street": "ataşehir",
            "city": "istanbul"
        }
    },
    {
        "_id": 4,
        "name": "ali",
        "surname": "veli",
        "age": 34,
        "address": {
            "street": "mamak",
            "city": "ankara"
        }
    }

]);

db.mycollection.find({age: {$gt: 40}})
db.mycollection.find({age: {$not: {$lte: 34}}})
db.mycollection.find({name: "ali", surname: "kaplan"})
db.mycollection.find({$and: [{name: {$eq: "ali"}}, {surname: {$eq: "kaplan"}}]})
db.mycollection.find(
    {
        $or: [
            {
                $and: [
                    {
                        name: {$eq: "osman"}
                    },
                    {
                        surname: {$eq: "yaycioglu"}
                    }
                ]
            },
            {
                surname: {$eq: "kaplan"}
            },
            {
                age: {$gt: 50}
            }
        ]
    })

db.my1.find({
    runtime_min: {
        $in: [146, 143]
    }
})


db.movies.find({_id: ObjectId('65b39fbaaf9cbf38a08d0ae5')}, {title: 1})
db.movies.find({}, {title: 1})

db.movies.find({}, {_id: 0, actors: 0, "ratings.mndb": 0}).limit(10)

db.movies.find({}, {deneme: "$ratings.mndb", title: 1}).limit(10)

db.movies.find({}, {deneme: {$concatArrays: ["$actors", "$genres"]}, title: 1, director: 1}).limit(10)

db.movies.find({}, {toplam: {$sum: ["$gross", "$runtime_min"]}, title: 1, director: 1}).limit(10)

db.movies.find({}, {deneme: {toplam: {$sum: ["$gross", "$runtime_min"]}}, title: 1, director: 1}).limit(10)

db.movies.find({}, {toplamPuan: {$sum: ["$ratings.soft_avocados", "$ratings.mndb"]}, title: 1, director: 1}).limit(10)

db.movies.find({}, {result: {$zip: {inputs: ["$actors", "$genres"]}}, title: 1, director: 1}).limit(10)

db.movies.find({}, {fullName: {$concat: ["$title", " -- ", "$director"]}, title: 1, director: 1}).limit(10)

db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$set: {title: "osman"}})

db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$set: {title: "osman", "deneme": "test"}})

? db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$set: {primeActor: "$actors.0"}})

db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$set: {"actors.0": "osman yaycıoğlu"}})

db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$inc: {runtime_min: 2}})

db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$unset: {primeActor: ""}})

db.movies.updateOne({_id: ObjectId('65b39fbaaf9cbf38a08d0add')}, {$rename: {deneme: "testField"}})

db.movies.updateMany({runtime_min: {$gt: 60}}, {$set: {metraj: "long"}})

db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')}, {$pull: {genres: "Short"}})

db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')}, {$push: {genres: "Long"}})
db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')}, {$push: {genres: ["Long", "drama", "horror"]}})
db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')}, {$push: {genres: {$each: ["Long", "drama", "horror"]}}})

db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')}, {$pop: {genres: -1}})
db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')}, {$pop: {genres: 1}})

db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')},
    {
        $push: {
            genres: {
                $each: ["athriller", "love", "action"],
                $sort: 1,
                $slice: 5
            }
        }
    }
)

db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')},
    {
        $push: {
            genres: {
                $each: ["abc", "xyz", "asd"],
                $position : 2
            }
        }
    }
)

db.imdb.updateOne({_id: ObjectId('573a1390f29313caabcd4135')},
    {
        $addToSet: {
            genres: {
                $each: ["abc", "xyz", "asd","123"]
            }
        }
    }
)

db.imdb.find({runtime : {$gt : 120},year : {$gt : 2010}}).explain("executionStats")
db.imdb.find({year : {$gt : 2010},runtime : {$gt : 120}}).explain("executionStats")
db.imdb.find({year : {$gt : 2010},runtime : {$gt : 120},genres : "action"}).explain("executionStats")


db.imdb.find({genres : {$all : ["Short","Drama"]}}).limit(10)
db.imdb.find({genres : ["Short","Drama"]})

db.imdb.createIndex({ fullplot: "text" })

db.imdb.find({
    $text : {
        $search : "stationary"
    }
})

db.imdb.find({ $text: { $search: '"stationary Faith"' ,$caseSensitive: false }}).count()
