const router = require('express').Router();
const Workout = require('../models/workoutModel');

router.post('/api/workouts', ({body}, res) => {
  console.log("create hit");
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    console.log("create workout", err)
    res.status(400).json(err);
  });
});

router.put('/api/workouts/:id', ({params, body}, res) => {
  console.log("by id hit");
  Workout.findOneAndUpdate(
    {_id: params.id},
    { $push: { exercises: body } },
    { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log("by id", err)
      res.status(400).json(err);
    });
  });
  
  router.get('/api/workouts', (req, res) => {
    console.log("range hit");
    Workout.aggregate([{$addFields: {'totalDuration': {$sum: '$exercises.duration'}}}])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log("get range", err)
      res.status(400).json(err);
    });
  });

  router.get('/api/workouts/range', (req, res) => {
    console.log("range route hit");
    Workout.aggregate([{$addFields: {'totalDuration': {$sum: '$exercises.duration'}}}])
    .sort({_id: -1}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log("get range", err)
      res.status(400).json(err);
    });
  });
  
  module.exports = router;