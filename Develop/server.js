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
    // "mongodb://localhost/populate"
    "mongodb+srv://saya:12345@cluster0.o86hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true }
);

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
    workoutModel.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration",
            },
        },
    }, ])

    .then((data) => {
            console.log("ADDED", data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});
// create workout
app.post("/api/workouts", ({ body }, res) => {
    workoutModel
        .create(body)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});
// Add exercises
app.put("/api/workouts/:id", (req, res) => {
    workoutModel.findOneAndUpdate({ _id: req.params.id }, {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body.exercises },
        }, { new: true })
        .then((data) => {
            console.log("data:", data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });

});
//get workout in range


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});