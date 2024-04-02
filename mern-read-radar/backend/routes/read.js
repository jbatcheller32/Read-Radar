const router = require('express').Router();
let Read = require('../models/read.model');

// Get all reads
router.route('/').get((req, res) => {
  Read.find()
    .then(reads => res.json(reads))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new read
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newRead = new Read({
    username,
    description,
    duration,
    date,
  });

  newRead.save()
    .then(() => res.json('Read added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update an existing read
router.route('/update/:id').post((req, res) => {
  Read.findById(req.params.id)
    .then(read => {
      read.username = req.body.username;
      read.description = req.body.description;
      read.duration = Number(req.body.duration);
      read.date = Date.parse(req.body.date);

      read.save()
        .then(() => res.json('Read updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
