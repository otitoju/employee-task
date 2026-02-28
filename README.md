# Employee Directory Mobile App

A modern React Native employee directory application built with Expo, TypeScript, and Redux.

## 🚀 Features

- **Employee Listing**: Browse through all employees with search functionality
- **Employee Details**: View detailed information about each employee
- **Dark/Light Theme**: Toggle between dark and light modes
- **Offline Support**: Data persistence using Redux Persist
- **Search & Filter**: Real-time employee search
- **Responsive Design**: Optimized for mobile devices
- **Error Handling**: Graceful error handling and loading states

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Navigation**: React Navigation Stack
- **API Client**: Axios
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons & Images**: Expo Image
- **Storage**: AsyncStorage

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/otitoju/employee-task.git
cd employee-task
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```

### 4. Run on Device/Simulator
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal

## 📱 App Navigation

- **Home Screen**: Employee list with search functionality
- **Employee Detail**: Detailed view of selected employee
- **Theme Toggle**: Available in the header

## 🏗 Architecture & Design Decisions

### **Folder Structure**
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Card, etc.)
│   ├── employee/       # Employee-specific components
│   └── layout/         # Layout components (Header, etc.)
├── contexts/           # React contexts (Theme)
├── hooks/              # Custom hooks
├── navigation/         # Navigation configuration
├── screens/            # Screen components
├── services/           # API services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### **State Management**
- **Redux Toolkit**: For predictable state management
- **Redux Persist**: For offline data caching
- **TypeScript Integration**: Full type safety throughout the app

### **API Integration**
- **Axios**: HTTP client with interceptors for logging and error handling
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during API calls

### **UI/UX Design**
- **Theme System**: Consistent color scheme with dark/light mode
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper contrast ratios and touch targets
- **Performance**: Optimized FlatList rendering and memoization

### **Code Quality**
- **TypeScript**: Full type safety and better developer experience
- **ESLint**: Code linting for consistency
- **Component Composition**: Reusable and maintainable components
- **Custom Hooks**: Separation of concerns and reusability

## 🔧 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS  
- `npm run web` - Start on web

## 🐛 Known Issues & Solutions

### Worklets Version Mismatch Error
If you encounter a worklets version mismatch error:

**Option A (Recommended)**: Use Development Build
```bash
npm install -g eas-cli
eas login
eas build --profile development --platform ios
npx expo start --dev-client
```

**Option B**: Use Expo Go Compatible Version
```bash
npx expo install react-native-reanimated@~3.10.1
```

## 📊 Performance Optimizations

- **FlatList**: Efficient rendering for large employee lists
- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Optimize expensive computations
- **Image Caching**: Efficient image loading with Expo Image
- **Redux Persist**: Minimize API calls with cached data

## 🔮 Future Enhancements

- [ ] Pull-to-refresh functionality
- [ ] Employee favorites/bookmarks
- [ ] Advanced filtering options
- [ ] Push notifications
- [ ] Offline mode indicators
- [ ] Employee contact integration
- [ ] Unit and integration tests

## 👨‍💻 Developer Notes

- The app uses DummyJSON API for employee data
- Redux DevTools integration available in development
- Proper error boundaries implemented for production stability
- Type-safe throughout with comprehensive TypeScript interfaces

## 📄 License