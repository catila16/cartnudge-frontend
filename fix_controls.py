import re

with open('src/components/MerchantControls.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Moon icon
content = content.replace('import { Sliders, Sparkles, ShieldCheck, Check } from "lucide-react";', 
                          'import { Sliders, Sparkles, ShieldCheck, Check, Moon } from "lucide-react";')

# Add quietHours state
content = content.replace('const [savedSuccess, setSavedSuccess] = useState(false);', 
                          'const [savedSuccess, setSavedSuccess] = useState(false);\n  const [quietHours, setQuietHours] = useState(true);')

# Update onSave to include quietHours
content = content.replace('await onSave({ discountCeiling, persona });', 'await onSave({ discountCeiling, persona, quietHours } as any);')

quiet_hours_ui = """

          {/* Quiet Hours Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 mt-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-400" /> Quiet Hours
              </label>
              <p className="text-[10px] text-zinc-500 mt-0.5">Pause messaging (22:00 - 09:00)</p>
            </div>
            
            <button 
              onClick={() => setQuietHours(!quietHours)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${quietHours ? 'bg-indigo-500' : 'bg-zinc-700'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${quietHours ? 'translate-x-4.5' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>"""

content = content.replace("""          <p className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/60">
            The AI will dynamically negotiate starting from 5% up to this ceiling. It will never exceed this cap under any circumstance.
          </p>
        </div>""", """          <p className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/60">
            The AI will dynamically negotiate starting from 5% up to this ceiling. It will never exceed this cap under any circumstance.
          </p>""" + quiet_hours_ui)

# Fix Tailwind translate-x classes
content = content.replace('translate-x-4.5', 'translate-x-4')

with open('src/components/MerchantControls.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("MerchantControls fixed.")
