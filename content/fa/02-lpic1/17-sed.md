---
title: Sed - ویرایشگر جریان (Stream Editor)
description: آموزش دستور sed برای جستجو و جایگزینی متن، حذف خطوط، و تبدیل‌های خودکار
category: linux
tags: [lpic-1, sed, stream-editor, text-processing, find-replace, automation, regex]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: Sed - ویرایشگر جریان
  icon: i-lucide-wand2
---

# Sed - ویرایشگر جریان (Stream Editor)

Sed (Stream EDitor) یک **ابزار برای تبدیل متن** است که برای **جستجو و جایگزینی خودکار** استفاده می‌شود. برخلاف ویرایشگرهایی مثل Vi و Nano که فایل را **به‌طور تعاملی** ویرایش می‌کنند، Sed **غیرتعاملی** است و می‌تواند **خودکار و دسته‌ای** از تبدیل‌ها را انجام دهد.

Sed برای **اسکریپت‌نویسی** و **اتوماسیون** بسیار مفید است.

> **خلاصه‌ی کلیدی:** **`sed 's/old/new/'`** برای جایگزینی، **`sed 's/old/new/g'` برای جایگزینی تمام موارد**، **`sed -i` برای ویرایش درجا (In-place)**، **`sed 'd'` برای حذف خطوط**.

## مقدمه‌ی Sed

### دستور اساسی

```bash
$ sed 's/old/new/' filename.txt
```

Sed تمام **خطوط اول "old" در هر خط** را با **"new" جایگزین می‌کند**.

## جایگزینی متن

### جایگزینی اولین رخداد در هر خط

```bash
$ sed 's/hello/hi/' file.txt
```

اگر فایل:
```
hello world hello
hello friend
```

نتیجه:
```
hi world hello
hi friend
```

**تنها اول رخداد** جایگزین شده.

### جایگزینی تمام موارد (`g` flag)

```bash
$ sed 's/hello/hi/g' file.txt
```

نتیجه:
```
hi world hi
hi friend
```

`g` (global) برای **تمام موارد**.

### جایگزینی در خط خاص

```bash
$ sed '2s/hello/hi/' file.txt    # خط 2
$ sed '1,3s/hello/hi/g' file.txt # خطوط 1-3
```

## حذف خطوط

### حذف خط خاص

```bash
$ sed '2d' file.txt          # حذف خط 2
$ sed '1,3d' file.txt        # حذف خطوط 1-3
$ sed '/hello/d' file.txt    # حذف خطوط شامل "hello"
```

### حذف خطوط خالی

```bash
$ sed '/^$/d' file.txt       # حذف خطوط خالی
```

## جستجو با Patterns

### جایگزینی خطوطی که pattern دارند

```bash
$ sed '/error/s/old/new/g' file.txt
```

تنها خطوطی که "error" دارند، جایگزینی می‌شوند.

### حذف خطوطی که pattern دارند

```bash
$ sed '/debug/d' file.txt
```

تمام خطوط شامل "debug" حذف می‌شوند.

## ویرایش درجا (`-i`)

### بدون `-i` (خروجی به stdout)

```bash
$ sed 's/old/new/g' file.txt    # نمایش در صفحه
```

**فایل اصلی تغییر نمی‌کند**.

### با `-i` (ویرایش فایل اصلی)

```bash
$ sed -i 's/old/new/g' file.txt    # ویرایش مستقیم
```

**فایل اصلی تغییر می‌کند**.

### Backup ایجاد کنید

```bash
$ sed -i.bak 's/old/new/g' file.txt
```

`file.txt.bak` نسخه‌ی اصلی است.

## مثال‌های عملی

### تغییر نام‌های config

```bash
$ sed -i 's/localhost/127.0.0.1/g' config.txt
```

تمام "localhost" را با IP آدرس جایگزین کنید.

### حذف نظرات

```bash
$ sed '/^#/d' config.txt
```

تمام خطوطی که با `#` شروع می‌شوند حذف کنید.

### تبدیل فرمت

```bash
$ # CSV به Tab-separated
$ sed 's/,/\t/g' data.csv > data.tsv
```

### Processing Log Files

```bash
$ sed -n '/ERROR/p' access.log | wc -l
```

شمارش خطوط "ERROR" در log.

## گزینه‌های مهم

| گزینه | توضیح |
|--------|--------|
| **`-i`** | ویرایش درجا (In-place) |
| **`-n`** | بدون نمایش خودکار (Quiet mode) |
| **`-e`** | دستور اضافی |
| **`-f`** | خواندن دستورات از فایل |
| **`g`** | جایگزینی global (تمام موارد) |
| **`d`** | حذف |
| **`p`** | نمایش |

## Sed با Regular Expressions

### جایگزینی پیچیده

```bash
$ # اعداد را با X جایگزین کنید
$ sed 's/[0-9]/X/g' file.txt

$ # خطوطی که با عدد شروع می‌شوند
$ sed -n '/^[0-9]/p' file.txt

$ # فضاهای اضافی را حذف کنید
$ sed 's/  */ /g' file.txt
```

## Sed مع Pipes

### ترکیب با دستورات دیگر

```bash
$ cat file.txt | sed 's/old/new/g' | grep pattern
```

**خط‌ساز (Pipeline) قدرتمند**.

### Processing استریم

```bash
$ curl https://example.com | sed 's/foo/bar/g'
```

تبدیل **data streaming** بدون ذخیره فایل.

## نکات اصلاحی

### سوءتفاهم: Sed فقط جایگزینی است

**نه!** Sed می‌تواند:
- خطوط را **حذف کند** (`d`)
- خطوط را **نمایش دهد** (`p`)
- **تبدیل‌های پیچیده** انجام دهد

> **نکته:** Sed **ابزار پردازش متن قدرتمندی** است.

### سوءتفاهم: Sed و Grep متفاوت نیستند

Grep برای **جستجو**، Sed برای **تبدیل** است:
- **Grep:** یافتن خطوط
- **Sed:** تغییر متن

```bash
$ grep pattern file.txt        # پیدا کردن
$ sed 's/old/new/' file.txt    # تبدیل
```

## نصائح

### Test قبل از `-i`

همیشه **بدون `-i`** test کنید:
```bash
$ sed 's/old/new/g' file.txt    # مشاهده نتیجه
$ sed -i 's/old/new/g' file.txt # اعمال تغییر
```

### Backup ایجاد کنید

```bash
$ cp file.txt file.txt.bak      # Backup
$ sed -i 's/old/new/g' file.txt # تغییر
```

### Multiple Files

```bash
$ sed -i 's/old/new/g' *.txt    # تمام .txt فایل‌ها
```

## جمع‌بندی

Sed یک ابزار **قدرتمند برای اتوماسیون** است:
- **جستجو و جایگزینی** متن
- **حذف خطوط** متطابق
- **تبدیل‌های دسته‌ای** (batch)

مهم‌ترین دستورات:
- **`s/old/new/g`** - جایگزینی
- **`d`** - حذف
- **`-i`** - ویرایش درجا
- **`grep pattern`** - تنها خطوط منطبق

Sed **بخشی جدایی‌ناپذیر از اسکریپت‌نویسی لینوکس** است. یادگیری آن **سرمایه‌گذاری ارزشمند** است.
