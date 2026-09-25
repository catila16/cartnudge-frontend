import re

with open('src/components/LiveCartsTable.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "import { getActiveConversations, triggerTakeover } from '../api/client';",
    "import { getActiveConversations, triggerTakeover, simulateRecovery } from '../api/client';"
)
content = content.replace(
    "import { Clock, User, CheckCircle, Hand, MessageCircle, AlertCircle } from 'lucide-react';",
    "import { Clock, User, CheckCircle, Hand, MessageCircle, AlertCircle, Play } from 'lucide-react';"
)

simulate_func = """
  const handleSimulate = async () => {
    try {
      await simulateRecovery();
      const data = await getActiveConversations();
      setCarts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTakeover = async (id: string) => {"""
content = content.replace("  const handleTakeover = async (id: string) => {", simulate_func)

# Replace the flex container for "Live Monitoring" to include the button
new_header = """        <div className="flex items-center gap-3">
          <button onClick={handleSimulate} className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors">
            <Play className="w-3.5 h-3.5 text-indigo-400" />
            Simulate Recovery Event
          </button>
          <span className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">"""
content = re.sub(r'<span className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full[^>]*>', new_header, content)

# Close the div
content = content.replace("Live Monitoring\n        </span>\n      </div>", "Live Monitoring\n        </span>\n        </div>\n      </div>")

with open('src/components/LiveCartsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("LiveCartsTable simulator button added.")
