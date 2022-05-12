process.env.NODE_ENV='test'

//const expect  = require('chai').expect
const request = require('supertest')

const app=require('../server')
const connectDB=require('../config/db')

const URL="http://localhost:5000";


describe("GET /books", () => {
    test("Get books", async () => {
      const response = await request(app)
        .get("/api/books")
      expect(response.statusCode).toBe(200);
    });

    test("OK, getting book by id",async () => {
        const response=await request(app)
            .get("/api/books/6276999a8dd60863159d2490")
            const body=response.body;
            expect(response.statusCode).toBe(200);
            expect(body).toHaveProperty('name');
            expect(body).toHaveProperty('author');
            expect(body).toHaveProperty('isbn');
            expect(body).toHaveProperty('copies');
    });
  });


  describe("users login testing", () => {
    test("Positove login", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({username:"akashch",
            password:"akash123"
        });
      expect(response.statusCode).toBe(200);
    });

    test("Negative login", async () => {
        const response = await request(app)
          .post("/api/users/login")
          .send({username:"Director",
              password:"123pa"
          });
        expect(response.statusCode).toBe(401);
      });
  });