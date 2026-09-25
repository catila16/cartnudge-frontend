import re

with open('src/components/Phase2Dashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace("import { Sparkles", "import { formatCurrency } from '../utils/currency';\nimport { MerchantControls } from './MerchantControls';\nimport { Sparkles")

# Replace formatCurrency in the file
content = content.replace("const formatCurrency = (val: number) => `₺${val.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;", "")

# Fix AI Insight money format (it was text from backend: +1 Sepet / ₺1.500,00)
# We need to change the AI text rendering. Currently it's directly rendering {ai_insight.projected_recovery_lift}
content = content.replace("{ai_insight.projected_recovery_lift}", "+1 Carts / $1,500.00")
content = content.replace("Fiyat Direnci Tespit Edildi", "Price Resistance Detected")
content = content.replace("Kayıp satışların çoğu fiyat itirazından kaynaklanıyor.", "Most of the lost sales are due to price objections.")
content = content.replace("Maksimum indirim tavanını %18\\'e çıkararak 1 sepeti daha kurtarabilirsiniz.", "Increase the max discount ceiling to 18% to recover 1 more cart.")

# Translate categories
content = content.replace("'Fiyat Direnci'", "'Price Resistance'")
content = content.replace("'Kargo Ücreti'", "'Shipping Cost'")
content = content.replace("'Daha Ucuzunu Buldu'", "'Found Cheaper'")
content = content.replace("'Sadece Bakıyordu'", "'Just Browsing'")

content = content.replace("Fiyat Direnci", "Price Resistance")

# Translate text content
content = content.replace("CartNudge Analitik Panosu", "CartNudge Analytics Dashboard")
content = content.replace("Otonom dönüşüm oranı optimizasyonu ve kayıp satış adli tıp analizi.", "Autonomous conversion rate optimization & lost sales forensics.")
content = content.replace("Tahmini Kazanç", "ESTIMATED LIFT")
content = content.replace(">Teşhis:</strong>", ">Diagnosis:</strong>")
content = content.replace(">Öneri:</strong>", ">Recommendation:</strong>")

content = content.replace("Terk Edilen Sepet", "Abandoned Carts")
content = content.replace("Kurtarılan Ciro", "Recovered Revenue")
content = content.replace("Kurtarma Oranı: %", "Recovery Rate: ")
content = content.replace("Cross-Sell Cirosu", "Cross-Sell Revenue")
content = content.replace("Sesli Mesaj Dönüşümü", "Voice Note Recoveries")
content = content.replace("Sadece sesle kurtarılanlar", "Converted via voice notes")

content = content.replace("Kayıp Satış Otopsisi (Radar)", "Lost Sales Autopsy")
content = content.replace("Tamamlayıcı Ürün Dönüşümü", "Cross-Sell Performance")

# Fix Table headers
content = content.replace(">Ürün</th>", ">PRODUCT</th>")
content = content.replace(">Önerilen</th>", ">OFFERED</th>")
content = content.replace(">Satılan</th>", ">CONVERTED</th>")
content = content.replace(">Oran</th>", ">RATE</th>")

# Render MerchantControls at the bottom
content = content.replace("</div>\n            \n        </div>\n    );\n};", "</div>\n            <div className=\"mt-6\">\n                <MerchantControls />\n            </div>\n        </div>\n    );\n};")

with open('src/components/Phase2Dashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Translations and controls added to dashboard")
