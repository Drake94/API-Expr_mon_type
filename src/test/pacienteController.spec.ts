import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)

describe('Prueba sobre api Paciente', () => {
    connectDB(config.dbConfig)


    describe('GET /admin/paciente', () => {
        test('paciente retorna datos', async () => {

            const result = await api.get('/admin/paciente').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })
        test('paciente retornan como json', async () => {
            await api
                .get('/admin/paciente')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('paciente retorna un dato exacto', async () => {
            //falla por que no existe
            const result = await api.get('/admin/paciente/6321789-5').send()
            console.log(result)
            expect(result.statusCode).toBe(200)
        })

        test(' Crea Nuevo paciente', async () => {

            const result = await api.post('/admin/paciente').send('paciente')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(500)
        })
    })
})