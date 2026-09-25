import React, { useState } from "react";
import { Sliders, Sparkles, ShieldCheck, Check, Moon } from "lucide-react";

interface MerchantControlsProps {
  initialDiscountCeiling?: number;
  initialPersona?: "friendly" | "corporate" | "persuasive";
  onSave?: (settings: { discountCeiling: number; persona: string }) => Promise<void>;
}

export const MerchantControls: React.FC<MerchantControlsProps> = ({
  initialDiscountCeiling = 15,
  initialPersona = "friendly",
  onSave,
}) => {
  const [discountCeiling, setDiscountCeiling] = useState<number>(initialDiscountCeiling);
  const [persona, setPersona] = useState<"friendly" | "corporate" | "persuasive">(initialPersona);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [quietHours, setQuietHours] = useState(true);

  const personas = [
    {
      id: "friendly",
      title: "Friendly & Casual",
      badge: "Highest Conversion",
      description: "Empathetic, approachable, and warm. Uses light emojis (😊, ✨) to build rapport.",
    },
    {
      id: "corporate",
      title: "Formal & Prestigious",
      badge: "BRAND TRUST",
      description: "Strictly polite, professional, and respectful. No emojis, maintaining brand prestige.",
    },
    {
      id: "persuasive",
      title: "Sales & Urgency (FOMO)",
      badge: "Fast-Paced",
      description: "Direct and deal-closing focused. Highlights limited stock and expiring discount windows.",
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      if (onSave) {
        await onSave({ discountCeiling, persona, quietHours } as any);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base tracking-tight">
              AI Sales Controls & Guardrails
            </h3>
            <p className="text-zinc-400 text-xs">
              Configure autonomous negotiation limits and brand tone of voice
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            savedSuccess
              ? "bg-emerald-500 text-black"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 active:scale-95"
          }`}
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" /> Saved!
            </>
          ) : isSaving ? (
            "Saving..."
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" /> Save Guardrails
            </>
          )}
        </button>
      </div>

      {/* Grid: Slider on Left, Persona on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Discount Ceiling Slider */}
        <div className="lg:col-span-4 bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300">
              Max Discount Ceiling
            </label>
            <span className="text-base font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg">
              {discountCeiling}%
            </span>
          </div>

          <input
            type="range"
            min={5}
            max={25}
            step={1}
            value={discountCeiling}
            onChange={(e) => setDiscountCeiling(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[11px] text-zinc-500 font-medium">
            <span>5% (Conservative)</span>
            <span>15% (Recommended)</span>
            <span>25% (Aggressive)</span>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/60">
            The AI will dynamically negotiate starting from 5% up to this ceiling. It will never exceed this cap under any circumstance.
          </p>

          {/* Quiet Hours Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 mt-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-emerald-400" /> Quiet Hours
              </label>
              <p className="text-[10px] text-zinc-500 mt-0.5">Pause messaging (22:00 - 09:00 local time)</p>
            </div>
            
            <button 
              onClick={() => setQuietHours(!quietHours)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${quietHours ? 'bg-emerald-500' : 'bg-zinc-700'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${quietHours ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* AI Tone / Persona Cards */}
        <div className="lg:col-span-8 space-y-3">
          <label className="text-xs font-semibold text-zinc-300 block">
            Brand Tone of Voice (Persona)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {personas.map((item) => {
              const isSelected = persona === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setPersona(item.id as any)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-950/30"
                      : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold ${isSelected ? "text-emerald-400" : "text-white"}`}>
                        {item.title}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
                    <span className={isSelected ? "text-emerald-400 font-medium" : "text-zinc-500"}>
                      {isSelected ? "Active Persona" : "Select"}
                    </span>
                    <Sparkles className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-zinc-600"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
