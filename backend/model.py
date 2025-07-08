import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import os

class WaitTimePredictionModel:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.is_trained = False
        self.model_path = 'wait_time_model.joblib'
    
    def generate_synthetic_data(self, n_samples=10000):
        """Generate synthetic training data for the model"""
        np.random.seed(42)
        
        data = []
        for _ in range(n_samples):
            # Generate realistic queue scenarios
            queue_length = np.random.randint(0, 50)
            active_counters = np.random.randint(1, 6)
            avg_service_time = np.random.uniform(2, 8)  # 2-8 minutes per customer
            
            # Time of day (minutes since midnight)
            time_of_day = np.random.randint(480, 1260)  # 8 AM to 9 PM
            hour = time_of_day // 60
            
            # Day of week (0=Monday, 6=Sunday)
            day_of_week = np.random.randint(0, 7)
            is_weekend = day_of_week >= 5
            
            # Rush hour definition (8-10 AM, 12-2 PM, 5-7 PM)
            is_rush_hour = (8 <= hour <= 10) or (12 <= hour <= 14) or (17 <= hour <= 19)
            
            # Calculate base wait time
            if active_counters > 0:
                customers_per_counter = queue_length / active_counters
                base_wait_time = customers_per_counter * avg_service_time
            else:
                base_wait_time = queue_length * avg_service_time
            
            # Add realistic variations
            if is_rush_hour:
                base_wait_time *= np.random.uniform(1.2, 1.5)  # 20-50% longer during rush
            
            if is_weekend:
                base_wait_time *= np.random.uniform(1.1, 1.3)  # 10-30% longer on weekends
            
            # Add some randomness
            wait_time = max(0, base_wait_time + np.random.normal(0, 2))
            
            data.append({
                'current_queue_length': queue_length,
                'number_of_active_counters': active_counters,
                'average_service_time_per_customer': avg_service_time,
                'time_of_day': time_of_day,
                'day_of_week': day_of_week,
                'is_weekend': is_weekend,
                'is_rush_hour': is_rush_hour,
                'wait_time': wait_time
            })
        
        return pd.DataFrame(data)
    
    def train_model(self, data=None):
        """Train the wait time prediction model"""
        if data is None:
            print("Generating synthetic training data...")
            data = self.generate_synthetic_data()
        
        # Prepare features and target
        feature_columns = [
            'current_queue_length', 'number_of_active_counters',
            'average_service_time_per_customer', 'time_of_day',
            'day_of_week', 'is_weekend', 'is_rush_hour'
        ]
        
        X = data[feature_columns]
        y = data['wait_time']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train model
        print("Training RandomForest model...")
        self.model.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print(f"Model Performance:")
        print(f"Mean Absolute Error: {mae:.2f} minutes")
        print(f"R² Score: {r2:.3f}")
        
        self.is_trained = True
        return self.model
    
    def save_model(self):
        """Save the trained model to disk"""
        if self.is_trained:
            joblib.dump(self.model, self.model_path)
            print(f"Model saved to {self.model_path}")
    
    def load_model(self):
        """Load the trained model from disk"""
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.is_trained = True
            print(f"Model loaded from {self.model_path}")
            return True
        return False
    
    def predict_wait_time(self, queue_length, active_counters, avg_service_time, 
                         time_of_day, day_of_week, is_weekend, is_rush_hour):
        """Predict wait time for given parameters"""
        if not self.is_trained:
            raise ValueError("Model not trained. Call train_model() first.")
        
        # Prepare input data
        input_data = np.array([[
            queue_length, active_counters, avg_service_time,
            time_of_day, day_of_week, is_weekend, is_rush_hour
        ]])
        
        # Make prediction
        prediction = self.model.predict(input_data)[0]
        return max(0, round(prediction, 1))  # Ensure non-negative and round to 1 decimal

# Flask API
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize model
predictor = WaitTimePredictionModel()

# Try to load existing model, otherwise train a new one
if not predictor.load_model():
    predictor.train_model()
    predictor.save_model()

def parse_time_input(time_str):
    """Convert time string (HH:MM) to minutes since midnight"""
    try:
        if isinstance(time_str, str) and ':' in time_str:
            hour, minute = map(int, time_str.split(':'))
            return hour * 60 + minute
        else:
            return int(time_str)  # Assume it's already in minutes
    except:
        return 720  # Default to 12:00 PM if parsing fails

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint for wait time prediction"""
    try:
        data = request.json
        
        # Extract and validate input parameters
        queue_length = int(data.get('current_queue_length', 0))
        active_counters = max(1, int(data.get('number_of_active_counters', 1)))
        avg_service_time = float(data.get('average_service_time_per_customer', 5.0))
        time_of_day = parse_time_input(data.get('time_of_day', '12:00'))
        day_of_week = int(data.get('day_of_week', 0))  # 0=Monday, 6=Sunday
        is_weekend = bool(data.get('is_weekend', day_of_week >= 5))
        is_rush_hour = bool(data.get('is_rush_hour', False))
        
        # Auto-detect rush hour if not provided
        if 'is_rush_hour' not in data:
            hour = time_of_day // 60
            is_rush_hour = (8 <= hour <= 10) or (12 <= hour <= 14) or (17 <= hour <= 19)
        
        # Make prediction
        predicted_wait_time = predictor.predict_wait_time(
            queue_length, active_counters, avg_service_time,
            time_of_day, day_of_week, is_weekend, is_rush_hour
        )
        
        return jsonify({
            'predicted_wait_time': predicted_wait_time,
            'unit': 'minutes',
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_trained': predictor.is_trained
    })

if __name__ == '__main__':
    print("Starting Q-Line Wait Time Prediction API...")
    print("Available endpoints:")
    print("  POST /predict - Predict wait time")
    print("  GET /health - Health check")
    app.run(debug=True, host='0.0.0.0', port=5000)