"""
Superstore Sales Dashboard - Interactive Data Analysis
End-to-End Data Analysis Project

To run: streamlit run app.py
To deploy: streamlit cloud (free)
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import warnings
warnings.filterwarnings('ignore')

# Page config
st.set_page_config(
    page_title="Superstore Sales Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f77b4;
        text-align: center;
        padding: 1rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem;
        border-radius: 10px;
        color: white;
        text-align: center;
    }
    .stMetric {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        padding: 1rem;
        border-radius: 8px;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_data
def load_data():
    """Load and cache the dataset"""
    try:
        df = pd.read_csv('data/superstore_raw.csv')
        df['Order Date'] = pd.to_datetime(df['Order Date'])
        df['Year'] = df['Order Date'].dt.year
        df['Month'] = df['Order Date'].dt.month
        df['YearMonth'] = df['Order Date'].dt.to_period('M')
        return df
    except:
        # Try alternative path
        df = pd.read_csv('../data/superstore_raw.csv')
        df['Order Date'] = pd.to_datetime(df['Order Date'])
        df['Year'] = df['Order Date'].dt.year
        df['Month'] = df['Order Date'].dt.month
        df['YearMonth'] = df['Order Date'].dt.to_period('M')
        return df

# Load data
df = load_data()

# Header
st.markdown('<p class="main-header">📊 Superstore Sales Analytics Dashboard</p>', unsafe_allow_html=True)
st.markdown("---")

# ============ SIDEBAR FILTERS ============
st.sidebar.header("🔍 Filters")
st.sidebar.markdown("---")

# Year filter
years = st.sidebar.multiselect(
    "Select Years",
    options=sorted(df['Year'].unique()),
    default=sorted(df['Year'].unique())
)

# Region filter
regions = st.sidebar.multiselect(
    "Select Regions",
    options=df['Region'].unique(),
    default=df['Region'].unique()
)

# Category filter
categories = st.sidebar.multiselect(
    "Select Categories",
    options=df['Category'].unique(),
    default=df['Category'].unique()
)

# Apply filters
filtered_df = df[
    (df['Year'].isin(years)) &
    (df['Region'].isin(regions)) &
    (df['Category'].isin(categories))
]

# ============ KEY METRICS ============
st.subheader("📈 Key Performance Indicators")

col1, col2, col3, col4 = st.columns(4)

total_sales = filtered_df['Sales'].sum()
total_profit = filtered_df['Profit'].sum()
total_orders = len(filtered_df)
profit_margin = (total_profit / total_sales * 100) if total_sales > 0 else 0

with col1:
    st.metric("💰 Total Sales", f"${total_sales:,.2f}")
with col2:
    st.metric("📈 Total Profit", f"${total_profit:,.2f}")
with col3:
    st.metric("🛒 Total Orders", f"{total_orders:,}")
with col4:
    st.metric("📊 Profit Margin", f"{profit_margin:.2f}%")

st.markdown("---")

# ============ CHARTS ============
st.subheader("📉 Sales & Profit Analysis")

# Sales trend by month
col1, col2 = st.columns(2)

with col1:
    st.markdown("#### Monthly Sales Trend")
    monthly = filtered_df.groupby('YearMonth').agg({
        'Sales': 'sum',
        'Profit': 'sum'
    }).reset_index()
    monthly['YearMonth'] = monthly['YearMonth'].astype(str)
    
    fig = px.line(monthly, x='YearMonth', y=['Sales', 'Profit'], 
                  labels={'value': 'Amount ($)', 'YearMonth': 'Month'},
                  color_discrete_map={'Sales': '#1f77b4', 'Profit': '#2ca02c'})
    fig.update_layout(height=350, legend=dict(orientation="h", yanchor="bottom", y=1.02))
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.markdown("#### Category Performance")
    cat_perf = filtered_df.groupby('Category').agg({
        'Sales': 'sum',
        'Profit': 'sum'
    }).reset_index()
    
    fig = px.bar(cat_perf, x='Category', y=['Sales', 'Profit'],
                 barmode='group', color_discrete_map={'Sales': '#1f77b4', 'Profit': '#2ca02c'})
    fig.update_layout(height=350, showlegend=True)
    st.plotly_chart(fig, use_container_width=True)

# Region and Segment Analysis
st.markdown("#### Regional Performance")
col1, col2 = st.columns(2)

with col1:
    region_sales = filtered_df.groupby('Region')['Sales'].sum().reset_index()
    fig = px.pie(region_sales, values='Sales', names='Region', 
                 hole=0.4, color_discrete_sequence=px.colors.qualitative.Set3)
    fig.update_layout(height=350)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    segment_perf = filtered_df.groupby('Segment').agg({
        'Sales': 'sum',
        'Profit': 'sum'
    }).reset_index()
    fig = px.bar(segment_perf, x='Segment', y=['Sales', 'Profit'],
                 barmode='group', color_discrete_map={'Sales': '#ff7f0e', 'Profit': '#d62728'})
    fig.update_layout(height=350)
    st.plotly_chart(fig, use_container_width=True)

# Year-over-Year Comparison
st.markdown("#### Year-over-Year Comparison")
yoy = filtered_df.groupby('Year').agg({
    'Sales': 'sum',
    'Profit': 'sum',
    'Order ID': 'count'
}).reset_index()
yoy.columns = ['Year', 'Sales', 'Profit', 'Orders']
yoy['Profit Margin'] = (yoy['Profit'] / yoy['Sales'] * 100).round(2)

fig = make_subplots(rows=1, cols=3, 
                   subplot_titles=['Total Sales', 'Total Profit', 'Profit Margin %'])

fig.add_trace(go.Bar(x=yoy['Year'], y=yoy['Sales'], name='Sales', marker_color='#1f77b4'), row=1, col=1)
fig.add_trace(go.Bar(x=yoy['Year'], y=yoy['Profit'], name='Profit', marker_color='#2ca02c'), row=1, col=2)
fig.add_trace(go.Scatter(x=yoy['Year'], y=yoy['Profit Margin'], name='Margin %', 
                         line=dict(color='#d62728', width=3), mode='lines+markers'), row=1, col=3)

fig.update_layout(height=350, showlegend=False)
st.plotly_chart(fig, use_container_width=True)

# Discount Impact Analysis
st.markdown("#### Discount Impact on Profitability")
discount_bins = pd.cut(filtered_df['Discount'], 
                        bins=[-0.01, 0, 0.1, 0.2, 0.3, 1],
                        labels=['No Discount', '1-10%', '11-20%', '21-30%', '30%+'])
discount_analysis = filtered_df.groupby(discount_bins).agg({
    'Sales': 'sum',
    'Profit': 'sum',
    'Order ID': 'count'
}).reset_index()
discount_analysis.columns = ['Discount Range', 'Sales', 'Profit', 'Orders']
discount_analysis['Profit Margin'] = (discount_analysis['Profit'] / discount_analysis['Sales'] * 100).round(2)

fig = px.bar(discount_analysis, x='Discount Range', y='Profit Margin', 
             color='Profit Margin', color_continuous_scale='RdYlGn')
fig.update_layout(height=300, xaxis_title='Discount Range', yaxis_title='Profit Margin (%)')
st.plotly_chart(fig, use_container_width=True)

# Top Products Table
st.markdown("#### Top 10 Products by Sales")
top_products = filtered_df.groupby('Product Name').agg({
    'Sales': 'sum',
    'Profit': 'sum',
    'Quantity': 'sum'
}).reset_index().sort_values('Sales', ascending=False).head(10)
top_products['Profit Margin'] = (top_products['Profit'] / top_products['Sales'] * 100).round(2)
st.dataframe(top_products.style.format({
    'Sales': '${:,.2f}',
    'Profit': '${:,.2f}',
    'Profit Margin': '{:.2f}%'
}), height=300)

# ============ INSIGHTS ============
st.markdown("---")
st.subheader("💡 Key Insights")

col1, col2 = st.columns(2)

with col1:
    # Best performing category
    cat_best = filtered_df.groupby('Category')['Profit'].sum().idxmax()
    cat_worst = filtered_df.groupby('Category')['Profit'].sum().idxmin()
    st.info(f"""
    **Category Performance:**
    - Best: **{cat_best}** (highest profit)
    - Worst: **{cat_worst}** (lowest profit)
    """)

with col2:
    # Best region
    region_best = filtered_df.groupby('Region')['Sales'].sum().idxmax()
    st.info(f"""
    **Regional Performance:**
    - Highest Sales: **{region_best}** region
    - Total Regions Analyzed: **{len(filtered_df['Region'].unique())}**
    """)

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: gray; padding: 1rem;">
    <p>Built with ❤️ using Streamlit | Data Analysis Project | 
    <a href="https://github.com/Ahish99/portfolio" target="_blank">View on GitHub</a></p>
</div>
""", unsafe_allow_html=True)
