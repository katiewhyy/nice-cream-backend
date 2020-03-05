import express from 'express'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.get('/', (req, res, next) => {
  const recipeCollection = req.db.collection('recipes')
  recipeCollection.find({}).toArray().then(recipes => res.send(recipes))
})

router.post('/', (req, res, next) => {
  const recipeCollection = req.db.collection('recipes')
  recipeCollection.insertOne(req.body)
    .then(recipe => {
      res.statusCode = 201
      res.send(recipe)
    })
})

router.patch('/:recipeId', (req, res, next) => {
  const recipeId = req.params.recipeId
  const recipeCollection = req.db.collection('recipes')
  const patchedRecipe = req.body
  recipeCollection.findOneAndUpdate(
    { _id: ObjectId(recipeId) }, 
    { $set: patchedRecipe },
    { returnOriginal: false }
  )
    .then(updatedRecipe => {
      res.statusCode = 201
      res.send({ recipe: updatedRecipe.value })
    })
    .catch(err => {
      res.statusCode = 404
      res.send(err)
    })
})

router.delete('/:recipeId', (req, res, next) => {
  const recipeId = req.params.recipeId
  const recipeCollection = req.db.collection('recipes')
  recipeCollection.findOneAndDelete({ _id: ObjectId(recipeId) })
    .then(deletedRecipe => {
      res.statusCode = 204
      res.send({ _id: deletedRecipe.value._id })
    })
    .catch(err => {
      res.statusCode = 404
      res.send(err)
    })
})

export default router
