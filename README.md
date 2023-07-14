# Cow Hut Admin With Auth

  ### Live Link: https://cow-hut-admin-with-auth-nine.vercel.app
  ### Application Routes:
  
  ## Main part
  
   ### Auth (User)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/auth/login (POST)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/auth/signup (POST)
   - Route:  https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/auth/refresh-token (POST)

   ### Auth (Admin)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/admins/create-admin (POST)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/admins/login (POST)
   
   ### User
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/users (GET)  Include an id that is saved in your database
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/users/64a2f349894d334db6ed99c6 (Single GET) Include an id that is saved in your database
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/users/64a2f349894d334db6ed99c6 (PATCH) Include an id that is saved in your database
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/users/64a2f349894d334db6ed99c6 (DELETE) Include an id that is saved in your database

   #### Cows
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/cows (POST)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/cows (GET)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/cows/64a30aa8024b1e0974c85899 (Single GET) Include an id that is saved in your database
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/cows/64a30aa8024b1e0974c85899 (PATCH) Include an id that is saved in your database
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/cows/64a30aa8024b1e0974c85899 (DELETE) Include an id that is saved in your database

   #### Orders
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/orders (POST)
   - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/orders (GET)

 ## Bonus Part

#### Admin
   -Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile
- Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/users/my-profile (GET)
- Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:
 - Route: https://cow-hut-admin-with-auth-nine.vercel.app/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET)