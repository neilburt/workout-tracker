const router = require('express').Router();
const Workout = require('../models/workoutModel');

router.post('/api/workouts', ({body}, res) => {
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
  Workout.create(body) 
  .then(({ _id }) => db.Workout.findOneAndUpdate(
    {_id: params.id},
    { $push: { exercise: body } },
    { new: true }))
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    console.log("by id", err)
    res.status(400).json(err);
  });
});

router.get('/api/workouts', (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    console.log("get workouts", err)
    res.status(400).json(err);
  });
});

router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate({})
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