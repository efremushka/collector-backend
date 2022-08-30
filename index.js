import express from "express"
import fs from "fs"
import multer from "multer"
import cors from "cors"

import mongooose from "mongoose"

import { registrationValidator, loginValidator, collectionCreateValidator } from "./validations.js"

import { handleValidationErrors, checkAuth } from "./utils/index.js"

import { UserController, CollectionController } from "./controllers/index.js"

mongooose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB ok"))
    .catch((err) => console.log("MongoDB error, err"))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads")
        }
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.post("/auth/login", loginValidator, handleValidationErrors, UserController.login)
app.post("/auth/registration", registrationValidator, handleValidationErrors, UserController.registration)
app.get("/auth/me", checkAuth, UserController.getMe)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get("/tags", CollectionController.getLastTags)

app.get("/collections", CollectionController.getAll)
app.get("/collections/tags", CollectionController.getLastTags)
app.get("/collections/:id", CollectionController.getOne)
app.post("/collections", checkAuth, collectionCreateValidator, handleValidationErrors, CollectionController.create)
app.delete("/collections/:id", checkAuth, CollectionController.remove)
app.patch("/collections/:id", checkAuth, collectionCreateValidator, handleValidationErrors, CollectionController.update)



app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log("Server started")
})