import { env } from '~/config/environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

let UITecoDataBaseInstance = null

// Create instance to conect to MongoDB
const mongoClienInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Connect to DataBase
export const CONNECT_DB = async () => {
  // Call to MongoDB with URI is declared
  await mongoClienInstance.connect()

  // Connect successfully, get name of database and assign to variable
  UITecoDataBaseInstance = mongoClienInstance.db(env.DATABASE_NAME)
}

// Export to variable
export const GET_DB = () =>
{
  if (!UITecoDataBaseInstance) throw new Error ('Must connect to Database')
  return UITecoDataBaseInstance
}

// Close connect to server
export const CLOSE_DB = async () => {
  await mongoClienInstance.close()
}

