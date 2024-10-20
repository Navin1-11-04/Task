# E-commerce Platform (Bandage)

This project is an e-commerce platform built with **React** for the frontend and **Flask** for the backend. The platform features role-based functionality for **owners** and **workers**, allowing them to manage products, view uploaded items, and handle user authentication through **Firebase**.

## Frontend

### Technologies Used
- **React**: For building the user interface.
- **Firebase**: For authentication (Google sign-in for owners, email/password for workers).
- **Axios**: For making API requests.
- **React Icons**: For including icons in the UI.
- **React Toastify**: For displaying notifications.

### Components

#### 1. Navbar Component
- Displays the logged-in user's name and provides navigation between different pages.
- Includes a **Sign Out** button that clears user data and redirects to the homepage.

#### 2. Content Component
- Displays tabbed content based on the user’s role.
- Includes options for adding products, viewing products, creating workers, and viewing uploaded products.

#### 3. Login Component
- Handles authentication for workers and owners.
  - Workers log in using email/password.
  - Owners log in using Google authentication.
- Displays error messages using Toast notifications.

#### 4. CreateWorker Component
- Allows owners to create new worker accounts by providing email, name, and password.
- Validates password confirmation before submitting and shows success/error messages.

#### 5. Product Component
- Allows users to add new products by providing product details (name, price, description, colors, and images).
- Supports multiple images and color selection.

#### 6. ProductList Component
- Fetches and displays a list of all products uploaded by workers.
- Shows product details including name, price, description, colors, and images.

#### 7. WorkerProducts Component
- Allows workers to view the products they have uploaded, filtered by their email.
- Fetches products from the backend API and displays them in a structured format.

#### 8. WorkerList Component
- Displays a list of all registered workers.
- Fetches worker data from the backend API and shows each worker's name, email, and role.

#### 9. UserContext
- Provides a context for managing user-related state throughout the app.
- Stores user email, role, and name, and updates them as needed.

---

## Backend

This backend server is built using **Flask**, **Firebase Admin SDK**, and **Firestore**. It allows workers to create products, upload images to Firebase storage, and manage user roles.

### Features

#### User Management
- Create and log in workers
- Assign roles (e.g., worker)
- Retrieve user roles and worker data

#### Product Management
- Create products with images (base64 encoded) and store in Firestore
- Retrieve products by the creator's email
- Get a list of all products

#### Firebase Integration
- Firebase authentication for user login
- Firebase storage for product images

### Installation

#### Prerequisites
- Python 3.x
- Flask
- Firebase Admin SDK
- Pillow (for image processing)
- dotenv (for loading environment variables)
- Firestore
