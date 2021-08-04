const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "Please enter a type of exercise."
    },
    name: {
      type: String,
      trim: true,
      required: "Please enter the exercise's name."
    },
    duration: {
      type: Number,
      required: "Please enter the duration of the exercise."
    },
    weight: {
      type: Number
    },
    sets: {
      type: Number
    },
    reps: {
      type: Number
    },
    distance: {
      type: Number
    }
  }]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;