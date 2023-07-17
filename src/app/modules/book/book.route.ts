import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'
import { BookValidation } from './book.validation'
const router = express.Router()

router.post(
  '/add-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
)

router.get('/recently-added-books', BookController.getRecentlyAddedBooks)

router.get('/books', BookController.getAllBooks)

router.get('/book/:id', BookController.getSingleBook)

router.patch(
  '/edit-book/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
)

router.delete('/delete-book/:id', BookController.deleteBook)

router.get('/books/search', BookController.getSearchResult)

router.post('/review/:id', BookController.addReviewToBook)

router.get('/review/:id', BookController.getReviewFromBook)


export const BookRoutes = router
