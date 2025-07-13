import json
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import threading

class QueueManager:
    def __init__(self):
        self.queues: Dict[str, Dict] = {}
        self.customers: Dict[str, Dict] = {}
        self.lock = threading.Lock()
        
    def create_queue(self, shop_id: str, shop_name: str = None) -> Dict:
        """Create a new queue for a shop"""
        with self.lock:
            queue_data = {
                'shop_id': shop_id,
                'shop_name': shop_name or f'Shop {shop_id}',
                'customers': [],
                'active_counters': 2,
                'avg_service_time': 4.0,
                'is_active': True,
                'created_at': datetime.now().isoformat(),
                'total_served_today': 0,
                'stats': {
                    'total_customers': 0,
                    'avg_wait_time': 0,
                    'peak_hour': '14:00'
                }
            }
            self.queues[shop_id] = queue_data
            return queue_data
    
    def join_queue(self, shop_id: str, customer_name: str, phone_number: str) -> Dict:
        """Add a customer to the queue"""
        with self.lock:
            if shop_id not in self.queues:
                self.create_queue(shop_id)
            
            queue = self.queues[shop_id]
            if not queue['is_active']:
                raise ValueError("Queue is currently inactive")
            
            customer_id = f"{shop_id}_{len(queue['customers']) + 1}_{int(time.time())}"
            
            customer_data = {
                'customer_id': customer_id,
                'name': customer_name,
                'phone': phone_number,
                'join_time': datetime.now().isoformat(),
                'position': len(queue['customers']) + 1,
                'estimated_wait': self._calculate_wait_time(shop_id, len(queue['customers']) + 1),
                'status': 'waiting'
            }
            
            queue['customers'].append(customer_data)
            self.customers[customer_id] = {
                **customer_data,
                'shop_id': shop_id
            }
            
            return customer_data
    
    def serve_next_customer(self, shop_id: str) -> Optional[Dict]:
        """Serve the next customer in queue"""
        with self.lock:
            if shop_id not in self.queues:
                return None
            
            queue = self.queues[shop_id]
            if not queue['customers']:
                return None
            
            served_customer = queue['customers'].pop(0)
            served_customer['status'] = 'served'
            served_customer['served_at'] = datetime.now().isoformat()
            
            # Update positions for remaining customers
            for i, customer in enumerate(queue['customers']):
                customer['position'] = i + 1
                customer['estimated_wait'] = self._calculate_wait_time(shop_id, i + 1)
            
            # Update stats
            queue['total_served_today'] += 1
            queue['stats']['total_customers'] += 1
            
            return served_customer
    
    def get_queue_status(self, shop_id: str) -> Optional[Dict]:
        """Get current queue status"""
        with self.lock:
            if shop_id not in self.queues:
                return None
            
            queue = self.queues[shop_id].copy()
            queue['current_length'] = len(queue['customers'])
            queue['last_updated'] = datetime.now().isoformat()
            
            return queue
    
    def get_customer_status(self, customer_id: str) -> Optional[Dict]:
        """Get specific customer status"""
        with self.lock:
            if customer_id not in self.customers:
                return None
            
            customer = self.customers[customer_id].copy()
            shop_id = customer['shop_id']
            
            if shop_id in self.queues:
                # Find current position
                for i, queue_customer in enumerate(self.queues[shop_id]['customers']):
                    if queue_customer['customer_id'] == customer_id:
                        customer['position'] = i + 1
                        customer['estimated_wait'] = self._calculate_wait_time(shop_id, i + 1)
                        break
                else:
                    # Customer not in queue anymore (served or left)
                    customer['position'] = 0
                    customer['estimated_wait'] = 0
            
            customer['last_updated'] = datetime.now().isoformat()
            return customer
    
    def update_queue_settings(self, shop_id: str, active_counters: int = None, 
                            avg_service_time: float = None, is_active: bool = None) -> bool:
        """Update queue settings"""
        with self.lock:
            if shop_id not in self.queues:
                return False
            
            queue = self.queues[shop_id]
            
            if active_counters is not None:
                queue['active_counters'] = max(1, min(10, active_counters))
            
            if avg_service_time is not None:
                queue['avg_service_time'] = max(1.0, min(20.0, avg_service_time))
            
            if is_active is not None:
                queue['is_active'] = is_active
            
            # Recalculate wait times for all customers
            for i, customer in enumerate(queue['customers']):
                customer['estimated_wait'] = self._calculate_wait_time(shop_id, i + 1)
            
            return True
    
    def _calculate_wait_time(self, shop_id: str, position: int) -> float:
        """Calculate estimated wait time for a position"""
        if shop_id not in self.queues or position <= 0:
            return 0
        
        queue = self.queues[shop_id]
        customers_ahead = position - 1
        
        if queue['active_counters'] > 0:
            customers_per_counter = customers_ahead / queue['active_counters']
            wait_time = customers_per_counter * queue['avg_service_time']
        else:
            wait_time = customers_ahead * queue['avg_service_time']
        
        # Add some realistic variation
        current_hour = datetime.now().hour
        if 8 <= current_hour <= 10 or 12 <= current_hour <= 14 or 17 <= current_hour <= 19:
            wait_time *= 1.2  # Rush hour multiplier
        
        return max(0, round(wait_time, 1))
    
    def remove_customer(self, customer_id: str) -> bool:
        """Remove a customer from queue"""
        with self.lock:
            if customer_id not in self.customers:
                return False
            
            customer = self.customers[customer_id]
            shop_id = customer['shop_id']
            
            if shop_id in self.queues:
                queue = self.queues[shop_id]
                queue['customers'] = [c for c in queue['customers'] 
                                    if c['customer_id'] != customer_id]
                
                # Update positions
                for i, customer in enumerate(queue['customers']):
                    customer['position'] = i + 1
                    customer['estimated_wait'] = self._calculate_wait_time(shop_id, i + 1)
            
            del self.customers[customer_id]
            return True
    
    def get_all_queues(self) -> List[Dict]:
        """Get all active queues"""
        with self.lock:
            return [
                {
                    'shop_id': shop_id,
                    'shop_name': queue['shop_name'],
                    'current_length': len(queue['customers']),
                    'is_active': queue['is_active'],
                    'active_counters': queue['active_counters']
                }
                for shop_id, queue in self.queues.items()
            ]

# Global queue manager instance
queue_manager = QueueManager()