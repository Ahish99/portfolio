import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

np.random.seed(42)
random.seed(42)

NUM_RECORDS = 3000
START_DATE = datetime(2022, 1, 1)
END_DATE = datetime(2024, 12, 31)

segments = ['Consumer', 'Corporate', 'Home Office']
regions = ['East', 'West', 'Central', 'South']
states_by_region = {
    'East': ['New York', 'Pennsylvania', 'Massachusetts', 'New Jersey', 'Connecticut'],
    'West': ['California', 'Washington', 'Oregon', 'Nevada', 'Arizona'],
    'Central': ['Illinois', 'Ohio', 'Michigan', 'Wisconsin', 'Indiana'],
    'South': ['Texas', 'Florida', 'Georgia', 'North Carolina', 'Virginia']
}
categories = {
    'Technology': ['Phones', 'Laptops', 'Accessories', 'Copiers', 'Tablets'],
    'Furniture': ['Chairs', 'Tables', 'Bookcases', 'Furnishings'],
    'Office Supplies': ['Binders', 'Paper', 'Storage', 'Art Supplies', 'Appliances']
}
ship_modes = ['Standard Class', 'Second Class', 'First Class', 'Same Day']
order_priorities = ['Low', 'Medium', 'High', 'Critical']

def generate_data():
    records = []
    for i in range(NUM_RECORDS):
        days_between = (END_DATE - START_DATE).days
        order_date = START_DATE + timedelta(days=random.randint(0, days_between))
        ship_date = order_date + timedelta(days=random.randint(1, 10))
        
        category = random.choice(list(categories.keys()))
        sub_category = random.choice(categories[category])
        region = random.choice(regions)
        state = random.choice(states_by_region[region])
        customer_id = f"CUS-{random.randint(1000, 9999)}"
        segment = random.choice(segments)
        product_id = f"PROD-{random.randint(10000, 99999)}"
        quantity = random.randint(1, 10)
        unit_price = round(random.uniform(5, 500), 2)
        discount = round(random.choice([0, 0, 0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]), 2)
        sales = round(quantity * unit_price * (1 - discount), 2)
        profit = round(sales * random.uniform(-0.3, 0.4), 2)

        records.append({
            'Order ID': f'ORD-{10000 + i}',
            'Order Date': order_date.strftime('%Y-%m-%d'),
            'Ship Date': ship_date.strftime('%Y-%m-%d'),
            'Ship Mode': random.choice(ship_modes),
            'Customer ID': customer_id,
            'Customer Name': f'Customer {customer_id.split("-")[1]}',
            'Segment': segment,
            'Country': 'United States',
            'City': f'City_{random.randint(1, 100)}',
            'State': state,
            'Region': region,
            'Product ID': product_id,
            'Category': category,
            'Sub-Category': sub_category,
            'Product Name': f'{sub_category} Product {product_id.split("-")[1]}',
            'Sales': sales,
            'Quantity': quantity,
            'Discount': discount,
            'Profit': profit,
            'Order Priority': random.choice(order_priorities)
        })
    return pd.DataFrame(records)

df = generate_data()
df.to_csv('/workspace/portfolio/projects/end-to-end-analysis/data/superstore_raw.csv', index=False)
print(f"Generated {len(df)} records")
print(df.head())
