import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'
import { BookValidation } from './book.validation'
// import auth from '../../middlewares/auth'
// import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.post(
  '/add-book',
  validateRequest(BookValidation.createBookZodSchema),
  //   auth(ENUM_USER_ROLE.Seller),
  BookController.createBook
)

router.get(
  '/books',
  //   auth(ENUM_USER_ROLE.Admin, ENUM_USER_ROLE.Buyer, ENUM_USER_ROLE.Seller),
  BookController.getAllBooks
)

router.get(
  '/book/:id',
  //   auth(ENUM_USER_ROLE.Admin, ENUM_USER_ROLE.Buyer, ENUM_USER_ROLE.Seller),
  BookController.getSingleBook
)

router.patch(
  '/edit-book/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  // auth(ENUM_USER_ROLE.Seller),
  BookController.updateBook
)

router.delete(
  '/delete-book/:id',
  // auth(ENUM_USER_ROLE.Seller),
  BookController.deleteBook
)

export const BookRoutes = router
