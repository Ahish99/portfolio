# 📖 Data Dictionary

## Superstore Sales Dataset

### Overview
- **Total Records:** 3,000
- **Date Range:** January 2022 - December 2024
- **Granularity:** One row per order
- **Format:** CSV

### Column Definitions

| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| `Order ID` | String | Unique order identifier | ORD-10001 |
| `Order Date` | Date | Date order was placed | 2022-04-20 |
| `Ship Date` | Date | Date order was shipped | 2022-04-25 |
| `Ship Mode` | String | Shipping method | Standard Class |
| `Customer ID` | String | Unique customer identifier | CUS-3251 |
| `Customer Name` | String | Customer full name | Customer CUS-3251 |
| `Segment` | String | Customer segment | Consumer |
| `Country` | String | Country of order | United States |
| `City` | String | City name | City_86 |
| `State` | String | State name | Illinois |
| `Region` | String | Geographic region | East |
| `Product ID` | String | Unique product identifier | PROD-42849 |
| `Category` | String | Product category | Technology |
| `Sub-Category` | String | Product sub-category | Phones |
| `Product Name` | String | Product name | Phones Product 42849 |
| `Sales` | Float | Total sales amount | 109.89 |
| `Quantity` | Integer | Units sold | 2 |
| `Discount` | Float | Discount applied (0-0.3) | 0.05 |
| `Profit` | Float | Total profit | 64.03 |
| `Order Priority` | String | Priority level | High |

### Value Distributions

**Segments:**
- Consumer: ~33%
- Corporate: ~33%
- Home Office: ~33%

**Categories:**
- Technology: ~33%
- Furniture: ~33%
- Office Supplies: ~33%

**Regions:**
- East, West, Central, South: ~25% each

**Ship Modes:**
- Standard Class: ~60%
- Second Class: ~20%
- First Class: ~15%
- Same Day: ~5%

### Data Quality Notes

- No null values in any field
- Order Date always <= Ship Date
- Sales = Quantity × Unit Price × (1 - Discount)
- Profit can be negative (loss-making orders)
- Discount ranges from 0% to 30%
