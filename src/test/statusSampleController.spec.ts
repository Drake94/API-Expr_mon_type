import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)

describe('Prueba sobre api status', () => {
    connectDB(config.dbConfig)

    describe('GET  /admin/status', () => {

        test('status retorna datos', async () => {

            const result = await api.get('/admin/status').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })
        test('status retornan como json', async () => {
            await api
                .get('/admin/status')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('Crea Nuevo status', async () => {

            const result = await api.post('/admin/status').send('status')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(500)
        })

        
    })
})