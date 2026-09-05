#!/bin/bash
# Generate realistic Superstore-style sales data

OUTPUT="/workspace/portfolio/projects/end-to-end-analysis/data/superstore_raw.csv"

# Header
echo "Order ID,Order Date,Ship Date,Ship Mode,Customer ID,Customer Name,Segment,Country,City,State,Region,Product ID,Category,Sub-Category,Product Name,Sales,Quantity,Discount,Profit,Order Priority" > "$OUTPUT"

# Data generation using awk
awk -v seed=42 '
BEGIN {
    srand(42)
    split("Consumer|Corporate|Home Office", segments, "|")
    split("East|West|Central|South", regions, "|")
    split("New York|California|Texas|Illinois|Florida|Washington|Pennsylvania|Ohio|Georgia|Virginia", states, "|")
    split("Technology|Furniture|Office Supplies", categories, "|")
    split("Phones|Laptops|Accessories|Copiers|Chairs|Tables|Bookcases|Binders|Paper|Storage", subcats, "|")
    split("Standard Class|Second Class|First Class|Same Day", ships, "|")
    split("Low|Medium|High|Critical", priorities, "|")
    
    months[1]="Jan"; months[2]="Feb"; months[3]="Mar"; months[4]="Apr"
    months[5]="May"; months[6]="Jun"; months[7]="Jul"; months[8]="Aug"
    months[9]="Sep"; months[10]="Oct"; months[11]="Nov"; months[12]="Dec"
}

NR > 1 {
    order_id = sprintf("ORD-%d", 10000 + NR - 1)
    
    # Random date between 2022-2024
    year = int(rand() * 3) + 2022
    month = int(rand() * 12) + 1
    day = int(rand() * 28) + 1
    order_date = sprintf("%04d-%02d-%02d", year, month, day)
    
    # Ship date (1-10 days later)
    ship_days = int(rand() * 10) + 1
    ship_date = order_date  # Simplified
    
    ship_mode = ships[int(rand() * 4) + 1]
    customer_id = sprintf("CUS-%d", int(rand() * 9000) + 1000)
    customer_name = "Customer " customer_id
    segment = segments[int(rand() * 3) + 1]
    country = "United States"
    city = "City_" int(rand() * 100)
    state = states[int(rand() * 10) + 1]
    region = regions[int(rand() * 4) + 1]
    product_id = sprintf("PROD-%d", int(rand() * 90000) + 10000)
    
    cat_idx = int(rand() * 3) + 1
    category = categories[cat_idx]
    sub_category = subcats[int(rand() * 10) + 1]
    product_name = sub_category " Product " product_id
    
    quantity = int(rand() * 10) + 1
    unit_price = 5 + rand() * 495
    discount = 0
    d = rand()
    if (d > 0.7) discount = 0.05
    if (d > 0.8) discount = 0.10
    if (d > 0.9) discount = 0.15
    if (d > 0.95) discount = 0.20
    
    sales = quantity * unit_price * (1 - discount)
    profit = sales * (0.7 + rand() * 0.4 - 0.15)  # Some negative margins
    
    order_priority = priorities[int(rand() * 4) + 1]
    
    printf "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,\"%s\",%.2f,%d,%.2f,%.2f,%s\n", \
        order_id, order_date, ship_date, ship_mode, customer_id, customer_name, \
        segment, country, city, state, region, product_id, category, sub_category, \
        product_name, sales, quantity, discount, profit, order_priority >> "/workspace/portfolio/projects/end-to-end-analysis/data/superstore_raw.csv"
}

END {
    print "Done"
}
' <(seq 1 3000)
echo "Generated 3000 records"
head -5 /workspace/portfolio/projects/end-to-end-analysis/data/superstore_raw.csv
wc -l /workspace/portfolio/projects/end-to-end-analysis/data/superstore_raw.csv
