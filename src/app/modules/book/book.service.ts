// import { SortOrder } from 'mongoose'
// import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
// import { IPaginationOptions } from '../../../interfaces/pagination'
import { bookFilterableFields } from './book.constant'
import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'
import { ObjectId } from 'mongodb'

const createBook = async (book: IBook): Promise<IBook | null> => {
  console.log('book-service', book)
  const createdBook = await Book.create(book)

  if (!createBook) {
    throw new Error('Failed to create book!')
  }
  return createdBook
}

const getRecentlyAddedBooks = async (): Promise<IGenericResponse<IBook[]>> => {
  const result = await Book.find({}).sort({ createdAt: -1 }).limit(10).exec()

  const count = await Book.countDocuments()

  return {
    meta: {
      count,
    },
    data: result,
  }
}

const getAllBooks = async (
  filters: IBookFilters
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  console.log('searchTermFromService', searchTerm)
  if (searchTerm) {
    andConditions.push({
      $or: bookFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const result = await Book.find({}).exec()
  const count = await Book.countDocuments()

  return {
    meta: {
      count,
    },
    data: result,
  }
}

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
  return result
}

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id)
  return result
}

const addReviewToBook = async (
  productId: string,
  review: string
): Promise<boolean> => {
  console.log('review', review)
  const result = await Book.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { reviews: review } }
  )

  return result.modifiedCount === 1
}

export default {
  createBook,
  getRecentlyAddedBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReviewToBook,
}
