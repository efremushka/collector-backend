import { body } from "express-validator"

export const loginValidator = [
    body("email", "Неверный формат почты!").isEmail(),
    body("password", "Пароль должен состоять минимум из 5 символов!").isLength({ min: 5 }),
]

export const registrationValidator = [
    body("email", "Неверный формат почты!").isEmail(),
    body("password", "Пароль должен состоять минимум из 5 символов!").isLength({ min: 5 }),
    body("fullName", "Укажите имя!").isLength({ min: 2 }),
    body("avatarUrl", "Проверьте ссылку на аватар!").optional().isString(),
]

export const collectionCreateValidator = [
    body("title", "Введите название коллекции!").isLength({ min: 3 }).isString(),
    body("description", "Напишите описание коллекции!").isLength({ min: 5, max: 200 }).isString(),
    body("topic", "Укажите тему коллекцию!").isString(),
    body("imageUrl", "Проверьте ссылку на изображение!").optional().isString(),
    body("tags", "Укажите тэги!").isString(),

]