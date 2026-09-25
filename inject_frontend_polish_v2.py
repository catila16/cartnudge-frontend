import re

with open('src/components/Phase2Dashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Recovery Rate: 25 -> Recovery Rate: 25%
content = content.replace("Recovery Rate: {kpis.recovery_rate}</div>", "Recovery Rate: {kpis.recovery_rate}%</div>")

# %100 -> 100%
content = content.replace("%100\n                                </text>", "100%\n                                </text>")

with open('src/components/Phase2Dashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Frontend dashboard polished.")

with open('src/components/MerchantControls.tsx', 'r', encoding='utf-8') as f:
    content2 = f.read()

content2 = content2.replace('badge: "Luxury Brands",', 'badge: "BRAND TRUST",')

with open('src/components/MerchantControls.tsx', 'w', encoding='utf-8') as f:
    f.write(content2)
print("Frontend controls polished.")
