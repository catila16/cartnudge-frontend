import re

with open('src/components/OperationalDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import AISettingsForm from './AISettingsForm';", "")
content = content.replace("grid grid-cols-1 lg:grid-cols-3", "grid grid-cols-1")
content = content.replace("lg:col-span-2", "col-span-1")

pattern = r'<div className="lg:col-span-1">\s*<AISettingsForm />\s*</div>'
content = re.sub(pattern, "", content)

with open('src/components/OperationalDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Fix formatting in LiveCartsTable
with open('src/components/LiveCartsTable.tsx', 'r', encoding='utf-8') as f:
    table = f.read()

table = table.replace('import { Phone, CheckCircle, Clock, AlertTriangle } from \'lucide-react\';', 
                      "import { Phone, CheckCircle, Clock, AlertTriangle } from 'lucide-react';\nimport { formatCurrency } from '../utils/currency';")

# Replace cart value logic
# It used to just print {cart.value}
# Wait, let's see how {cart.value} is printed.
table = re.sub(r'\{cart\.value\}', '{typeof cart.value === "number" ? formatCurrency(cart.value) : cart.value}', table)

# Let's fix the Status badge logic and buttons
# Wait, I'll just write the full replacement for the table body row logic
with open('src/components/LiveCartsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(table)
    
print("Operational fixed.")
