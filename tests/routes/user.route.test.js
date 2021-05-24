const app = require('../../server')
const request = require("supertest");
const chance = require('chance')
const ch = new chance()

describe("Users route",()=>{
    describe("POST A USER",()=>{
        test("should return a 200 status ", ()=>{
            // const params = {
            //     firstname : ch.word({length: 15}),
            //     lastname : ch.word({length: 15}),
            //     email : ch.word({length: 20}),
            //     username: ch.word({length: 15   }),
            //     password : ch.word({length: 10})
            // }
            return request(app)
                .get('/api/user/hi')
                .expect(200)
                .then(res => {
                  // { msg: 'WORKING!!!' }
                  expect(res.body).toMatchSnapshot();
                });
           
        })
    })
})