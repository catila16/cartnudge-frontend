import re

with open('src/components/Phase2Dashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Pie Chart
old_pie = """                                <Pie
                                    data={mapped_lost_sales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="mappedName"
                                >"""

new_pie = """                                <Pie
                                    data={mapped_lost_sales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={mapped_lost_sales.length > 1 ? 5 : 0}
                                    stroke="none"
                                    dataKey="value"
                                    nameKey="mappedName"
                                >"""
                                
content = content.replace(old_pie, new_pie)

with open('src/components/Phase2Dashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Frontend polished!")
