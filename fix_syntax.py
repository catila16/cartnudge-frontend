import re

with open('src/components/LiveCartsTable.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken closing tag mismatch
content = content.replace('Live Monitoring\n        </span>\n        </div>\n      </div>', 'Live Monitoring\n        </span>\n      </div>')
# Note: I replaced the extra closing div if it existed. 

# Let's see if the div was already there.
# I will do a regex to replace the span and its closing part
new_header = """        <div className="flex items-center gap-3">
          <button onClick={handleSimulate} className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors">
            <Play className="w-3.5 h-3.5 text-indigo-400" />
            Simulate Recovery
          </button>
          <span className="flex items-center gap-2 text-sm text-cyber bg-cyber/10 px-3 py-1 rounded-full">"""

content = re.sub(r'<span className="flex items-center gap-2 text-sm text-cyber bg-cyber/10 px-3 py-1 rounded-full">', new_header, content)

if "Simulate Recovery" in content:
    # we need to close the div we opened!
    # The original structure:
    # <span ...>
    #   <span ...>
    #      ...
    #   </span>
    #   Live Monitoring
    # </span>
    content = content.replace("Live Monitoring\n        </span>\n      </div>", "Live Monitoring\n        </span>\n        </div>\n      </div>")

with open('src/components/LiveCartsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed syntax")
