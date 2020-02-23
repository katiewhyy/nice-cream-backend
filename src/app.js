import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import DbClient from './db/client'
import indexRouter from './routes/index'
import usersRouter from './routes/users'

export const dbClient = await DbClient.getClient() // TODO this is wrong, can't await outside async func
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

export default app
