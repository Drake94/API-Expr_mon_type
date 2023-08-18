import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)

describe('Prueba sobre api Paciente', () => {
    connectDB(config.dbConfig)

    describe('GET /admin/resultado', () => {

        test('resultado retorna datos', async () => {

            const result = await api.get('/admin/resultado').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })
        test('resultado retornan como json', async () => {
            await api
                .get('/admin/resultado')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('resultado retorna un dato exacto', async () => {

            const result = await api.get('/admin/resultado/').send('ased2143')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })

    })
})