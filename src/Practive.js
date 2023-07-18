import React from 'react'



db.rooms.aggregate(
    [
        {
            "$match": {
                "location": "Bangalore"
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "price": {
                    "$first": "$price"
                },
                "floor-rooms": {
                    "$sum": {
                        "$add": ["$bedrooms", "$floor"]
                    }
                }
            }
        },
        {"$sort" : {"floor-rooms" : 1, "price" : -1}}
    ]
)

db.employeeDoc.find({ age: { $lt: 30 }).pretty()

const Practive = () => {



    return (
        <div>Practive</div>
    )
}

export default Practive