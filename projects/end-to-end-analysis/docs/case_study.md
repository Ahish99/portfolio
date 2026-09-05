# 📊 Superstore Sales Performance Analysis
## End-to-End Data Analysis Case Study

---

## 🎯 Business Problem

A national retail chain is experiencing inconsistent profitability across their product categories and regions. Leadership needs actionable insights to:

1. **Identify** which product categories are underperforming
2. **Understand** regional sales variations and their causes
3. **Optimize** discount strategies to improve profit margins
4. **Develop** data-driven recommendations for Q1-Q4 2025 planning

---

## 📋 Executive Summary

| Metric | Value |
|--------|-------|
| Total Revenue | $1,034,567 |
| Total Profit | $136,234 |
| Overall Profit Margin | 13.2% |
| Total Orders | 3,000 |
| Time Period | Jan 2022 - Dec 2024 |

---

## 📈 Key Findings

### 1. Category Performance

| Category | Sales | Profit | Profit Margin |
|----------|-------|--------|---------------|
| Technology | $412,456 | $62,789 | 15.2% ✅ |
| Furniture | $356,234 | $48,234 | 13.5% ⚠️ |
| Office Supplies | $265,877 | $25,211 | 9.5% ❌ |

**Insight:** Office Supplies has the lowest profit margin despite significant sales volume.

---

### 2. Regional Analysis

| Region | Sales | Profit | Profit Margin |
|--------|-------|--------|---------------|
| East | $298,456 | $42,567 | 14.3% ✅ |
| West | $287,234 | $39,876 | 13.9% ✅ |
| Central | $256,123 | $31,456 | 12.3% ⚠️ |
| South | $192,754 | $22,335 | 11.6% ❌ |

**Insight:** South region underperforms despite having comparable order volumes.

---

### 3. Discount Impact Analysis

| Discount Level | Orders | Avg Profit | Profit Margin |
|----------------|--------|------------|---------------|
| No Discount | 1,050 | $45.23 | 22.4% ✅ |
| 1-10% | 900 | $32.15 | 16.1% ✅ |
| 11-20% | 750 | $8.45 | 4.2% ⚠️ |
| 21-30% | 300 | -$12.34 | -6.2% ❌ |

**Critical Finding:** Discounts above 20% result in NEGATIVE profit margins!

---

## 🔍 Root Cause Analysis

### Why is Office Supplies underperforming?
1. **Heavy discounting** on binders and paper products
2. **Low unit margins** not covering operational costs
3. **High shipping costs** relative to product value

### Why is the South region underperforming?
1. **Concentration of discounts** in this territory
2. **Fewer high-value orders** from corporate segment
3. **Longer shipping times** reducing customer satisfaction

---

## 💡 Strategic Recommendations

### Priority 1: Fix Discount Strategy (Impact: +$25,000/year)
- **Cap maximum discount at 20%** across all categories
- **Implement region-specific discount limits**
- **Create discount approval workflow** for orders >15%

### Priority 2: Improve South Region Performance (Impact: +$15,000/year)
- **Target Corporate segment** with personalized outreach
- **Reduce shipping times** with local distribution
- **Increase marketing spend** by 15% in underperforming states

### Priority 3: Optimize Office Supplies (Impact: +$10,000/year)
- **Reevaluate product line** - discontinue negative margin items
- **Bundle low-margin items** with high-margin Technology products
- **Increase prices** by 5-10% to improve unit economics

---

## 📊 Implementation Timeline

| Quarter | Action Items | Expected Impact |
|---------|-------------|-----------------|
| **Q1 2025** | Implement discount caps, launch South region initiative | +$20,000 |
| **Q2 2025** | Product line optimization, pricing adjustments | +$15,000 |
| **Q3 2025** | Full regional rollout of best practices | +$10,000 |
| **Q4 2025** | Performance review and 2026 planning | Validation |

---

## 📁 Project Artifacts

| File | Description |
|------|-------------|
| `data/superstore_raw.csv` | Raw dataset (3,000 records) |
| `data/cleaned_data.csv` | Cleaned dataset for analysis |
| `sql/analysis_queries.sql` | 15+ SQL queries for analysis |
| `dashboard/app.py` | Interactive Streamlit dashboard |
| `docs/case_study.md` | This document |

---

## 🛠️ Tools & Technologies Used

- **Python** - Data generation, preprocessing
- **SQL** - Data querying and analysis
- **Streamlit** - Interactive dashboard creation
- **Plotly** - Data visualization
- **GitHub** - Version control and deployment

---

## 📈 Business Impact (Projected)

| Metric | Current | Target (Q4 2025) | Change |
|--------|---------|-----------------|--------|
| Profit Margin | 13.2% | 16.5% | +3.3% |
| South Region Margin | 11.6% | 14.0% | +2.4% |
| Avg Order Profit | $45.41 | $55.00 | +21% |
| Negative Margin Orders | 12% | <5% | -58% |

---

## 🎓 Skills Demonstrated

✅ Data cleaning & preprocessing  
✅ SQL complex queries (CTEs, window functions, aggregations)  
✅ Exploratory Data Analysis (EDA)  
✅ Business intelligence & storytelling  
✅ Interactive dashboard development  
✅ Data-driven decision making  
✅ Executive-level communication  

---

## 🔗 Live Dashboard

**Deployed URL:** [Your Streamlit Cloud URL after deployment]

---

*Document prepared by: Ahish*  
*Date: September 2024*  
*Analysis Type: End-to-End Data Analysis*
