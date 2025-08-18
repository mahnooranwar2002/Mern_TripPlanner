var mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/trip_planners").then(()=>{
    console.log("Database Connected")
})


