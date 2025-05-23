/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import supertest from "supertest"
import app from "../../../app"
import request from "supertest"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

describe("System Health Controller", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    it("should return 200 and health data when request for overall health", async () => {
        const res: supertest.Response = await request(app).get("/api/v1/health/system")
        expect(res.statusCode).toEqual(200)
    })

    it("should return a JSON response with a success message when request for overall health", async () => {
        const response: supertest.Response = await request(app).get("/api/v1/health/system")
        expect(response.type).toEqual("application/json")
        expect(response.body).toHaveProperty("message", "Operation completed successfully.")
    })

    it("should return a 404 status code when requesting a non-existent health endpoint", async () => {
        const response: supertest.Response = await request(app).get("/api/v1/non-existent-health-endpoint")
        expect(response.statusCode).toEqual(404)
    })

    it("should return a 404 status code when sending a POST request to the health endpoint", async () => {
        const response: supertest.Response = await request(app).post("/api/v1/health/system")
        expect(response.statusCode).toEqual(404)
    })

    it("should return the correct health data", async () => {
        const response: supertest.Response = await request(app).get("/api/v1/health/system")

        expect(response.statusCode).toEqual(200)
        expect(response.type).toEqual("application/json")

        const data = response.body

        expect(data.success).toBe(true)
        expect(data.statusCode).toEqual(200)
        expect(data.message).toEqual("Operation completed successfully.")

        expect(data.data.system).toEqual({
            cpuUsage: expect.arrayContaining([expect.any(Number), expect.any(Number), expect.any(Number)]),
            totalMemory: expect.stringMatching(/^[0-9]+(\.[0-9]+)? MB$/),
            freeMemory: expect.stringMatching(/^[0-9]+(\.[0-9]+)? MB$/)
        })

        expect(data.data.timeStamp).toEqual(expect.any(Number))

        expect(data.request).toEqual({
            method: "GET",
            url: "/api/v1/health/system",
            ip: expect.any(String)
        })
    })
})
