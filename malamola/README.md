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
-->

<!--
TODO:

1. show stock update => limited qty

2. qty of items to add at product/[id] page (+- CSR component)

3. All products filter to other categories w/ tabs

4. Admin userType + admin-specific pages (see 5a.)

5. Navbar:
    (Right-corner)
    a. Profile (auth-login) => add links to admin-protected pages => manage-inventory, manage-about, manage-enquiries, manage-orders, manage-FAQs, manage-users, dashboard
    c. Language
    b. Favourites

    (Center - maybe)
    a. Dropdown - Shop > All, Mola, Seasonal, DIY kits, Gifts
    b. Dropdown - About > FillyFlower, Our Biodiversity, Materials

6. Mongodb document data expiry (anonymous cart items)

7. About, Contact, FAQs pages

-->
