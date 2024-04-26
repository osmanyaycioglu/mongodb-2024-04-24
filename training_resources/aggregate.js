db.imdb.aggregate(
    [
        {
            "$project": {
                _id: 0,
                plot: 1,
                year: 1,
                runtime: 1
            }
        },
        {
            "$match": {
                year: {$gt: 1990}
            }
        },
        {
            "$addFields": {
                total: {
                    $round: [
                        {$divide: ["$year", "$runtime"]},
                        1
                    ]
                }
            }
        },
        {
            "$project": {
                year: 0,
                runtime: 0
            }
        },
        {
            $limit: 10
        }
    ]
)


db.car.aggregate(
    [
        {
            $project: {
                name: 1,
                model: 1,
                year: 1,
                price: 1,
                variations: 1
            }
        },
        {
            $unwind: "$variations"
        },
        {
            $group: {
                _id: "$variations.variation",
                count: {
                    $sum: 1
                },
                price: {
                    $avg: "$price"
                },
                cars: {
                    $addToSet: {
                        "name": "$name"
                    }
                }
            }
        },
        {
            $project: {
                priceRound: {
                    $round: [
                        "$price", 1
                    ]
                },
                count: 1
            }
        },
        {
            $sort: {
                count: 1
            }
        }

    ]
)


db.car.aggregate(
    [
        {
            $project: {
                name: 1,
                model: 1,
                year: 1,
                price: 1,
                variations: 1
            }
        },
        {
            $bucket: {
                groupBy: "$year",
                boundaries: [1960, 1970, 1980, 1990, 2000, 2010, 2020],
                default: "def",
                output: {
                    count: {
                        $sum: 1
                    },
                    price: {
                        $avg: "$price"
                    }
                }
            }
        }
    ]
)

db.car.aggregate(
    [
        {
            $project: {
                name: 1,
                model: 1,
                year: 1,
                price: 1,
                variations: 1
            }
        },
        {
            $bucketAuto: {
                groupBy: "$year",
                buckets: 10,
                output: {
                    count: {
                        $sum: 1
                    },
                    price: {
                        $avg: "$price"
                    }
                }
            }
        }
    ]
)

db.orders.aggregate(
    [
        {
            $lookup : {
                from : "car",
                localField : "car_id",
                foreignField: "_id",
                as: "car"
            }
        },
        {
            $unwind : "$car"
        },
        {
            $limit : 10
        }
    ]
)

db.car.aggregate(
    [
        {
            $lookup : {
                from : "orders",
                foreignField: "car_id",
                localField: "_id",
                as: "orders"
            }
        },
        {
            $out : "carAndOrders"
        }
    ]
)

db.car.aggregate(
    [
        {
            $lookup : {
                from : "orders",
                foreignField: "car_id",
                localField: "_id",
                as: "orders"
            }
        },
        {
            $merge : {
                into : "carMerge",
                on : "_id",
                whenMatched: "keepExisting",
                whenNotMatched: "insert"
            }
        }
    ]
)
