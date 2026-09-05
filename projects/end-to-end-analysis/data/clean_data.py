"""
Data Cleaning Script for Superstore Dataset
This script demonstrates data cleaning techniques used in real-world projects
"""

import csv
from collections import defaultdict

def clean_data():
    """Clean the raw data and create a cleaned version"""
    
    input_file = '/workspace/portfolio/projects/end-to-end-analysis/data/superstore_raw.csv'
    output_file = '/workspace/portfolio/projects/end-to-end-analysis/data/superstore_cleaned.csv'
    
    cleaned_records = []
    issues_found = defaultdict(int)
    
    with open(input_file, 'r') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        
        for row in reader:
            issues = []
            
            # 1. Validate Sales
            try:
                sales = float(row['Sales'])
                if sales < 0:
                    issues.append('negative_sales')
                    issues_found['negative_sales'] += 1
            except:
                issues.append('invalid_sales')
                
            # 2. Validate Profit
            try:
                profit = float(row['Profit'])
                if profit < -1000:  # Flag extreme losses
                    issues_found['extreme_loss'] += 1
            except:
                issues.append('invalid_profit')
                
            # 3. Validate Quantity
            try:
                qty = int(row['Quantity'])
                if qty <= 0:
                    issues.append('zero_quantity')
                    issues_found['zero_quantity'] += 1
                if qty > 50:  # Flag unusually high
                    issues_found['high_quantity'] += 1
            except:
                issues.append('invalid_quantity')
                
            # 4. Validate Discount
            try:
                discount = float(row['Discount'])
                if discount > 0.5:  # Flag excessive discounts
                    issues_found['high_discount'] += 1
                    row['Discount'] = '0.30'  # Cap at 30%
            except:
                row['Discount'] = '0'
                
            # 5. Validate Dates
            if row['Order Date'] > row['Ship Date']:
                issues.append('date_error')
                issues_found['date_errors'] += 1
                
            # 6. Clean State names
            # (in production, would validate against state list)
            
            # 7. Standardize Categories
            valid_categories = ['Technology', 'Furniture', 'Office Supplies']
            if row['Category'] not in valid_categories:
                issues_found['invalid_category'] += 1
                
            cleaned_records.append(row)
    
    # Write cleaned data
    with open(output_file, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(cleaned_records)
    
    # Print cleaning report
    print("=" * 50)
    print("DATA CLEANING REPORT")
    print("=" * 50)
    print(f"Total Records Processed: {len(cleaned_records)}")
    print(f"Records Written: {len(cleaned_records)}")
    print("\n--- Issues Found ---")
    for issue, count in sorted(issues_found.items()):
        print(f"  {issue}: {count}")
    print("=" * 50)
    print(f"✅ Cleaned data saved to: {output_file}")

if __name__ == '__main__':
    clean_data()
