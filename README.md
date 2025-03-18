# LUXE Lead Management System

A modern, responsive Lead Management System built with React, TypeScript, and Vite. This project helps businesses efficiently manage, track, and convert leads into customers with a beautiful and intuitive interface.

## 🌟 Features

- 👥 Lead Management
  - Create and track new leads
  - Lead status tracking
  - Lead scoring and prioritization
  - Lead source tracking
- 📊 Analytics Dashboard
  - Lead conversion metrics
  - Performance analytics
  - Custom reports
- 🔐 Secure Authentication
  - Role-based access control
  - Multi-user support
  - Secure login system
- 📱 Modern Interface
  - Responsive design
  - Dark/Light mode
  - Intuitive navigation
- 📧 Communication Tools
  - Email integration
  - Lead follow-up tracking
  - Communication history
- 📈 Lead Pipeline
  - Customizable pipeline stages
  - Drag-and-drop interface
  - Visual pipeline view
- 🔍 Advanced Search
  - Filter leads by various criteria
  - Quick search functionality
  - Advanced filtering options
- 📱 Mobile Access
  - Mobile-responsive design
  - On-the-go lead management
  - Real-time updates

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** React Query
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Backend:** Supabase
- **Email Service:** SendGrid
- **Charts:** Recharts
- **Animations:** Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/deeptimaan-k/LUXE-Lead-Management-System.git
cd LUXE-Lead-Management-System
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENDGRID_API_KEY=your_sendgrid_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 🔑 Admin Access

For admin access to the platform:
- **Email:** radiant2522@gmail.com
- **Password:** Radiant@4452

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── leads/     # Lead-related components
│   ├── dashboard/ # Dashboard components
│   └── common/    # Shared components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
│   ├── leads/     # Lead management pages
│   ├── dashboard/ # Analytics dashboard
│   └── settings/  # System settings
└── App.tsx        # Main application component
```

## 🛡️ Security

- All sensitive data is stored securely in Supabase
- Passwords are hashed and never stored in plain text
- API keys are protected through environment variables
- Secure authentication flow with protected routes
- Role-based access control for different user types
- Regular security audits and updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Deeptimaan K - Initial work

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Recharts](https://recharts.org/) for the analytics visualizations 
