const router = require('express').Router();
const Workout = require('../models/workoutModel');

// route that allows for creating new workout
router.post('/api/workouts', ({body}, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// route that allows for adding an exercise to a workout
router.put('/api/workouts/:id', ({params, body}, res) => {
  Workout.findOneAndUpdate(
    {_id: params.id},
    {$push: { exercises: body }},
    {new: true })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// route that allows for displaying latest workout information
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([{$addFields: {'totalDuration': {$sum: '$exercises.duration'}}}])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// route that allows for populating dashboard charts
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([{$addFields: {'totalDuration': {$sum: '$exercises.duration'}}}])
  .sort({_id: -1}).limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});
  
  module.exports = router;