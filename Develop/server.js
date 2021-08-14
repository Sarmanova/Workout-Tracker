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


// app.post("/submit", ({ body }, res) => {
//     db.Book.create(body)
//         .then(({ _id }) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
//         .then(dbLibrary => {
//             res.json(dbLibrary);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/books", (req, res) => {
//     db.Book.find({})
//         .then(dbBook => {
//             res.json(dbBook);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/library", (req, res) => {
//     db.Library.find({})
//         .then(dbLibrary => {
//             res.json(dbLibrary);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/populated", (req, res) => {
//     db.Library.find({})
//         .populate("books")
//         .then(dbLibrary => {
//             res.json(dbLibrary);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

app.get("/", (req, res) => {
    res.send("homepage");
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "exercise.html"));
});

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
        res.json(data);
    }).catch(err => {
        res.json(err)
    })
});

app.post("/api/workouts", ({ body }, res) => {
    workoutModel
        .create(body)
        .then(({ _id }) =>
            workoutModel.findOneAndUpdate({}, { $push: { workoutSeed } }, { new: true })
        )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});