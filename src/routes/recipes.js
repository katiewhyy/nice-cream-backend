import express from 'express'

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  const recipeCollection = req.db.collection('recipes')
  recipeCollection.find({}).toArray().then(recipe => res.send(recipe))
});

router.post('/', (req, res, next) => {
  const recipeCollection = req.db.collection('recipes')
  recipeCollection.insertOne(req.body).then(ret => res.send(ret))
})

export default router
