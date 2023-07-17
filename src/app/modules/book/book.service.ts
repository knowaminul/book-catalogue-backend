import { IGenericResponse } from '../../../interfaces/common'
import { bookFilterableFields } from './book.constant'
import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'

const createBook = async (book: IBook): Promise<IBook | null> => {
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

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions)
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

const getSearchResult = async (keyword: string): Promise<IBook[]> => {
  const result = await Book.find({
    $or: bookFilterableFields.map(field => ({
      [field]: {
        $regex: keyword,
        $options: 'i',
      },
    })),
  })
  return result
}

const getReviewFromBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
  return result
}

export default {
  createBook,
  getRecentlyAddedBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getReviewFromBook,
  getSearchResult,
}
