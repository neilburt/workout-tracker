const router = require('express').Router();
const Workout = require('../models/workoutModel');

router.post('/api/workouts', ({body}, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    console.log("new workout error", err);
    res.status(400).json(err);
  })
})

router.put('/api/workouts/:id', ({body}, res) => {

})

router.delete('/api/workouts/:id', ({body}, res) => {

})