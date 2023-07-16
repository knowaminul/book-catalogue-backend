import { Model } from 'mongoose'

export type IReview = {
  review: string
}

export type IBook = {
  _id?: number
  title: string
  image: string
  author: string
  genre: string
  publicationYear: number
  quantity?: number
  user?: string
  reviews?: IReview[]
}


export type IBookFilters = {
  searchTerm?: string
}

export type BookModel = Model<IBook>
