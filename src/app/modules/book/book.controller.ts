import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBook } from './book.interface'
import BookService from './book.service'
import { bookFilterableFields } from './book.constant'
import pick from '../../../shared/pick'
import { Book } from './book.model'
import { ObjectId } from 'mongodb'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body

  const result = await BookService.createBook(book)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  })
})

const getRecentlyAddedBooks = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.getRecentlyAddedBooks()

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Recently added books retrieved successfully',
      data: result.data,
    })
  }
)

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields)
  const result = await BookService.getAllBooks(filters)

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result.data,
  })
})

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await BookService.getSingleBook(id)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  console.log('updateBook controller is called')
  const id = req.params.id
  const updatedData = req.body
  console.log('id', id)
  console.log('updatedData', updatedData)
  const result = await BookService.updateBook(id, updatedData)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  })
})

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await BookService.deleteBook(id)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  })
})

const getSearchResult = catchAsync(async (req: Request, res: Response) => {
  const { keyword } = req.query
  if (!keyword) {
    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Search term is required',
      data: [],
    })
    return
  }

  const result = await BookService.getSearchResult(keyword as string)

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search result retrieved successfully',
    data: result,
  })
})

const addReviewToBook = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id
  const review = req.body.data.review

  const result = await Book.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { reviews: review } }
  )

  if (result.modifiedCount !== 1) {
    console.error('Product not found or review not added')
    res.json({ error: 'Product not found or review not added' })
    return
  }

  console.log('Review added successfully')
  res.json({ message: 'Review added successfully' })
})

const getReviewFromBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await BookService.getReviewFromBook(id)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  })
})

export const BookController = {
  createBook,
  getRecentlyAddedBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReviewToBook,
  getReviewFromBook,
  getSearchResult,
}
