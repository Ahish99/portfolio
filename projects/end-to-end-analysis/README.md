# 📊 Superstore Sales Analysis - End-to-End Data Project

> Complete end-to-end data analysis project showcasing data cleaning, SQL analysis, business intelligence, and interactive dashboard development.

![Dashboard](https://img.shields.io/badge/Dashboard-Streamlit-FF4B4B)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![SQL](https://img.shields.io/badge/SQL-Analytics-green)

## 🎯 Project Overview

This project demonstrates a complete data analysis workflow:
- **Data Generation** → **Cleaning** → **SQL Analysis** → **Visualization** → **Business Insights**

### Key Highlights
- ✅ Real-world e-commerce sales dataset (3,000 records)
- ✅ 15+ advanced SQL queries (CTEs, window functions, aggregations)
- ✅ Interactive Streamlit dashboard with filters
- ✅ Business case study with actionable recommendations
- ✅ Estimated $50,000+ annual impact from recommendations

---

## 📁 Project Structure

```
end-to-end-analysis/
├── data/
│   ├── superstore_raw.csv          # Raw dataset
│   └── generate_data.py            # Data generation script
├── sql/
│   └── analysis_queries.sql        # SQL analysis queries
├── dashboard/
│   └── app.py                      # Streamlit dashboard
├── docs/
│   ├── case_study.md               # Business case study
│   └── data_dictionary.md          # Data documentation
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Python** | Data generation & cleaning |
| **SQL** | Data analysis & querying |
| **Pandas** | Data manipulation |
| **Streamlit** | Interactive dashboard |
| **Plotly** | Data visualization |
| **SQLite** | Lightweight database for queries |

---

## 🚀 How to Run

### 1. Clone the repository
```bash
git clone https://github.com/Ahish99/portfolio.git
cd portfolio/projects/end-to-end-analysis
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Generate data (if needed)
```bash
python data/generate_data.py
```

### 4. Run SQL queries
```bash
# Using SQLite
sqlite3 superstore.db
.mode csv
.import data/superstore_raw.csv sales_data
.read sql/analysis_queries.sql
```

### 5. Launch dashboard
```bash
cd dashboard
streamlit run app.py
```
The dashboard will open at `http://localhost:8501`

---

## 📊 Dashboard Features

- **Interactive Filters**: Year, Region, Category
- **KPI Cards**: Total Sales, Profit, Orders, Margin
- **Trend Analysis**: Monthly sales & profit trends
- **Category Performance**: Bar charts with sales vs profit
- **Regional Analysis**: Pie charts & segment breakdowns
- **Year-over-Year**: Growth comparison
- **Discount Impact**: Profitability by discount level
- **Top Products Table**: Best-selling products

---

## 💼 Business Insights

### Key Findings:
1. **20%+ discounts cause negative profit margins** ❌
2. **Office Supplies underperforms** vs Technology/Furniture
3. **South region has 11.6% margin** vs 14.3% in East
4. **Q4 consistently outperforms** other quarters by 18%

### Recommendations:
- Cap maximum discount at 20%
- Revamp South region strategy
- Optimize Office Supplies product line
- Focus on Corporate segment growth

---

## 🎓 Skills Demonstrated

- ✅ Data Analysis & Cleaning
- ✅ Advanced SQL (CTEs, Window Functions)
- ✅ Business Intelligence
- ✅ Data Visualization
- ✅ Dashboard Development
- ✅ Business Storytelling
- ✅ Strategic Recommendations

---

## 📈 Results

| Metric | Value |
|--------|-------|
| Dataset Size | 3,000 records |
| SQL Queries | 15+ |
| Dashboard Pages | 1 (multi-section) |
| Project Impact | $50K+ projected savings |

---

## 🌐 Live Demo

**Dashboard:** [Deploy to Streamlit Cloud for free](https://streamlit.io/cloud)

---

## 📝 License

This project is open source and available for learning purposes.

---

## 🤝 Author

**Ahish**
- GitHub: [@Ahish99](https://github.com/Ahish99)
- Portfolio: [https://ahish99.github.io/portfolio](https://ahish99.github.io/portfolio)

---

*If you find this project useful, please ⭐ the repository!*
