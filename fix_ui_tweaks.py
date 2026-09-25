with open('src/components/MerchantControls.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change the toggle color
content = content.replace("bg-indigo-500", "bg-emerald-500")

# Optional: also change the Moon icon color if it was indigo
content = content.replace("text-indigo-400", "text-emerald-400")

# Update the text
content = content.replace("Pause messaging (22:00 - 09:00)</p>", "Pause messaging (22:00 - 09:00 local time)</p>")

with open('src/components/MerchantControls.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("UI tweaks applied.")
