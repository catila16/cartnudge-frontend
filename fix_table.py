import re

with open('src/components/LiveCartsTable.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add currency import
content = content.replace("import { Clock, User, CheckCircle, Hand, MessageCircle } from 'lucide-react';", 
"import { Clock, User, CheckCircle, Hand, MessageCircle, AlertCircle } from 'lucide-react';\nimport { formatCurrency } from '../utils/currency';")

# Fix missing PENDING badge
pending_badge = """                  {cart.status === 'PENDING' && (
                    <span className="inline-flex items-center gap-1.5 bg-gray-500/10 text-gray-400 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-500/20">
                      <AlertCircle className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                  {cart.status === 'NEGOTIATION' && ("""
content = content.replace("{cart.status === 'NEGOTIATION' && (", pending_badge)

# Add CONVERTED badge (the API returned "CONVERTED" in my backend fix)
content = content.replace("{cart.status === 'SUCCESS' && (", "{cart.status === 'CONVERTED' && (")

# Fix button styling
old_button = """                  ) : (
                    <button className="inline-flex items-center gap-2 bg-transparent text-gray-500 px-3 py-1.5 rounded-lg text-xs font-medium cursor-not-allowed">
                      Takeover
                    </button>
                  )}"""
new_button = """                  ) : (
                    <button disabled className="inline-flex items-center gap-2 bg-gray-900/50 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-gray-800/50 cursor-not-allowed">
                      <Hand className="w-3.5 h-3.5 text-gray-600" /> Takeover
                    </button>
                  )}"""
content = content.replace(old_button, new_button)

# Fix currency formatting
content = content.replace('<td className="p-4 font-medium text-gray-300">{cart.value}</td>', 
'<td className="p-4 font-medium text-gray-300">{typeof cart.value === "number" ? formatCurrency(cart.value) : formatCurrency(Number(cart.value.replace(/[^0-9.-]+/g,"")) || 0)}</td>')

with open('src/components/LiveCartsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("LiveCartsTable fixed.")
