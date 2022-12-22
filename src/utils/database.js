import mongoose from 'mongoose'

// connecting the database
function initDatabase() {
  mongoose.connect(process.env.DATABASE_URI, {
    dbName: process.env.DATABASE_NAME,
    auth: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
    },
  })

  // supress warning
  mongoose.set('strictQuery', true)
}

export { initDatabase }
