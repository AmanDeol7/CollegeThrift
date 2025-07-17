# 🎓 CollegeThrift

<div align="center">

![CollegeThrift Logo](https://img.shields.io/badge/CollegeThrift-E--Commerce-pink?style=for-the-badge&logo=shopify&logoColor=white)

**A Modern E-Commerce Platform for College Students**

*Buy and sell second-hand items within your college community*

[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-4.19.2-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.2.3-purple?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)

</div>

## 📖 Overview

CollegeThrift is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application designed specifically for college students. It provides a secure and user-friendly platform for buying and selling second-hand items within the college community, promoting sustainability and affordability.

## ✨ Features

### 🛒 **User Features**
- **User Authentication**: Secure registration and login with JWT
- **Product Browsing**: Advanced search and filtering capabilities
- **Shopping Cart**: Add, remove, and modify cart items
- **Wishlist**: Save favorite products for later
- **Order Management**: Track order status and history
- **Product Reviews**: Rate and review purchased items
- **PayPal Integration**: Secure payment processing
- **Responsive Design**: Seamless experience across all devices

### 👑 **Admin Features**
- **Admin Dashboard**: Comprehensive overview of platform metrics
- **User Management**: View and manage registered users
- **Product Management**: Full CRUD operations for products
- **Category Management**: Organize products into categories
- **Order Management**: Process and track all orders
- **File Upload**: Secure image upload for products
- **Sales Analytics**: Track total sales and performance metrics

### 🔧 **Technical Features**
- **RESTful API**: Clean and well-documented backend APIs
- **State Management**: Redux Toolkit with RTK Query
- **Real-time Updates**: Dynamic cart and wishlist updates
- **Image Upload**: Multer-based file handling
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Robust error management
- **Security**: Password hashing, JWT tokens, CORS protection

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - User interface library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - Component library
- **React Icons** - Icon library
- **React Toastify** - Notification system
- **Vite** - Build tool and development server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### **Payment & Deployment**
- **PayPal SDK** - Payment processing
- **Vercel** - Deployment platform
- **MongoDB Atlas** - Cloud database

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (for database)
- [PayPal Developer Account](https://developer.paypal.com/) (for payments)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AmanDeol7/collegeThrift.git
   cd collegeThrift
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

5. **Start Development Servers**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run them separately:
   # Backend only
   npm run backend
   
   # Frontend only (in another terminal)
   npm run frontend
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
CollegeThrift/
├── backend/                 # Backend application
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── index.js            # Entry point
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # State management
│   │   └── Utils/          # Utility functions
│   └── dist/               # Build output
├── uploads/                # Uploaded images
├── .env                    # Environment variables
├── package.json            # Dependencies & scripts
└── vercel.json            # Deployment configuration
```

## 🔑 API Endpoints

### Authentication
- `POST /api/users/` - Register user
- `POST /api/users/auth` - Login user
- `POST /api/users/logout` - Logout user
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products/` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products/` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add product review

### Orders
- `POST /api/orders/` - Create order
- `GET /api/orders/mine` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)

### Categories
- `GET /api/category/` - Get all categories
- `POST /api/category/` - Create category (Admin)
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Elegant dark sidebar navigation
- **Interactive Elements**: Hover effects and smooth transitions
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Real-time user feedback
- **Product Carousel**: Featured products showcase
- **Advanced Filtering**: Search, category, and price filters

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side data validation
- **CORS Protection**: Cross-origin request handling
- **Admin Authorization**: Role-based access control
- **Secure File Upload**: Image validation and storage

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🚢 Deployment

### Vercel Deployment

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

The application is configured for Vercel deployment with proper routing for both frontend and backend.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Aman Deol** - Full Stack Developer
- GitHub: [@AmanDeol7](https://github.com/AmanDeol7)

## 📧 Support

If you have any questions or need support, please:
- Create an issue on GitHub
- Contact the development team

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for reliable database services
- PayPal for secure payment integration
- Tailwind CSS for beautiful styling utilities
- All contributors and users of CollegeThrift

---

<div align="center">

**Made with ❤️ for the college community**

*Promoting sustainability through second-hand trading*

</div>
   
   
