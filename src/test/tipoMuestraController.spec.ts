import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)

describe('Prueba sobre api tipo Muestra', () => {
    connectDB(config.dbConfig)

    describe('GET /admin/tipomuestra', () => {

        test('tipomuestra retorna datos', async () => {

            const result = await api.get('/admin/tipomuestra').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })
        test('tipomuestra retornan como json', async () => {
            await api
                .get('/admin/tipomuestra')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('tipomuestra Crea Nuevo tipomuestra', async () => {

            const result = await api.post('/admin/tipomuestra').send('tipomuestra')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(500)
        })


    })
})