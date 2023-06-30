import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)
import { CargoI } from '../models/Cargo';

describe('Prueba sobre api Cargo', () => {
    connectDB(config.dbConfig)

    let name = 'a'

        test('role retorna datos', async () => {

            const result = await api.get('/admin/role').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        }) 

        test('Role retornan como json', async () => {
            await api
                .get('/admin/role')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('Role Crea Nuevo rol', async () => {

            const result = await api.post('/admin/role').send('Cargo')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(500)
        })

        test('Role Crea Nuevo rol', async () => {

            const result = await api.post('/admin/role').send(name)
            console.log(result.statusCode)
            expect(result.statusCode).toBe(500)
        })

    })
