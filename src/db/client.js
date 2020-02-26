import { MongoClient } from 'mongodb'

const getDb = (dbUrl, dbName) => new Promise((resolve, reject) => {
  MongoClient.connect(dbUrl, (err, client) => {
    if (err) {
      return reject(err)
    }
    console.info('Connected to database')
    const db = client.db(dbName)
    resolve(db)
  })
})

export default { getDb }
