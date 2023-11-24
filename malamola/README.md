<!-- ## Installation / Dependencies

#### Dependencies:

1. npx create-next-app@latest
2. npm i -D daisyui@latest
3. npm install react-icons --save
4. npm install classnames
5. npm i prisma @prisma/client
    a. npm primsa init => /prisma/schema.prisma
    b. npx prisma db pull => convert db schema to prisma schema | INSTROSPECTION
    c. npx prisma db push => reverses ^ after you make changes to prisma model
    d. npx prisma generate
6. npm i next/auth @auth/prisma-adapter
7. npm i prettier eslint-config-prettier prettier-plugin-tailwindcss
8. npm i zod
9. npm i react-hook-form

#### Extensions:
1. tailwindcss intellisense
    => Files: Association => *.css: tailwindcss
    => Editor: Quick Suggestions => strings: on

2. prettier - code formatter
    => prettier.config.cjs
    => Editor: Default Formatter
    => .eslintrc.json => "extends" +"prettier" to prevent conflict

3. ESlint ^ => see the warnings directly in code editor instead of terminal

4. Prisma ORM
    => see prisma extension at lib/db/prisma.ts

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/vercel-caching-issue
Deployment: package.json => scripts => see vercel caching problem with prisma
-->

<!--
TODO:

- /admin/inventory => updateProduct, deleteProduct

- product schema:
    a. imageUrl => []
    b. optionDIY => String if (product.category === "mola") "/products/[id]"
    c. optionColour => [] if (product.category === "DIY") colour
        - think of how to change imageDisplay
    z. price => ProductsPrice SGD || TWD

- show stock update => limited qty (max 10 for DIY, preorder for mola)

- SelectQuantity (CSR component) +-qty of items to add at product/[id] page

- All products filter to other categories w/ tabs

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

- Navbar:
    a. language + currency

-->
