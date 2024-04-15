# Mala Mola

Malamola is a full-stack web application for an e-commerce platform to sell handcrafted embroidery products made by [fillyflower_crafts](https://www.instagram.com/fillyflower_crafts/), which attempts to raise awareness of our biodiversity with their beautifully crafted embroidery products. They also designed DIY kits with tutorials that can be found in their YouTube channel (TBC).

Users get to browse a catalogue of products from different categories, based on themes from our vast biodiversity. Due to the handcrafted nature of the products, not all items on display can meet the longer duration of production and delivery lead time. Thus some products are readily available for order, while some are displayed for requests to the admin.

Apart from the products on display, the platform is meant to be educational and assist the admin for collaborative purposes. Users will also be guided to the admin's social accounts like instagram and YouTube for tutorials for DIY products.

Technologies used:

| **Features** | **Tech Stack**                    |
| -----------: | --------------------------------- |
|     Frontend | React with TypeScript and Next.js |
|      Styling | Tailwindcss, DaisyUI              |
|      Backend | Prisma, MongoDB                   |
|    Utilities | Redux, React-hook-form, Zod       |

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

The initial set up and basic pages were built while following the tutorial by [codinginflow](https://www.instagram.com/fillyflower_crafts/).
[React icons](https://react-icons.github.io/react-icons/)
[React-flagkit](https://github.com/stephenway/react-flagkit)

<!-- ## Diagrams -->

<!-- #### Snapshots -->

<!-- ![welcome page](./diagrams/snapshots/welcome-page.png) -->

<!-- ![records adding page](./diagrams/snapshots/add-records-page.png) -->

<!-- ![admin page](./diagrams/snapshots/admin-page.png) -->

<!-- ## Challenges & unsolved problems -->
