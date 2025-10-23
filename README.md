# Paytm-Like Payment App

## 🚀 Overview
I've completed the development of a **Paytm-like payment app**! This project has been both challenging and rewarding, helping me advance my skills significantly.

## 🛠 Tech Stack
- **Frontend & Backend:** Next.js
- **Auxiliary Backend:** Express 
- **Monorepo Management:** Turborepo
- **Database:** PostgreSQL with Prisma ORM
- **UI Styling:** Tailwind CSS
- **Authentication:** NextAuth
- **Language:** TypeScript

## 💰 About the App
- **Add Money from Bank:** Users can add money from their bank directly into the app. I implemented a **custom bank-webhook using Express** to simulate the process of adding funds, even though it’s a dummy webhook designed for this project.
- **Money Transfers:** Transfer funds to friends via phone number with ease.
- **Transaction History:** Users can review their recent transactions, keeping track of their spending.

## 🏗 Development Process
- **Next.js** was used to handle both the frontend and backend.
- **Express** was used specifically for handling the **bank-webhook**.
- **PostgreSQL with Prisma ORM** provided a **reliable and scalable** database solution.
- **Tailwind CSS** allowed for rapid development of responsive and custom UI components.
- **NextAuth** was integrated for **secure user login and management**.

## 🔄 CI/CD
- Automated testing and deployment with a robust **CI/CD pipeline**, ensuring smooth and reliable updates.

## ☁ Deployment
- Deployed both the **Next.js app** and the **bank-webhook** to **AWS EC2 using Docker**, providing a **consistent and scalable environment**.

## 🛠 Setup Instructions
Follow these steps to set up and run the project:

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/karthiksriramoju/payment-applicatoin.git
   cd payment-application
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Navigate to the Next.js App:**
   ```sh
   cd apps/user-app
   ```

4. **Start the Development Server:**
   ```sh
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and go to `http://localhost:3000`

---

### 📌 Feel free to explore the project and contribute! 🚀
