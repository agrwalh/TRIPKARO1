
# **Trip Tales - Personalized Travel Itinerary Generator**

## **Introduction**
**Trip Tales** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The project provides a comprehensive platform for users to create, manage, and share personalized travel itineraries based on preferences like budget, interests, and trip duration.

## **Features**

1. **User Authentication**
   - Secure registration and login functionality with password hashing.
   - Role-based access control for different users (Admin, User).

2. **Personalized Itinerary Creation**
   - Users can input travel preferences such as budget, destinations, trip duration, and special requirements.
   - A dynamic itinerary generator that tailors travel plans based on user input.

3. **Dashboard**
   - Users can manage their profile, view past and upcoming itineraries, and make adjustments.
   - Admins have the ability to manage users and itineraries.

4. **Responsive Design**
   - A fully responsive interface ensuring a seamless experience across all device types (mobile, tablet, desktop).


## **Technologies Used**

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) for secure user authentication.
- **Version Control:** Git, GitHub
- **Deployment:** Netlify for frontend, Heroku for backend

## **Project Structure**

### **Frontend**
```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # Site icon
│   └── manifest.json       # PWA configuration
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Main application pages
│   ├── redux/              # Redux store for global state management
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── styles/             # Stylesheets
│   ├── assets/             # Images and static files
│   ├── App.jsx             # Main app component
│   └── index.js            # Entry point
```

### **Backend**
```
backend/
├── models/                 # MongoDB schemas
├── controllers/            # Application logic for each route
├── routes/                 # API route definitions
├── middleware/             # Custom middleware (e.g., JWT verification)
├── utils/                  # Helper functions (e.g., error handling)
└── server.js               # Application entry point
```

## **Setup Instructions**

### **Frontend Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/frontend.git
   ```
2. Change into the project directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend Setup**

1. Clone the backend repository:
   ```bash
   git clone https://github.com/your-username/api.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

## **Future Enhancements**

- **Integration with external APIs** for real-time flight and hotel bookings.
- **Itinerary Sharing** sers can share their itineraries with others via social media or email.
- **Explore Popular Destinations** Users can browse and explore popular travel destinations with detailed descriptions and images.

