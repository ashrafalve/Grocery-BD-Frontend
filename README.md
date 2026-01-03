# GroceryBD - Grocery Delivery Web Application

A production-ready, frontend-only grocery delivery web application built with React, TypeScript, and Vite. Features role-based interfaces for Users, Delivery Boys, and Admins with simulated live tracking.

![image alt](https://github.com/ashrafalve/Grocery-BD-Frontend/blob/24e7aef42a984f7dc82046b1b57fdc27f9cafd8b/Modern%20Course%20Launch%20Promotion%20Computer%20Mockup%20Facebook%20Ad%20(1).png)

## 🚀 Features

### User Interface
- Browse products by categories
- Product search and filtering
- Shopping cart with quantity management
- Checkout with address form
- Payment selection (COD / bKash manual)
- Order history and tracking
- Live delivery tracking with map
- User profile management

### Delivery Boy Interface
- Dashboard with assigned deliveries
- Order details with customer info
- Status update controls
- Live map with navigation
- Active delivery management

### Admin Dashboard
- Comprehensive statistics
- Product management (CRUD UI)
- Order management and assignment
- Delivery boy management
- bKash payment verification
- Category management

### Technical Features
- **Frontend Only** - No backend required
- **Mock Data** - Structured for easy Firebase integration later
- **Live Map Simulation** - Using Leaflet.js and OpenStreetMap
- **Role-Based Routing** - Protected routes for each user type
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Beautiful Bangladesh-themed design
- **Toast Notifications** - User feedback system
- **Context API** - State management with React Context
- **TypeScript** - Full type safety

## 📋 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Leaflet.js** - Maps (OpenStreetMap)
- **React Leaflet** - React wrapper for Leaflet
- **Context API** - State management

## 🛠️ Installation

1. **Clone or navigate to the project**
   ```bash
   cd "d:/Grocery Store/grocery-store"
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 🧑‍💻 Demo Credentials

### User Login
- Email: `rahim@example.com`
- Password: `user123`

### Delivery Boy Login
- Email: `karim@example.com`
- Password: `delivery123`

### Admin Login
- Email: `admin@grocerybd.com`
- Password: `admin123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Toast.tsx
│   ├── Loader.tsx
│   ├── Skeleton.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── CategoryCard.tsx
├── pages/
│   ├── auth/           # Authentication pages
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── user/           # User pages
│   │   ├── Home.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── OrderSuccess.tsx
│   │   ├── Orders.tsx
│   │   ├── OrderTracking.tsx
│   │   └── Profile.tsx
│   ├── delivery/       # Delivery boy pages
│   │   ├── DeliveryDashboard.tsx
│   │   ├── DeliveryOrderDetail.tsx
│   │   └── DeliveryMap.tsx
│   └── admin/          # Admin pages
│       ├── AdminDashboard.tsx
│       ├── AdminProducts.tsx
│       ├── AdminOrders.tsx
│       └── AdminDeliveryBoys.tsx
├── layouts/            # Layout components
│   └── ProtectedRoute.tsx
├── routes/             # Routing configuration
│   └── AppRoutes.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── mock/               # Mock data
│   ├── categories.ts
│   ├── products.ts
│   ├── users.ts
│   └── index.ts
├── hooks/              # Custom hooks
│   └── useToast.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── types/              # TypeScript types
│   └── index.ts
└── assets/             # Static assets
```

## 🔄 State Management

The app uses React Context API for state management:

- **AuthContext** - User authentication and session management
- **CartContext** - Shopping cart state

All state is persisted in `localStorage` for session persistence.

## 🗺️ Map Simulation

The live tracking feature simulates delivery boy movement:
- Uses Leaflet.js with OpenStreetMap tiles
- Mock GPS updates every 2-3 seconds
- Shows route between delivery boy and destination
- Multiple markers for active deliveries

## 💳 Payment Flow (Mock)

### Cash on Delivery (COD)
- Simple selection, payment on delivery
- Status: pending → completed

### bKash Payment
- User enters bKash number and transaction ID
- Admin verifies payment manually
- Status: pending → verified → completed

## 🎨 Design System

The app uses a custom design system with:
- Bangladesh-themed green color palette
- Utility classes via Tailwind
- Smooth animations and transitions
- Skeleton loaders for better UX
- Toast notifications
- Responsive breakpoints

## 🔐 Authentication & Authorization

- Role-based access control
- Protected routes for each user type
- Automatic redirection based on role
- Session persistence with localStorage

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` folder, ready for deployment to:
- Vercel
- Netlify
- Firebase Hosting
- Any static hosting service

## 🔜 Backend Integration (Future)

The app is structured for easy Firebase integration:

1. Replace mock data imports with Firebase queries
2. Update Context providers to use Firebase Auth
3. Add Firestore for real-time data
4. Integrate Firebase Storage for images
5. Add Cloud Functions for backend logic

All data structures are already Firebase-ready!

## 🐛 Known Limitations

This is a **frontend-only** demo:
- No real authentication
- No data persistence across sessions (except localStorage)
- Mock payment processing
- Simulated GPS tracking
- No image uploads

## 📝 License

This project is for demonstration purposes.

## 👨‍💻 Development

Built with ❤️ for Bangladesh's grocery delivery needs.

---

**Note**: This is a complete UI implementation. For production use, integrate with a real backend (Firebase, Node.js, etc.).
