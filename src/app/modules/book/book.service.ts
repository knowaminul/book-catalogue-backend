import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
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
  const result = await Book.find({})
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
    .limit(10) // Retrieve only the last ten books
    .exec()

  const count = await Book.countDocuments()

  return {
    meta: {
      page: 1, // Since there is no pagination, set page to 1
      limit: 10,
      count,
    },
    data: result,
  }
}


const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  console.log('searchTerm', searchTerm)
  console.log('filtersData', filtersData)
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

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const count = await Book.countDocuments()

  return {
    meta: {
      page,
      limit,
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

// const getReviewFromBook = async (productId: string): Promise<object | null> => {
//   const result = await Book.findOne(
//     { _id: new ObjectId(productId) },
//     { projection: { _id: 0, reviews: 1 } }
//   )

//   return result
// }

// const getReviewFromBook = async (productId: string): Promise<object | null> => {
//   const result = await Book.findOne(
//     { _id: new ObjectId(productId) },
//     { projection: { reviews: 1, _id: 0 } } // Exclude _id field instead of including reviews field
//   )

//   return result
// }

export default {
  createBook,
  getRecentlyAddedBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReviewToBook,
  // getReviewFromBook,
}
