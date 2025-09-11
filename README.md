# 🤖 AI Assistant

A modern, full-stack web application that provides a personalized AI assistant experience. This project features a dynamic, interactive user interface and a robust backend powered by Node.js, Express, and Google's Gemini API for intelligent responses.



## ✨ Features

* **User Authentication**: Secure user registration and login system using JWT (JSON Web Tokens) and password hashing.
* **Personalized Experience**: Users can update their profile, including their name and assistant preferences.
* **Interactive UI**: A sleek, modern frontend built with React and Tailwind CSS, featuring a dynamic particle background.
* **AI-Powered Commands**: Interact with an intelligent assistant that can:
    * Tell the current date, time, day, or month.
    * Perform Google and YouTube searches.
    * Handle general conversation and queries through the Gemini API.
    * Open popular applications like Instagram or a calculator.
* **Command History**: All interactions with the assistant are saved for each user.
* **Cloud Media Uploads**: Profile and assistant images are seamlessly uploaded and managed via Cloudinary.

---

## 🛠️ Tech Stack

This project is a full-stack monorepo with a separate frontend and backend.

### Frontend

| Technology     | Description                                               |
| :------------- | :-------------------------------------------------------- |
| **React** | A JavaScript library for building user interfaces.        |
| **Vite** | A modern, lightning-fast build tool and development server. |
| **Tailwind CSS**| A utility-first CSS framework for rapid UI development.   |
| **React Router**| For client-side routing and navigation.                   |
| **Axios** | A promise-based HTTP client for making API requests.      |
| **tsParticles**| A library for creating highly customizable particle animations. |

### Backend

| Technology      | Description                                                    |
| :-------------- | :------------------------------------------------------------- |
| **Node.js** | A JavaScript runtime environment.                              |
| **Express.js** | A minimal and flexible Node.js web application framework.      |
| **MongoDB** | A NoSQL database for storing user and application data.        |
| **Mongoose** | An elegant MongoDB object modeling tool for Node.js.           |
| **JWT** | For implementing secure user authentication tokens.            |
| **bcryptjs** | A library for hashing user passwords securely.                 |
| **Cloudinary** | A cloud service for managing image and video uploads.          |
| **Multer** | Middleware for handling `multipart/form-data`, used for file uploads. |
| **Gemini API** | Google's API for powering the assistant's AI capabilities.     |
| **dotenv** | For managing environment variables.                            |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later recommended)
* npm or yarn
* MongoDB instance (local or cloud-based like MongoDB Atlas)
* Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/ADVAYA1/Assistant.git](https://github.com/ADVAYA1/Assistant.git)
    cd Assistant
    ```

2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Environment Variables

The backend requires a set of environment variables to function correctly.

1.  Create a `.env` file in the `backend` directory: `backend/.env`
2.  Add the following variables, replacing the placeholder values with your actual credentials:

    ```env
    # MongoDB Connection
    MONGO_DB_URL=your_mongodb_connection_string

    # JWT Secret Key
    JWT_SECRET=a_very_strong_and_secret_key

    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # Google Gemini API Key
    GEMINI_API_KEY=your_gemini_api_key

    # Server Port
    PORT=8000
    ```

### Running the Application

1.  **Start the backend server:**
    * Navigate to the `backend` directory and run:
    ```sh
    npm run dev
    ```
    The server should now be running on `http://localhost:8000` (or the port you specified).

2.  **Start the frontend development server:**
    * In a separate terminal, navigate to the `frontend` directory and run:
    ```sh
    npm run dev
    ```
    The application should now be accessible at `http://localhost:5173` (or the port Vite chooses).
