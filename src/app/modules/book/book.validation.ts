import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    image: z.string({
      required_error: 'Image URL is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }),
    user: z.string({
      required_error: 'User is required',
    }),
  }),
})

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    image: z.string({
      required_error: 'Image URL is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }),
    user: z.string({
      required_error: 'User is required',
    }),
  }),
})

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
}
