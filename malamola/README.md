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

1. price toggle
2. sorting (past projects last, newest first)
3. language (add with toggle)
4. product option display (hover over selection to update other elements)
5. product tags
6. product actions (wish/enquire/order)
. cart actions

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
