import re

# Update KPICards.tsx to listen for 'refresh_kpis'
with open('src/components/KPICards.tsx', 'r', encoding='utf-8') as f:
    kpi_content = f.read()

kpi_use_effect = """  useEffect(() => {
    fetchData();
    const handleRefresh = () => fetchData();
    window.addEventListener('refresh_kpis', handleRefresh);
    return () => window.removeEventListener('refresh_kpis', handleRefresh);
  }, []);"""

kpi_content = re.sub(r'  useEffect\(\(\) => \{\n    fetchData\(\);\n  \}, \[\]\);', kpi_use_effect, kpi_content)
with open('src/components/KPICards.tsx', 'w', encoding='utf-8') as f:
    f.write(kpi_content)

# Update LiveCartsTable.tsx to dispatch 'refresh_kpis'
with open('src/components/LiveCartsTable.tsx', 'r', encoding='utf-8') as f:
    table_content = f.read()

simulate_func_new = """  const handleSimulate = async () => {
    try {
      await simulateRecovery();
      const data = await getActiveConversations();
      setCarts(data);
      window.dispatchEvent(new Event('refresh_kpis'));
    } catch (err) {
      console.error(err);
    }
  };"""

table_content = re.sub(
    r'  const handleSimulate = async \(\) => \{.*?\}\n  \};', 
    simulate_func_new, 
    table_content, 
    flags=re.DOTALL
)

with open('src/components/LiveCartsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(table_content)

print("Updated frontend event triggers")
