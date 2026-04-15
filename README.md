# Flipkart Clone - Full Stack E-Commerce Platform

This is a full-stack e-commerce web application that closely replicates Flipkart's design and user experience. Built for a Software Development Engineer (SDE) Intern Fullstack Assignment.

## Features

- **Product Listing:** View products with filtering and sorting options.
- **Product Details:** View multi-image carousels, full specifications, highlights, and stock.
- **Shopping Cart:** Add, remove, update quantities, and view price breakdowns.
- **Checkout Flow:** Fill out delivery details and view order summaries.
- **Order Management:** View order confirmations and order history.
- **Wishlist:** Save products to your wishlist for later.

## Tech Stack

- **Frontend:** React.js + Vite, React Router DOM, Axios, CSS Modules/Vanilla CSS
- **Backend:** Node.js + Express.js, Sequelize ORM
- **Database:** PostgreSQL

## Local Setup

### 1. Database Setup

Ensure you have PostgreSQL installed and running. Create a database called `flipkart_clone`:

```bash
psql -U postgres -c "CREATE DATABASE flipkart_clone;"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Configure your `.env` file in the `server` directory (update `DB_PASSWORD` if necessary):

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flipkart_clone
DB_USER=postgres
DB_PASSWORD=your_password_here
NODE_ENV=development
```

Seed the database with sample products and categories:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

In a new terminal window:

```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Assumptions & Notes

- **Authentication:** As per the assignment instructions, no login functionality is required. A default user (id=1) is assumed to be logged in for all operations.
- **Mock Data:** The database is seeded with 23 realistic mock products across 6 categories. Images are sourced from Unsplash.
- **Design System:** The design closely follows Flipkart's current UI guidelines, including color schemes, typography (Roboto), buttons, form fields, and hover/click interactions.
- **Deployment:** For production, the frontend can be deployed to Vercel/Netlify, while the backend can be hosted on a service like Render or Railway. Make sure to update the API base URL in the frontend and configure CORS in the backend accordingly.

## Database Schema Highlights

- **Categories**: ID, name, slug, icon
- **Products**: Category ID, name, price, stock, rating, images JSON, specs JSON, etc.
- **Users**: (Default user created on seed)
- **Addresses**: Linked to users
- **Cart/Wishlist**: Standard relational mappings to Products and Users
- **Orders & OrderItems**: Records final snapshot of price and details at checkout

## License

This project is intended exclusively for assignment demo purposes.
