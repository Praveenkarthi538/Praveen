import os
from pypdf import PdfReader

pdf_path = "KarthickrajaM_Resume_Updated.pdf"
reader = PdfReader(pdf_path)
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("resume_content.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("Extraction complete. Check resume_content.txt")
