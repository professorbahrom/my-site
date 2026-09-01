#!/usr/bin/env python3
"""
Saytni bitta faylga yig'adi (Artifact / bitta HTML sifatida ulashish uchun).

index.html + styles.css + init.js + i18n.js + app.js + portrait.jpg
        -> dist/bahromjon-djalilov.html

Ishga tushirish:  python3 build-artifact.py
"""

import base64
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(HERE, "dist")
OUT = os.path.join(OUT_DIR, "bahromjon-djalilov.html")


def read(name):
    with open(os.path.join(HERE, name), encoding="utf-8") as f:
        return f.read()


def main():
    html = read("index.html")

    # 1. rasm -> data URI
    with open(os.path.join(HERE, "portrait.jpg"), "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    html = html.replace('src="portrait.jpg"', 'src="data:image/jpeg;base64,%s"' % b64, 1)

    # 2. tashqi css/js -> ichkariga
    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        "<style>\n%s</style>" % read("styles.css"),
    )
    for name in ("init.js", "i18n.js", "app.js"):
        html = html.replace(
            '<script src="%s"></script>' % name,
            "<script>\n%s</script>" % read(name),
        )

    assert 'href="styles.css"' not in html and "script src=" not in html, "inline qilinmagan fayl qoldi"

    # 3. Artifact o'z <!doctype>/<head>/<body> qobig'ini qo'shadi — ularni olib tashlaymiz
    head = html.split("<head>", 1)[1].split("</head>", 1)[0]
    body = html.split("<body>", 1)[1].rsplit("</body>", 1)[0]

    title = re.search(r"<title>.*?</title>", head, re.S).group(0)
    fonts = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', head).group(0)
    style = re.search(r"<style>.*?</style>", head, re.S).group(0)
    init = re.search(r"<script>\n/\* Tema:.*?</script>", head, re.S).group(0)

    out = "\n".join([title, fonts, style, init, body.strip()]) + "\n"

    for tag in ("<!doctype", "<html", "<head>", "<body>", "</body>", "</html>"):
        assert tag not in out.lower(), "qobiq tegi qoldi: " + tag

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(out)

    print("Tayyor: %s  (%.0f KB)" % (OUT, len(out.encode("utf-8")) / 1024))


if __name__ == "__main__":
    main()
