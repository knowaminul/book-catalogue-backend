import { Model } from 'mongoose'

export type IBook = {
  _id: number
  title: string
  image: string
  author: string
  genre: string
  publicationDate: string
  quantity?: number
  userId?: string
}

export type IBookFilters = {
  searchTerm?: string
}

export type BookModel = Model<IBook>
