# Q-Line – Smart Queue Management System

A comprehensive AI-powered queue management solution for small retail shops with real-time updates, dual authentication, and intelligent wait time predictions.

## 🚀 Features

### For Customers
- **Smart Queue Joining**: Join queues using unique shop IDs
- **Real-time Updates**: Live position and wait time tracking
- **Mobile-friendly Interface**: Responsive design for all devices
- **Intelligent Notifications**: Get notified when it's your turn

### For Shop Owners
- **Live Queue Management**: Real-time queue monitoring and control
- **Customer Service Tools**: Serve customers with one click
- **Analytics Dashboard**: Insights into customer flow and wait times
- **Flexible Settings**: Adjust counters and service times on the fly

### AI-Powered Predictions
- **Machine Learning**: Random Forest algorithm for accurate predictions
- **Context-aware**: Considers time of day, rush hours, and weekends
- **Continuous Learning**: Improves accuracy over time

## 🏗️ Architecture

### Frontend (React)
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Dual Authentication**: Separate portals for customers and shop owners
- **Real-time Updates**: Live data synchronization
- **Responsive Design**: Works on desktop, tablet, and mobile

### Backend (Flask + Python)
- **RESTful API**: Clean API design for all operations
- **Queue Management**: Sophisticated queue handling system
- **AI Predictions**: Machine learning-powered wait time estimation
- **Data Persistence**: Reliable data storage and retrieval

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python model.py
   ```
   Server runs at `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   Application runs at `http://localhost:3000`

## 📱 How to Use

### For Customers
1. **Access Customer Portal**: Click "Customer Portal" on the landing page
2. **Join Queue**: Enter queue ID (get from shop), your name, and phone number
3. **Track Progress**: Monitor your position and estimated wait time in real-time
4. **Get Notified**: Receive updates when it's almost your turn

### For Shop Owners
1. **Access Business Dashboard**: Click "Business Dashboard" on the landing page
2. **Login**: Use demo credentials (admin/admin123) or your shop credentials
3. **Manage Queue**: 
   - View all customers in queue
   - Serve next customer with one click
   - Adjust active counters and service times
   - Pause/resume queue operations
4. **Monitor Analytics**: Track daily statistics and customer flow

## 🔧 API Endpoints

### Queue Management
- `POST /api/queue/join` - Join a queue
- `GET /api/queue/status/<shop_id>` - Get queue status
- `GET /api/customer/status/<customer_id>` - Get customer status
- `POST /api/queue/serve/<shop_id>` - Serve next customer
- `PUT /api/queue/settings/<shop_id>` - Update queue settings
- `GET /api/queues` - Get all active queues

### AI Predictions
- `POST /predict` - Get wait time prediction
- `GET /health` - Health check

## 🎨 Design Features

### Modern UI/UX
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Micro-interactions and hover effects
- **Consistent Typography**: Clean, readable fonts
- **Intuitive Navigation**: Easy-to-use interface design

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Experience**: Full-featured desktop interface

### Accessibility
- **High Contrast**: Readable text on all backgrounds
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Screen Reader Support**: Semantic HTML structure

## 🔒 Security Features

- **Input Validation**: All user inputs are validated
- **Error Handling**: Graceful error management
- **Session Management**: Secure user session handling
- **CORS Protection**: Proper cross-origin resource sharing

## 📊 Analytics & Insights

### Real-time Metrics
- Current queue length
- Average wait times
- Customer throughput
- Peak hours identification

### Historical Data
- Daily customer counts
- Service efficiency trends
- Customer satisfaction metrics
- Operational insights

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `build` folder to your hosting platform

### Backend Deployment (Render/Heroku)
1. Ensure all dependencies are in `requirements.txt`
2. Set environment variables if needed
3. Deploy the backend folder to your hosting platform

## 🔮 Future Enhancements

- **SMS Notifications**: Text message alerts for customers
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Detailed reporting and insights
- **Integration APIs**: Connect with POS systems
- **Mobile Apps**: Native iOS and Android applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

**Q-Line** - Revolutionizing queue management with AI-powered intelligence and modern user experience.