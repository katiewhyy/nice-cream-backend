
let dbName, dbUrl

const nodeEnv = process.env.NODE_ENV || 'development'

switch(process.env.NODE_ENV || 'development') {
  case 'production':
    dbName = 'niceCream'
    dbUrl = null
    break
  default:
    dbName = 'niceCream'
    dbUrl = 'mongodb://database:27017'
    break
}

export default {
  dbName,
  dbUrl
}
