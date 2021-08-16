const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const workoutModel = require("./models/Workout");


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/populate", { useNewUrlParser: true }
);
//"mongodb+srv://saya:12345@cluster0.o86hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.get("/", (req, res) => {
    res.send("homepage");
});
//join index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "index.html"));
});
//join exercise.html
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "exercise.html"));
});
//join stats.html
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "stats.html"));
});
// get workout
app.get("/api/workouts", (req, res) => {
    workoutModel
        .aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }, ])
        .then((data) => {
            console.log("data:", data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

// create workout
app.post("/api/workouts", ({ body }, res) => {
    workoutModel
        .create(body.id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});
// Add exercises
app.put("/api/workouts/:id", (req, res) => {
    workoutModel
        .findOneAndUpdate({ _id: req.params.id }, {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body },
        }, { new: true })
        .then((data) => {
            console.log("data:", data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });

});
// delete workout
app.delete('/api/workouts', ({ body }, res) => {
    workoutModel
        .findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
})

// get workouts range
app.get("/api/workouts/range", (req, res) => {
    workoutModel
        .aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }, ]).sort({ _id: -1 })
        .limit(7)
        .then((data) => {
            console.log("data:", data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});