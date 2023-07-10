const express = require("express")
const app = express()
const { connection } = require("./db")
const { userroute } = require("./routes/userroute")
const { resturantroute } = require("./routes/resturant")
const { orderroute } = require("./routes/order")
const swaggerJSdoc=require("swagger-jsdoc")
const swaggerUI=require("swagger-ui-express")

require("dotenv").config()
app.use(express.json())

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:7800"
            }
        ]
    },
    apis:["./routes/*.js"]
}
//specification
const swaggerSpec= swaggerJSdoc(options)
//building UI
app.use("/documentation",swaggerUI.serve,swaggerUI.setup(swaggerSpec))




app.use("/api",userroute)
app.use("/api",resturantroute)
app.use("/api",orderroute)



app.get("/", (req, res) => {
    res.send("Home page")
})

app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("Server connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("server is runnig..")
})