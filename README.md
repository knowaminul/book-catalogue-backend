# L2A5-book-catalog-assignment-frontend-category-backend

  ### Live Link: https://book-catelogue.vercel.app/api/v1/

  ### Application Routes:
  
  ## Main part
  
   #### Books
   - Route: https://book-catelogue.vercel.app/api/v1/add-book (POST)
   - Route: https://book-catelogue.vercel.app/api/v1/books (GET)
   - Route: https://book-catelogue.vercel.app/api/v1/book/64b1c57f55e0e56b539eeef0 (Single GET)
   - Route: https://book-catelogue.vercel.app/api/v1/edit-book/64b1c57f55e0e56b539eeef0 (PATCH)
   - Route: https://book-catelogue.vercel.app/api/v1/delete-book/64b1c57f55e0e56b539eeef0 (DELETE)

   #### Reviews
   - Route: https://book-catelogue.vercel.app/api/v1/review/64b1c57f55e0e56b539eeef0 (POST)
   - Route: https://book-catelogue.vercel.app/api/v1/review/64b1c57f55e0e56b539eeef0 (GET)

   ### Filtering routes of Books
    - Route: https://book-catelogue.vercel.app/api/v1/books?searchTerm=and
    - Route: https://book-catelogue.vercel.app/api/v1/books?genre=Adventure