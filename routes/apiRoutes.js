const router = require('express').Router();
const Workout = require('../models/workoutModel');

router.get('/api/workouts', (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    console.log("get workouts", error)
    res.json(err)
  })
})

router.put('/api/workouts/:id', ({body}, res) => {
  Workout.create(body) 
  .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

router.post('/api/workouts', ({body}, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;