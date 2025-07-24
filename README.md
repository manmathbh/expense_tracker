# Expense Tracker 💸

<div align="center">

![Project Banner](https://i.imgur.com/your-project-image.png)
</div>

A full-stack web application designed to help users manage their finances by tracking expenses. Built with Node.js, Express, MongoDB, and a vanilla JavaScript frontend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stars](https://img.shields.io/github/stars/manmathbh/expense-tracker?style=social)

---

## 📋 Table of Contents

- [Expense Tracker 💸](#expense-tracker-)
  - [📋 Table of Contents](#-table-of-contents)
  - [## About The Project](#-about-the-project)
  - [## Key Features](#-key-features)
  - [## Tech Stack](#-tech-stack)
  - [## Live Demo](#-live-demo)
  - [## Getting Started](#-getting-started)
    - [### Prerequisites](#-prerequisites)
    - [### Installation](#-installation)
  - [## Connect](#-connect)

---

## ## About The Project

This project is a complete expense tracker that includes user authentication and full CRUD functionality for managing expenses. The goal was to build a secure, functional, and user-friendly application that demonstrates the entire development and deployment lifecycle of a full-stack project.

---

## ## Key Features

-   🔐 **Secure Authentication:** JWT-based user sign-up and login system.
-   📊 **Interactive Dashboard:** Dynamic pie chart for category-wise expense visualization using Chart.js.
-   📝 **Full CRUD Functionality:** Users can easily add, view, edit, and delete their expenses.
-   ⬇️ **Data Export:** Download expense reports as either a **CSV** or **PDF** file.
-   📱 **Responsive Design:** A clean and modern UI that works on both desktop and mobile devices.

---

## ## Tech Stack

A look at the technologies that power this application.

| Frontend                               | Backend                           | Database                           | Deployment                         |
| -------------------------------------- | --------------------------------- | ---------------------------------- | ---------------------------------- |
| `HTML5` `CSS3` `JavaScript` `Chart.js` | `Node.js` `Express.js` `JWT` `CORS` | `MongoDB` `Mongoose` `MongoDB Atlas` | `Netlify (Frontend)` `Render (Backend)` |

---

## ## Live Demo

You can view and test the live, deployed application here:

-   **Live Site URL:** [https://graceful-sundae-d41e85.netlify.app](https://graceful-sundae-d41e85.netlify.app)
---

## ## Getting Started

To get a local copy up and running, follow these simple steps.

### ### Prerequisites

Make sure you have Node.js and MongoDB installed on your system.
* **Node.js:** [https://nodejs.org/](https://nodejs.org/)
* **MongoDB Community Server:** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### ### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/manmathbh/expense-tracker.git](https://github.com/manmathbh/expense-tracker.git)
    cd expense-tracker
    ```

2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Set Up Environment Variables:**
    -   Create a `.env` file in the `backend` folder.
    -   Add the following, replacing the placeholders with your own values:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        ```

4.  **Run the Backend Server:**
    ```sh
    node server.js
    ```

5.  **Run the Frontend:**
    -   Navigate to the `frontend` folder.
    -   Open the `index.html` file with a live server extension (like the one in VS Code).

---

## ## Connect

Manmath - [LinkedIn](https://www.linkedin.com/in/mnmth/) - mnmth133@gmail.com

Project Link: [https://github.com/manmathbh/expense-tracker](https://github.com/manmathbh/expense-tracker)

---