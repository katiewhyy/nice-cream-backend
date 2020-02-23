import assert from 'assert'
import { MongoClient } from 'mongodb'

import config from '../config'

class DbClient {

  static async getClient() {
    if (this.db) {
      return this.db
    }

    this.db = await MongoClient.connect(config.dbUrl)
    return this.db
  }
}

DbClient.db = null

export default DbClient
