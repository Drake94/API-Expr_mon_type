import app from '../app'
import request from 'supertest'
import connectDB from '../db/mongoDB'
import 'dotenv'
import config from '../../config'
const api = request(app)

describe('Prueba sobre api Medico', () => {
    connectDB(config.dbConfig)

    describe('GET /admin/medicoLab', () => {
        test('medicoLab retorna datos', async () => {

            const result = await api.get('/admin/medicoLab').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        })
        test('medicoLab retornan como json', async () => {
            await api
                .get('/admin/medicoLab')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('medicoLab retorna un dato exacto', async () => {
            //falla por que no existe
            const result = await api.get('/admin/medicoLab/6321789-5').send()
            console.log(result)
            expect(result.statusCode).toBe(404)
        })

        test('Crea Nuevo medicoLab', async () => {

            const result = await api.post('/admin/medicoLab').send('medicoLab')
            console.log(result.statusCode)
            expect(result.statusCode).toBe(400)
        })



    })
})
