with open('src/api/client.ts', 'r', encoding='utf-8') as f:
    content = f.read()
if "simulateRecovery" not in content:
    content += """
export const simulateRecovery = async (): Promise<any> => {
  const response = await apiClient.post('/api/dashboard/simulate');
  return response.data;
};
"""
with open('src/api/client.ts', 'w', encoding='utf-8') as f:
    f.write(content)
