import re

with open('src/components/KPICards.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Import formatCurrency
content = content.replace("import { DollarSign, MessageCircle, TrendingUp, Percent } from 'lucide-react';", 
"import { DollarSign, MessageCircle, TrendingUp, Percent } from 'lucide-react';\nimport { formatCurrency } from '../utils/currency';")

# Fix ₺{...toLocaleString()}
# It looks like ₺'s are actually represented as ' in powershell, but let's replace by regex.
content = re.sub(r'[^a-zA-Z<>]*?\{data\.recoveredRevenue\.toLocaleString\(\)\}', '{formatCurrency(data.recoveredRevenue)}', content)
content = re.sub(r'[^a-zA-Z<>]*?\{data\.estimatedCommission\.toLocaleString\(\)\}', '{formatCurrency(data.estimatedCommission)}', content)

with open('src/components/KPICards.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("KPICards fixed.")
