# Malamola - Filly Flower Crafts

Malamola is a full-stack web application for an e-commerce platform to sell handcrafted embroidery products. Users get to browse a catalogue of products from different categories, based on themes from our vast biodiversity. Due to the handcrafted nature of the products, not all items on display can meet the longer duration of production and delivery lead time. Thus some products are readily available for order, while some are displayed for requests to the admin.

Apart from the products on display, the platform is meant to be educational and assist the admin for collaborative purposes. Users will also be guided to the admin's social accounts like instagram and YouTube for tutorials for DIY products.

## Installation / Dependencies

### To set up:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mervin-njy/malamola.git
   ```

2. **Navigate to Project Directory**

   ```bash
   cd malamola
   ```

3. **Install dependencies** (from scratch for reference)

   ```bash
   npx create-next-app@latest                                           # 1. nextjs

   npm i prettier eslint-config-prettier prettier-plugin-tailwindcss    # 2. tailwind & prettier formatting
   npm i -D daisyui@latest                                              # 3. daisyUI (UI utilities)
   npm install react-icons --save                                       # 4. react-icons
   npm i --save react-flagkit                                           # 5. country flag icons
   npm install classnames                                               # 6. classnames

   npm i prisma @prisma/client                                          # 7. prisma (db management)
   npm i next/auth @auth/prisma-adapter                                 # 8. next-auth

   npm i zod                                                            # 9. zod (validation)
   npm i react-hook-form                                                # 10. react-hook-form

   npm i react-redux @reduxjs/toolkit                                   # 11. react redux toolkit (state management)
   ```

4. **Prisma commands**

   ```bash
   npm primsa init      # /prisma/schema.prisma
   npx prisma db pull   # convert db schema to prisma schema | INSTROSPECTION
   npx prisma db push   # reverses ^ after you make changes to prisma model
   npx prisma generate  # regenerate prisma client upon changes
   ```

5. **Create .env in /app folder**

Ensure following variables match the corresponding credentials on mongodb and google cloud (auth provider):

- DATABASE_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_URL
- NEXTAUTH_SECRET

### To run server

1. **Start the Server:**

   ```bash
   npm run dev
   ```

#### Extensions:

1. tailwindcss intellisense
   => Files: Association => \*.css: tailwindcss
   => Editor: Quick Suggestions => strings: on

2. prettier - code formatter
   => prettier.config.cjs
   => Editor: Default Formatter
   => .eslintrc.json => "extends" +"prettier" to prevent conflict

3. ESlint ^ => see the warnings directly in code editor instead of terminal

4. Prisma ORM
   => see prisma extension at lib/db/prisma.ts

## CREDITS

[React](https://react-icons.github.io/react-icons/)
[React-flagkit](https://github.com/stephenway/react-flagkit)

<!--
TODO:

1. price toggle *** DONE
2. language (add with toggle) *** DONE - but only affects price and not text
3. product option display (hover over selection to update other elements) *** DONE

4. furnish details for product/[id] page:
   - link to category filter
   - group price + qty + BtnAddToCart
   - product actions => Order && BtnAddToCart / Enquire && BtnEnquireProduct / Wish && BtnAddFavourite
5. sorting (past projects last, newest first)

6. Admin Update Product

7. More product details (db + UI):
   - product tags
   - group photo URL
   - add related products (admin inventory update function + display in product/[id])

9. product actions => admin
10. updateNavbar cart after mergingAnnonymousCart when logged in (debounce)

- All products filter to other categories w/ tabs:
 . product page (DONE)
 . inventory (admin) page (DONE)
 . sort () => 'Past' least priority, else 'CreatedAt' top priority

- product display:
 . wish / enquire / order for individual products (DONE for admin)
 . display options with button => smoothen animation / use option toggles
 . price display toggle => ProductsPrice SGD || TWD

- Navbar:
 a. language + currency

- /admin/inventory => updateProduct, deleteProduct

- product schema:
 . add product tags (i.e. mammal, fish, bird)
 . add imageUrl [] for group photos to display
 . add groupPhotoUrl

- product quantity updates for admin
 . order > preparing > ready > delivery > completed
 . wishedFor > 10 => select change to action: request
 . request link to enquiries

- send out email to Admin & User for notifications
 . order initiation
 . wishedFor > 10
     . Admin - change to request?
     . User - wish list product has been updated to request availability
 . request initiation

- SelectQuantity (CSR component) +-qty of items to add at product/[id] page

- Nextjs noSSR dynamic lazy loading

- About, Contact, FAQs pages

- User: user pages:
 a. profile => show updatable info:
     i. delivery details
     ii. payment options
 b. favourite/likes
 c. reviews
 d. enquiries
 e. orders

- Admin userType + admin-specific pages => done with inventory
 a. users, orders, enquiries, dashboard

-->

```

```
