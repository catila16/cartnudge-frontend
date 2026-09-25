with open('src/components/OperationalDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import AISettingsForm from './AISettingsForm';", "")

old_grid = """        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveCartsTable />
          </div>
          <div className="lg:col-span-1">
            <AISettingsForm />
          </div>
        </div>"""

new_grid = """        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <LiveCartsTable />
          </div>
        </div>"""

content = content.replace(old_grid, new_grid)

with open('src/components/OperationalDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed duplicate AISettingsForm.")
