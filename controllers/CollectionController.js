import CollectionModel from "../models/Collection.js"

export const getLastTags = async (req, res) => {
    try {
        const collections = await CollectionModel.find().limit(5).exec()
        const tags = collections.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить тэги"
        })
    }
}


export const getAll = async (req, res) => {
    try {
        const collections = await CollectionModel.find().populate("user").exec()

        res.json(collections)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить коллекции"
        })
    }
}


export const getOne = async (req, res) => {
    try {
        const collectionId = req.params.id

        CollectionModel.findOneAndUpdate(
            {
                _id: collectionId,
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: "after",
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Не удалось вернуть коллекцию"
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Коллекция не найдена",
                    })
                }

                res.json(doc)
            }
        ).populate("user")

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить коллекции"
        })
    }
}


export const remove = async (req, res) => {
    try {
        const collectionId = req.params.id
        CollectionModel.findOneAndDelete(
            {
                _id: collectionId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Не удалось удалить коллекцию"
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Коллекция не найдена"
                    })
                }

                res.json({
                    success: true,
                })
            })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить коллекцию"
        })
    }

}



export const create = async (req, res) => {
    try {
        const doc = new CollectionModel({
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(","),
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать коллекцию"
        })
    }
}

export const update = async (req, res) => {
    try {
        const collectionId = req.params.id

        await CollectionModel.updateOne(
            {
                _id: collectionId,
            },
            {
                title: req.body.title,
                description: req.body.description,
                topic: req.body.topic,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(","),
                user: req.userId,
            }
        )

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не уадлось обновить коллекцию"
        })
    }
}