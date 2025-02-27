import os
import json
from datetime import datetime

BLOG_DIR = "blog"
JSON_FILE = os.path.join(BLOG_DIR, "blog-list.json")

# 기존 JSON 데이터 로드
if os.path.exists(JSON_FILE):
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        blogs = json.load(f)
else:
    blogs = []

# blog 폴더에서 HTML 파일 찾기
blog_files = [f for f in os.listdir(BLOG_DIR) if f.endswith(".html") and f != "index.html"]

# JSON 업데이트
new_blogs = []
for file in blog_files:
    date_str = file.replace(".html", "")
    try:
        datetime.strptime(date_str, "%Y-%m-%d")  # 날짜 형식 확인
        new_blogs.append({
            "date": date_str,
            "title": f"{date_str}의 블로그 글",
            "url": file
        })
    except ValueError:
        continue

# JSON 덮어쓰기
with open(JSON_FILE, "w", encoding="utf-8") as f:
    json.dump(new_blogs, f, ensure_ascii=False, indent=4)

print("✅ blog-list.json 업데이트 완료!")