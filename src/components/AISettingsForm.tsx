import React, { useEffect, useState } from 'react';
import { Settings, Save, Moon, Percent, MessageSquare } from 'lucide-react';
import { getAISettings, updateAISettings } from '../api/client';

const AISettingsForm: React.FC = () => {
  const [tone, setTone] = useState('friendly');
  const [maxDiscount, setMaxDiscount] = useState(15);
  const [quietHours, setQuietHours] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getAISettings();
        setTone(settings.tone || 'friendly');
        setMaxDiscount(settings.maxDiscount || 15);
        setQuietHours(settings.quietHours || false);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch settings", error);
        setIsLoaded(true); // Still load to show form
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateAISettings({ tone, maxDiscount, quietHours });
      // Show success toast or feedback here in a real app
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="bg-cards rounded-xl border border-gray-800 shadow-lg overflow-hidden h-full p-6 flex justify-center items-center">
        <span className="text-gray-500 animate-pulse">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="bg-cards rounded-xl border border-gray-800 shadow-lg overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyber" /> AI Negotiation Settings
        </h2>
        <p className="text-gray-400 text-sm mt-1">Configure how your AI agent negotiates with customers.</p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Tone Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <MessageSquare className="w-4 h-4 text-gray-400" /> AI Persona Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'friendly', label: 'Friendly & Convincing', desc: 'Warm and helpful' },
              { id: 'formal', label: 'Formal & Direct', desc: 'Professional retail tone' },
              { id: 'energetic', label: 'Energetic / FOMO', desc: 'Creates urgency' }
            ].map((t) => (
              <div 
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-center ${
                  tone === t.id 
                  ? 'border-cyber bg-cyber/5 shadow-[0_0_10px_rgba(0,230,118,0.1)]' 
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className={`font-medium text-sm leading-tight break-words whitespace-normal ${tone === t.id ? 'text-cyber' : 'text-gray-300'}`}>
                  {t.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Max Discount Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Percent className="w-4 h-4 text-gray-400" /> Margin Guard (Max Discount)
            </label>
            <span className="text-cyber font-bold">{maxDiscount}%</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="30" 
            step="5"
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyber"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Moon className="w-4 h-4 text-blue-400" /> Quiet Hours (22:00 - 09:00)
            </div>
            <div className="text-xs text-gray-500 mt-1">Delay late-night recovery messages.</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={quietHours}
              onChange={() => setQuietHours(!quietHours)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber"></div>
          </label>
        </div>
      </div>

      <div className="p-6 border-t border-gray-800 bg-gray-900/30 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-cyber disabled:bg-gray-600 disabled:text-gray-400 text-obsidian font-semibold px-6 py-2 rounded-lg hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
        >
          <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default AISettingsForm;
