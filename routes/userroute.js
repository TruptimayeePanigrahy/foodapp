const express = require("express")
const userroute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { usermodel } = require("../models/usermodel")

/**
 * @swagger
 * components:
 *   schemas:
 *     userschema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         address:
 *           type: Object
 */

/**
 * @swagger
 * /api/register:
 *  post:
 *      summary: To add a new user to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userschema'
 *      responses:
 *          200:
 *              description: The user was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userschema'
 *          500:
 *              description: Some server error
 */
userroute.post("/register", async (req, res) => {
    try {
        const { name, email, password, address } = req.body
        let userpresent = await usermodel.findOne({ email })
        if (userpresent) {
           return res.send({"msg":"User already present please Login"})
        }
        let hashpassword = bcrypt.hashSync(password, 8)
        const newuser = new usermodel({ name, email, password: hashpassword, address })
        await newuser.save()
        res.status(201).send({"msg":"Registration Successfull!!"})
        
    } catch (error) {
     console.log(error)
    }
})


/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: To add a new user to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userschema'
 *      responses:
 *          200:
 *              description: The user was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userschema'
 *          500:
 *              description: Some server error
 */
userroute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userfound = await usermodel.findOne({ email })
        if (!userfound) {
           return res.status(404).send({"msg":"User not found plase signup"})
        }
        let comparepass= await bcrypt.compare(password, userfound.password)
        if (!comparepass) {
            return res.status(400).send({ "msg": "Incorrect password" })
            
        }
 let token=jwt.sign({email:userfound.email,userid:userfound._id},process.env.secretkey,{expiresIn:"6hr"})
      
     res.status(201).send({msg:"Login successfull!!","token":token})
    } catch (error) {
     console.log(error)
    }
})

/**
 * @swagger
 * /api/user/:id/reset:
 *   put:
 *     summary: To update a user in the database
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userschema'
 *     responses:
 *       200:
 *         description: The user was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userschema'
 *       404:
 *         description: The specified user ID does not exist.
 *       500:
 *         description: Some server error
 */
userroute.put("/user/:id/reset", async (req, res) => {
    try {
        const { id } = req.params
        let {password,newpassword}=req.body
        const user = await usermodel.findOne({ _id: id })
        if (!user) {
            return res.status(400).send({ "msg": "user not found" })
        }
        
        let compare = bcrypt.compare(password, user.password)
        if (!compare) {
            return res.status(400).send({ "msg": "Incorrect password" })
        }
      let  hashnewpass=bcrypt.hashSync(newpassword,8)
        user.password = hashnewpass
        await user.save()
        res.status(204).send({"msg":"password updated successfully!!"})
    } catch (error) {
        console.log(error)
    }
})

userroute.get("/getuser", async (req, res) => {
    try {
        let data = await usermodel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})




module.exports={userroute}