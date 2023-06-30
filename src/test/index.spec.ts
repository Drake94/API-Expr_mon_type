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

    })
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

            const result = await api.get('/admin/resultado/ased2143').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(400)
        }) 
        

    })

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

    })
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

    })

    describe('GET /admin/tipomuestra, /admin/status, /admin/role', () => {
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

        test('role retorna datos', async () => {

            const result = await api.get('/admin/role').send()
            console.log(result.statusCode)
            expect(result.statusCode).toBe(200)
        }) 
        test('role retornan como json', async () => {
            await api
                .get('/admin/role')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

    })
})
