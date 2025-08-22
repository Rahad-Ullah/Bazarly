# Bazarly - Multi Vendor E-commerce Platform dsfasd

## Introduction

**Bazarly** is a modern and scalable e-commerce platform that provides a seamless shopping experience for customers, efficient shop management for vendors, and powerful tools for administrators to oversee operations. With advanced features like product filtering, flash sales, and vendor following. Bazarly redefines online shopping.

## Project Description

**Bazarly** enables customers to browse and purchase products from various vendors effortlessly. Vendors can manage their shops, products, and orders through an intuitive dashboard. Admins have complete control to manage users, vendors, and products. The platform is built with scalability and performance in mind, offering a robust and responsive e-commerce solution.

### [Live Site](https://bazarly-client.vercel.app)

```base
https://bazarly-client.vercel.app
```

## Features

### Customer Features

- **User Authentication:**
  Securely sign up and log in with email and password.

- **Browse Products:** Explore a wide range of products across    multiple categories.

- **Advanced Filtering:** Filter products by category, price range, and other attributes.

- **Follow Vendors:** Follow your favorite vendors to prioritize their products in your feed.

- **Flash Sales:** Access exclusive discounts during time-limited flash sales.

- **Cart Management:** Add products to your cart and proceed to checkout. The cart supports products from one vendor at a time.

- **Product Comparison:** Compare up to three products based on attributes like price, category, and ratings.

- **Order History:** View a detailed history of past orders and their statuses.

- **Product Reviews:** Leave reviews and ratings for purchased products.

### Vendor Features

- **Vendor Dashboard:** Manage shop details, inventory, and orders from a centralized dashboard.

- **Product Management:** Add, edit, duplicate, and delete products with attributes like name, price, images, and discounts.

- **Order Tracking:** Track orders and manage inventory in real-time.

- **Customer Feedback:** View and respond to customer reviews.

### Admin Features

- **Admin Dashboard:** Monitor and control platform activities, including users and vendor shops.

- **User and Vendor Management:** Approve, suspend, or delete user and vendor accounts.

- **Product Categories:** Dynamically add, edit, or remove product categories.

- **Transaction Monitoring:** Oversee all transactions and booking activities.


## Technology Stacks

### Frontend

- TypeScript
- React.js
- Redux Toolkit
- Redux RTK Query
- Shadcn UI
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (database)
- Cloudinary (for image storage)
- Aamarpay (for payments)
- JWT (for authorization)

## Installation Guideline

Follow the instructions given below to install and run the project locally.

### Prerequisites

- Node.js
- Code Editor (E.g. Visual Studio Code)

### Steps to Install

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Rahad-Ullah/Bazarly.git
   ```

2. **Navigate to the Client Directory:**
    ```bash
    cd bazarly
    ```
   
3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Frontend:**

   ```bash
   npm run dev
   ```
5. **Clone the Backend Repository:**
  
    ```bash
    git clone https://github.com/Rahad-Ullah/bazarly-server.git
    ```
6. **Navigate to the Server Directory:**

    ```bash
    cd bazarly-server
    ```
7. **Install Dependencies:**

    ```bash
    npm install
    ```

8. **Set Up Environment Variables:** Create a `.env` file in the server root directory and add the following:

    ```bash
    DATABASE_URL=your_postgresql_database_url
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    JWT_SECRET=your_jwt_secret
    ```

9. **Run the Backend:**

    ```bash
    npm run dev
    ```

10. **Access the Application: Open your browser and go to:**

    ```bash
    http://localhost:5173
    ```

## Usage

 **For Customers:**
  - Browse products, filter categories, and add items to your cart.
  - Checkout using Aamarpay.

2. **For Vendors:**
  - Manage your shop and inventory through the vendor dashboard.

3. **For Admins:**
  - Oversee platform operations and manage users and vendors from the admin dashboard.

## Happy Shopping! 🛍️