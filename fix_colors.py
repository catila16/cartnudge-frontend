import re

def update_colors(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace bg-cards with bg-zinc-900
    content = content.replace('bg-cards', 'bg-zinc-900')
    
    # Replace gray with zinc
    content = content.replace('gray-900', 'zinc-900')
    content = content.replace('gray-800', 'zinc-800')
    content = content.replace('gray-700', 'zinc-700')
    content = content.replace('gray-600', 'zinc-600')
    content = content.replace('gray-500', 'zinc-500')
    content = content.replace('gray-400', 'zinc-400')
    content = content.replace('gray-300', 'zinc-300')
    
    # In KPICards, update the shadow if needed (currently it's custom rgba, fine as is)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

update_colors('src/components/KPICards.tsx')
update_colors('src/components/LiveCartsTable.tsx')
update_colors('src/components/OperationalDashboard.tsx')

print("Colors updated to zinc palette.")
