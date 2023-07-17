import { Schema, model } from 'mongoose'
import { IBook, BookModel } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    user: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
      required: false,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Book = model<IBook, BookModel>('Book', bookSchema)
