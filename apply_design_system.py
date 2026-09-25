import re

# Update App.tsx with logo
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace('import React, { useState } from "react";', 'import React, { useState } from "react";\nimport logo from "./assets/logo.png";')
app = app.replace('<span className="text-emerald-400 font-bold text-xl tracking-tight">CartNudge</span>', 
                  '<img src={logo} alt="CartNudge" className="w-8 h-8 rounded" />\n            <span className="text-emerald-400 font-bold text-xl tracking-tight">CartNudge</span>')
# Change App.tsx background from bg-black to bg-[#0A0B10]
app = app.replace('bg-black', 'bg-[#0A0B10]')
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app)

# Update KPICards.tsx colors
with open('src/components/KPICards.tsx', 'r', encoding='utf-8') as f:
    kpi = f.read()

# Active Sessions: blue-500/10 -> indigo-500/10, text-blue-400 -> text-indigo-400
kpi = kpi.replace('bg-blue-500/10', 'bg-indigo-500/10')
kpi = kpi.replace('text-blue-400', 'text-indigo-400')

# Estimated Commission: orange-500/10 -> emerald-500/10, text-orange-400 -> text-emerald-400
# Wait, "Recovered Revenue" is already cyber (which is emerald-like).
kpi = kpi.replace('bg-orange-500/10', 'bg-emerald-500/10')
kpi = kpi.replace('text-orange-400', 'text-emerald-400')

with open('src/components/KPICards.tsx', 'w', encoding='utf-8') as f:
    f.write(kpi)

# Update LiveCartsTable.tsx colors
with open('src/components/LiveCartsTable.tsx', 'r', encoding='utf-8') as f:
    table = f.read()

# AI Negotiating: bg-blue-500/10 text-blue-400 -> bg-indigo-500/10 text-indigo-400
table = table.replace('bg-blue-500/10', 'bg-indigo-500/10')
table = table.replace('text-blue-400', 'text-indigo-400')
table = table.replace('border-blue-500/20', 'border-indigo-500/20')

# Converted: bg-cyber/10 text-cyber border-cyber/20 -> bg-emerald-500/10 text-emerald-400 border-emerald-500/20
table = table.replace('bg-cyber/10 text-cyber px-2.5', 'bg-emerald-500/10 text-emerald-400 px-2.5')
table = table.replace('border-cyber/20', 'border-emerald-500/20')
# Takeover button: leave as is or make it indigo? The user didn't mention Takeover, but AI/Sessions is indigo.
with open('src/components/LiveCartsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(table)

print("Design system applied.")
