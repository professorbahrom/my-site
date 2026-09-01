# CLAUDE.md

Bahromjon Djalilovning shaxsiy brend sayti (vizitka). Bu fayl loyiha bilan ishlashda
qaytadan aniqlab o'tirmaslik kerak bo'lgan qarorlarni saqlaydi.

---

## 1. Loyiha

Bir sahifali shaxsiy vizitka sayt. Egasi — **Bahromjon Djalilov**, Farg'ona, O'zbekiston:
sun'iy intellekt va raqamlashtirish bo'yicha konsultant.

**Fayllar**

| Fayl | Vazifasi |
|---|---|
| `index.html` | Faqat tuzilish (markup). Uslub yoki mantiq yo'q. |
| `styles.css` | Butun dizayn. |
| `i18n.js` | **Sahifadagi hamma matn, uch tilda.** `window.SITE_TEXT`. |
| `app.js` | Til almashtirish, oy/quyosh tugmasi, skroll animatsiyasi. |
| `init.js` | Tema va tilni sahifa chizilishidan oldin qo'yadi. `<head>` da. |
| `portrait.jpg` | Portret (880×1100, oq fonli). Manba: `Bahrom-Djalilov.png`. |
| `build-artifact.py` | Hammasini bitta faylga yig'adi → `dist/bahromjon-djalilov.html`. |
| `.claude/launch.json` | Lokal server, `site` nomi, 4321-port. |

**Artifact:** https://claude.ai/code/artifact/150159cb-f716-47c2-9218-6375ca3c440d
Yangilashda shu URL ni `url` parametri sifatida uzating — aks holda yangi havola yaraladi.

**Sayt bo'limlari:** hero → raqamlar → men haqimda → yo'l (xronologiya) → xizmatlar → aloqa.

**Tasdiqlangan faktlar** (bulardan chetga chiqmang):

- 2020-yildan boshlab 20 dan ortiq raqamli ta'lim / IT o'quv markazi ochilgan.
- 20 000 dan ortiq yosh zamonaviy kasbga o'qitilgan.
- 2021-yildan IT Park Farg'ona filiali rahbari bo'lib ishlagan.
- Viloyatda 100 dan ortiq mahalliy IT korxona va chet el fuqarolari ishtirokidagi
  50 ga yaqin eksportga ixtisoslashgan korxona ochilishida ishtirok etgan.
- 50 dan ortiq xakaton va ideaton, 200 ga yaqin master klass, meetup va seminarda spikerlik.
- Aloqa: +998 99 367 64 14 · @bahromjon_djalilov · bahrom.djalilov2018@gmail.com

**Noma'lum:** IT Park'dagi ish qaysi yili tugagani aytilmagan. Shu sababli xronologiyada
"2021 dan" deb yozilgan. Aniq sana so'ralmaguncha hech qanday tugash yili qo'yilmasin.

---

## 2. Uslub

**Vizual identika: Marg'ilon ikat.** Indigo + za'faron, xom ipak neytrali. Bo'limlar orasidagi
naqsh lentasi — `#ikat` SVG pattern (zinapoyasimon romb), `index.html` boshida bir marta
e'lon qilingan va `<use>` orqali qayta ishlatiladi.

**Palitra** — barchasi `styles.css` dagi CSS o'zgaruvchilar orqali. To'g'ridan-to'g'ri
hex yozilmaydi.

- Asosiy: `--indigo` · urg'u: `--saffron` (kam, o'lchovli ishlatiladi)
- Neytrallar indigo tomon egilgan — sof kulrang emas
- Har bir rang uchta tema holatida ham aniqlangan bo'lishi shart (3-bo'limga qarang)

**Shriftlar**

| Rol | Shrift | Izoh |
|---|---|---|
| Sarlavha (lotin) | Newsreader | |
| Sarlavha (kirill) | Source Serif 4 | Newsreader'da kirill **yo'q** — zaxira sifatida turadi |
| Matn | IBM Plex Sans | kirill bor |
| Yorliq, raqam | IBM Plex Mono | `font-variant-numeric: tabular-nums` |

`--serif` ro'yxatidan Source Serif 4 ni olib tashlamang: rus tilida sarlavhalar Times'ga
tushib ketadi.

**Joylashuv.** Editorial, chapga tekislangan, keng bo'sh joy, ingichka chiziqlar.
Katta "hero" bannerlar, gradientlar, yumaloq kartochkalar, emoji ishlatilmaydi.

**Matn ohangi.** Birinchi shaxsda, aniq va tiyiq. Raqamlar — dalil, maqtanchoqlik emas.
Marketing shovqini yo'q.

**O'zbek imlosi — muhim.** Saytdagi matnda `o`, `g` harflaridan keyingi belgi va so'z
ichidagi tutuq belgisi uchun **U+2018** va **U+2019** (tipografik qo'shtirnoqlar)
ishlatiladi.

**U+02BB va U+02BC ishlatilmaydi**, garchi ular O'zbek imlosi uchun "to'g'ri" Unicode
belgilar bo'lsa ham. Sabab: IBM Plex Sans bu ikki belgini keng bo'shliq bilan chizadi va
so'z o'rtasida uzilib ko'rinadi — "Sun_iy", "bo_yicha" kabi. Bu vizual nuqson imloviy
aniqlikdan ustun qo'yilgan, ataylab qilingan tanlov.

Amaliy qoida: yangi matn yozganda belgini qo'ldan kiritmang — `i18n.js` dagi mavjud
so'zdan nusxalang. Tekshirish uchun `grep -c $'ʻ\|ʼ' i18n.js` nolni qaytarishi kerak.

(Shu CLAUDE.md faylining o'zida oddiy ASCII apostrof ishlatilgan — qoida faqat saytda
ko'rinadigan matnga tegishli.)

---

## 3. Texnik chegaralar

**Freymvork yo'q.** Toza HTML/CSS/JS. Sayt uchun qurish bosqichi yo'q — fayllar brauzerga
qanday yozilgan bo'lsa, shundayligicha boradi. npm, bundler, TypeScript qo'shilmaydi.
JS uslubi: `var`, oddiy funksiyalar (mavjud kodga moslashing).

**Artifact — bitta fayl bo'lishi shart.** CSP faqat Google Fonts'ga ruxsat beradi; boshqa
tashqi manba yuklanmaydi. Shuning uchun `build-artifact.py` CSS, uchala JS va rasmni
(data URI) ichkariga singdiradi va `<!doctype>` / `<html>` / `<head>` / `<body>` teglarini
olib tashlaydi — bu qobiqni Artifact o'zi qo'shadi.

**Tema — uchta holat, ikkita emas:**

1. `:root` — to'liq yorug' palitra (asos)
2. `@media (prefers-color-scheme: dark)` + `:root:not([data-theme="light"])` — tizim rejimi
3. `:root[data-theme="dark"]` — tugma orqali tanlangan rejim

Rangni faqat media yoki `[data-theme]` bloki ichida e'lon qilish **mumkin emas** — belgilanmagan
holatda sahifa bir temaning matnini boshqasining foniga chizadi. Hamma rang tokenlar orqali.

**`init.js` `<head>` da va sinxron qolishi kerak.** U `data-theme`, `lang` va `js` klassini
sahifa chizilishidan oldin qo'yadi. `defer` yoki `<body>` ga ko'chirilsa — to'q rejimda oq
ekran ko'rinib ketadi.

**JS o'chirilganda ham matn ko'rinishi shart.** Animatsiya `.js .rise` orqali chegaralangan;
`.rise` ni yolg'iz `opacity: 0` bilan yozmang.

**Portret.** `mix-blend-mode: multiply` bilan `--photo-bg` panel ustiga qo'yiladi — shu tufayli
rasmning oq foni panelga singib ketadi va to'q rejimda indigo tusli "bosma surat"ga aylanadi.
Rasm foni sof oq bo'lishi kerak; boshqa rasm qo'yilsa shu shart saqlansin.

**Gorizontal skroll bo'lmasin.** 390px kenglikda ham `scrollWidth === clientWidth`.

**`localStorage`:** `bd-tema` (`light`/`dark`), `bd-til` (`uz`/`en`/`ru`). Har bir murojaat
`try/catch` ichida — inkognito rejimda o'qish/yozish xato beradi.

---

## 4. Ish qoidalari

**Matn faqat `i18n.js` da.** `index.html` dagi matn — JS ishlamagan holat uchun zaxira.
Matnni o'zgartirsangiz, ikkalasini ham yangilang.

**Uch til bir vaqtda.** Yangi ko'rinadigan matn qo'shsangiz: elementga `data-t` (yoki markup
bo'lsa `data-t-html`) qo'shing va kalitni **uchala** tilga (`uz`, `en`, `ru`) yozing.
Bir tilni tashlab ketish — nuqson, chala ish emas.

**O'zgarishdan keyin qayta yig'ing.** Har qanday manba fayl o'zgarsa:

```bash
python3 "/Users/user/vibecoding/my site/build-artifact.py"
```

so'ngra `dist/bahromjon-djalilov.html` ni yuqoridagi URL bilan qayta e'lon qiling.
Buni unutish — Artifact eski holida qolishi demak.

**Tekshiruv ro'yxati** (ishni tugadi deyishdan oldin):

- 1280px va 390px kengliklarda
- yorug' va to'q rejimda
- uchala tilda — ayniqsa rus tilida sarlavha shrifti to'g'ri chiqayotganini
- konsolda xato yo'qligini
- gorizontal toshish yo'qligini

Lokal ko'rish uchun `.claude/launch.json` dagi `site` konfiguratsiyasi (4321-port).
Brauzer HTML ni keshlaydi — CSS inline emas bo'lsa ham, o'zgarishni ko'rish uchun
URL ga `?v=2` qo'shing.

**Fakt to'qimang.** Sana, raqam, lavozim, kompaniya nomi — faqat yuqoridagi ro'yxatdan yoki
egasidan so'rab. Bo'shliqni "mantiqan shunday bo'lsa kerak" deb to'ldirish mumkin emas.

**Tashqi skript qo'shilmaydi.** Analitika, piksel, chat vidjet, CDN kutubxona — yo'q.
CSP ni buzadi va saytning tez ochilishini yo'qotadi.

**Izohlar o'zbek tilida** — mavjud kodga mos ravishda.
