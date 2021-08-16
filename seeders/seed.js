const mongoose = require("mongoose");
const workoutModel = require("../models/Workout");

mongoose.connect(
    "mongodb+srv://saya:12345@cluster0.o86hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }
);

const workoutSeed = [{
        day: new Date(new Date().setDate(new Date().getDate() - 9)),
        exercises: [{
            type: "resistance",
            name: "Bicep Curl",
            duration: 20,
            weight: 100,
            reps: 10,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 8)),
        exercises: [{
            type: "resistance",
            name: "Lateral Pull",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 7)),
        exercises: [{
            type: "resistance",
            name: "Push Press",
            duration: 25,
            weight: 185,
            reps: 8,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 6)),
        exercises: [{
            type: "cardio",
            name: "Running",
            duration: 25,
            distance: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 5)),
        exercises: [{
            type: "resistance",
            name: "Bench Press",
            duration: 20,
            weight: 285,
            reps: 10,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 4)),
        exercises: [{
            type: "resistance",
            name: "Bench Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 3)),
        exercises: [{
            type: "resistance",
            name: "Quad Press",
            duration: 30,
            weight: 300,
            reps: 10,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 2)),
        exercises: [{
            type: "resistance",
            name: "Bench Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4,
        }, ],
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 1)),
        exercises: [{
            type: "resistance",
            name: "Military Press",
            duration: 20,
            weight: 300,
            reps: 10,
            sets: 4,
        }, ],
    },
];

workoutModel
    .deleteMany({})
    .then(() => workoutModel.insertMany(workoutSeed))
    .then((data) => {
        console.log(data + " records inserted!");
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });