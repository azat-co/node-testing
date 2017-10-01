const express = require('express'),
mongoskin = require('mongoskin'),
bodyParser = require('body-parser')
logger = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

const db = mongoskin.db('mongodb://localhost:27017/test')

app.param('collectionName', (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/', (req, res, next) => {
  res.send('please select a collection, e.g., /collections/messages')
})

app.get('/collections/:collectionName', (req, res, next) => {
  req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
  })
})

app.post('/collections/:collectionName', (req, res, next) => {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results.ops)
  })
})

app.get('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.findById(req.params.id, (e, result) => {
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.updateById(req.params.id, {$set: req.body}, (e, result) => {
    if (e) return next(e)
    // console.log(result)
    res.send((result.n === 1) ? {msg:'success'} : {msg: 'error'})
  })
})

app.delete('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.removeById(req.params.id, (e, result) => {
    if (e) return next(e)
    res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
  })
})

if (require.main == module) {
  app.listen(3000, () => {
    console.log('Express server listening on port 3000')
  })
} else {
  module.exports = app
}