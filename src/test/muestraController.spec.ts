import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)

describe('Prueba sobre api metodos GET', () => {
    connectDB(config.dbConfig)

    describe('GET /admin/muestra', () => {

        test('muestra retorna datos', async () => {

            const result = await api.get('/admin/muestra').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })
        test('muestras retornan como json', async () => {
            await api
                .get('/admin/muestra')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('muestra retorna un dato exacto', async () => {

            const result = await api.get('/admin/muestra/23433').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })

        test(' Crea una nueva muestra', async () => {

            const result = await api.post('/admin/muestra').send('muestra')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(403)
        })

    })
})