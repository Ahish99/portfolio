-- =====================================================
-- SUPERSTORE SALES ANALYSIS - SQL QUERIES
-- End-to-End Data Analysis Project
-- =====================================================

-- Connect: Use this with MySQL, PostgreSQL, SQLite, or any SQL tool
-- sqlite3 superstore.db < analysis_queries.sql

-- Load data (for SQLite)
-- .mode csv
-- .import superstore_raw.csv sales_data

-- =====================================================
-- 1. BASIC OVERVIEW
-- =====================================================

-- Total Records
SELECT COUNT(*) AS total_orders FROM sales_data;

-- Total Sales & Profit
SELECT 
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Profit), 2) AS avg_profit,
    ROUND(SUM(Profit) / SUM(Sales) * 100, 2) AS profit_margin_pct
FROM sales_data;

-- =====================================================
-- 2. SALES BY CATEGORY
-- =====================================================

SELECT 
    Category,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Profit), 2) AS avg_profit,
    ROUND(SUM(Profit) / SUM(Sales) * 100, 2) AS profit_margin
FROM sales_data
GROUP BY Category
ORDER BY total_sales DESC;

-- =====================================================
-- 3. SALES BY REGION
-- =====================================================

SELECT 
    Region,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Profit), 2) AS avg_profit,
    ROUND(SUM(Profit) / SUM(Sales) * 100, 2) AS profit_margin
FROM sales_data
GROUP BY Region
ORDER BY total_sales DESC;

-- =====================================================
-- 4. SALES BY SEGMENT
-- =====================================================

SELECT 
    Segment,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Order Quantity), 2) AS avg_quantity
FROM sales_data
GROUP BY Segment
ORDER BY total_sales DESC;

-- =====================================================
-- 5. TOP 10 STATES BY SALES
-- =====================================================

SELECT 
    State,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(SUM(Profit) / SUM(Sales) * 100, 2) AS profit_margin
FROM sales_data
GROUP BY State
ORDER BY total_sales DESC
LIMIT 10;

-- =====================================================
-- 6. MONTHLY TREND ANALYSIS (2022-2024)
-- =====================================================

SELECT 
    strftime('%Y', "Order Date") AS year,
    strftime('%m', "Order Date") AS month,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit
FROM sales_data
GROUP BY year, month
ORDER BY year, month;

-- =====================================================
-- 7. YEAR-OVER-YEAR GROWTH
-- =====================================================

WITH yearly AS (
    SELECT 
        strftime('%Y', "Order Date") AS year,
        SUM(Sales) AS total_sales,
        SUM(Profit) AS total_profit
    FROM sales_data
    GROUP BY year
)
SELECT 
    year,
    ROUND(total_sales, 2) AS sales,
    ROUND(total_profit, 2) AS profit,
    ROUND(total_profit / total_sales * 100, 2) AS profit_margin,
    LAG(total_sales) OVER (ORDER BY year) AS prev_year_sales,
    ROUND((total_sales - LAG(total_sales) OVER (ORDER BY year)) / 
          LAG(total_sales) OVER (ORDER BY year) * 100, 2) AS sales_growth_pct
FROM yearly
ORDER BY year;

-- =====================================================
-- 8. SHIP MODE ANALYSIS
-- =====================================================

SELECT 
    "Ship Mode",
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(AVG(Sales), 2) AS avg_order_value
FROM sales_data
GROUP BY "Ship Mode"
ORDER BY total_sales DESC;

-- =====================================================
-- 9. DISCOUNT IMPACT ANALYSIS
-- =====================================================

SELECT 
    CASE 
        WHEN Discount = 0 THEN 'No Discount'
        WHEN Discount <= 0.10 THEN '1-10%'
        WHEN Discount <= 0.20 THEN '11-20%'
        WHEN Discount <= 0.30 THEN '21-30%'
        ELSE '30%+'
    END AS discount_range,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Profit), 2) AS avg_profit,
    ROUND(SUM(Profit) / SUM(Sales) * 100, 2) AS profit_margin
FROM sales_data
GROUP BY discount_range
ORDER BY discount_range;

-- =====================================================
-- 10. UNPROFITABLE PRODUCTS (Negative Profit)
-- =====================================================

SELECT 
    "Sub-Category",
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Discount) * 100, 2) AS avg_discount_pct
FROM sales_data
WHERE Profit < 0
GROUP BY "Sub-Category"
ORDER BY total_profit ASC;

-- =====================================================
-- 11. RFM ANALYSIS (Recency, Frequency, Monetary)
-- =====================================================

WITH customer_stats AS (
    SELECT 
        "Customer ID",
        MAX("Order Date") AS last_order_date,
        COUNT(*) AS order_frequency,
        SUM(Sales) AS total_sales,
        SUM(Profit) AS total_profit
    FROM sales_data
    GROUP BY "Customer ID"
)
SELECT 
    "Customer ID",
    last_order_date,
    order_frequency,
    ROUND(total_sales, 2) AS total_sales,
    ROUND(total_profit, 2) AS total_profit,
    CASE 
        WHEN total_profit > 1000 THEN 'Premium'
        WHEN total_profit > 500 THEN 'High Value'
        WHEN total_profit > 0 THEN 'Standard'
        ELSE 'At Risk'
    END AS customer_tier
FROM customer_stats
ORDER BY total_profit DESC
LIMIT 20;

-- =====================================================
-- 12. CATEGORY BY REGION BREAKDOWN
-- =====================================================

SELECT 
    Region,
    Category,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit
FROM sales_data
GROUP BY Region, Category
ORDER BY Region, total_sales DESC;

-- =====================================================
-- 13. ORDER PRIORITY ANALYSIS
-- =====================================================

SELECT 
    "Order Priority",
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit,
    ROUND(AVG(Quantity), 2) AS avg_quantity
FROM sales_data
GROUP BY "Order Priority"
ORDER BY total_sales DESC;

-- =====================================================
-- 14. QUARTERLY PERFORMANCE
-- =====================================================

SELECT 
    strftime('%Y', "Order Date") AS year,
    CASE 
        WHEN CAST(strftime('%m', "Order Date") AS INTEGER) BETWEEN 1 AND 3 THEN 'Q1'
        WHEN CAST(strftime('%m', "Order Date") AS INTEGER) BETWEEN 4 AND 6 THEN 'Q2'
        WHEN CAST(strftime('%m', "Order Date") AS INTEGER) BETWEEN 7 AND 9 THEN 'Q3'
        ELSE 'Q4'
    END AS quarter,
    COUNT(*) AS order_count,
    ROUND(SUM(Sales), 2) AS total_sales,
    ROUND(SUM(Profit), 2) AS total_profit
FROM sales_data
GROUP BY year, quarter
ORDER BY year, quarter;

-- =====================================================
-- 15. CUSTOMER LIFETIME VALUE
-- =====================================================

SELECT 
    Segment,
    COUNT(DISTINCT "Customer ID") AS total_customers,
    ROUND(SUM(Sales) / COUNT(DISTINCT "Customer ID"), 2) AS avg_customer_value,
    ROUND(SUM(Profit) / COUNT(DISTINCT "Customer ID"), 2) AS avg_customer_profit
FROM sales_data
GROUP BY Segment
ORDER BY avg_customer_profit DESC;
