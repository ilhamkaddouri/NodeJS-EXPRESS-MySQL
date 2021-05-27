const app = require('./app')
const supertest = require("supertest");
const request = supertest(app)

const chance = require('chance')
const ch = new chance()

describe("Users route",()=>{
    describe("POST A USER",()=>{
        it("should return a 201 status ",async ()=>{
            const params = {
                firstname : ch.word({length: 15}),
                lastname : ch.word({length: 15}),
                email : ch.word({length: 20}),
                username: ch.word({length: 15   }),
                password : "12345679Aa"
            }
            const response= await request.post('/api/user/register').send(params)
            expect(response.statusCode).toBe(201)
        })

        it("should specify json in content type header",async ()=>{
            const params = {
                firstname : ch.word({length: 15}),
                lastname : ch.word({length: 15}),
                email : ch.word({length: 20}),
                username: ch.word({length: 15   }),
                password : "12345679Aa"
            }
            const response= await request.post('/api/user/register').send(params)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
        it("should return user object in response",async ()=>{
            const params = {
                firstname : ch.word({length: 15}),
                lastname : ch.word({length: 15}),
                email : ch.word({length: 20}),
                username: ch.word({length: 15   }),
                password : "12345679Aa"
            }
            const response= await request.post('/api/user/register').send(params)
            expect(response.body.user).toBeDefined()
        })
        it("should fails when firstname is missing",async ()=>{
            const params = {
                lastname : ch.word({length: 15}),
                email : ch.word({length: 20}),
                username: ch.word({length: 15   }),
                password : "12345679Aa"
            }
            const response= await request.post('/api/user/register').send(params)
            expect(response.statusCode).toBe(400)
        })
        it("should fails when laststname is missing",async ()=>{
            const params = {
                firstname : ch.word({length: 15}),
                email : ch.word({length: 20}),
                username: ch.word({length: 15   }),
                password : "12345679Aa"
            }
            const response= await request.post('/api/user/register').send(params)
            expect(response.statusCode).toBe(400)
        })
        it("should fails when email is missing",async ()=>{
            const params = {
                lastname : ch.word({length: 15}),
                firstname : ch.word({length: 20}),
                username: ch.word({length: 15   }),
                password : "12345679Aa"
            }
            const response= await request.post('/api/user/register').send(params)
            expect(response.statusCode).toBe(400)
        })
        // it("should fails when password is missing", ()=>{
        //     const params= {
        //         lastname : ch.word({length: 15}),
        //         firstname : ch.word({length: 20}),
        //         username: ch.word({length: 15   }),
        //         email : ch.word({length: 15   })}
        //     const response=  request(app).post('/api/user/register').send(params)
        //     expect(response.statusCode).toBe(400)
            
           
        // })
    })
})