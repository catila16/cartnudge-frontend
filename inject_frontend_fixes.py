import re

with open('src/components/Phase2Dashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace COLORS
content = content.replace("const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'];", 
"const COLORS = ['#f43f5e', '#fb923c', '#facc15', '#60a5fa', '#a78bfa'];")

# Replace mapping
mapper = """    const CATEGORY_CONFIG: any = {
        'PRICE_TOO_HIGH': 'Fiyat Direnci',
        'SHIPPING_COST': 'Kargo Ücreti',
        'FOUND_CHEAPER': 'Daha Ucuzunu Buldu',
        'JUST_BROWSING': 'Sadece Bakıyordu'
    };
"""
content = content.replace("const { kpis, lost_sales, cross_sell, ai_insight } = data;", "const { kpis, lost_sales, cross_sell, ai_insight } = data;\n" + mapper)

# Map the array before feeding to PieChart
mapping_logic = """
    const mapped_lost_sales = lost_sales.map((entry: any) => ({
        ...entry,
        mappedName: CATEGORY_CONFIG[entry.name] || entry.name
    }));
"""
content = content.replace("const getUrgencyColor = (level: str) => {", mapping_logic + "\n    const getUrgencyColor = (level: string) => {")
content = content.replace("(level: str)", "(level: string)")

# Fix the Pie Chart
old_pie = """                                <Pie
                                    data={lost_sales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {lost_sales.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>"""

new_pie = """                                <Pie
                                    data={mapped_lost_sales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="mappedName"
                                >
                                    {mapped_lost_sales.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="24" fontWeight="bold">
                                    %100
                                </text>
                                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#a1a1aa" fontSize="12">
                                    Fiyat Direnci
                                </text>"""
                                
content = content.replace(old_pie, new_pie)

with open('src/components/Phase2Dashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Frontend updated!")
