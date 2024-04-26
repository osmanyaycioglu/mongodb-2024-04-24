db.createCollection("customer",
    {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["firstName", "lastName", "password", "credits", "gender", "address"],
                properties: {
                    "firstName": {
                        bsonType: "string"
                    },
                    "middleName": {
                        bsonType: "string"
                    },
                    "lastName": {
                        bsonType: "string"
                    },
                    "country": {
                        bsonType: "string"
                    },
                    "gender": {
                        enum: ["MALE", "FEMALE"]
                    },
                    "credits": {
                        bsonType: "double",
                        minimum: 0
                    },
                    "password": {
                        bsonType: "string",
                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
                    },
                    "address": {
                        bsonType: "object",
                        required: ["addr", "street", "city"],
                        properties: {
                            "addr": {
                                bsonType: "string"
                            },
                            "street": {
                                bsonType: "string"
                            },
                            "city": {
                                bsonType: "string"
                            }
                        }
                    }
                }
            }
        }
    }
)
