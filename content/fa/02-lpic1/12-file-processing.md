---
title: دستورات پردازش فایل‌ها در لینوکس
description: آموزش دستورات برای نمایش، ترتیب‌دهی، تقسیم و ترکیب فایل‌ها (cat، less، more، head، tail، sort، split، paste، od)
category: linux
tags: [lpic-1, file-processing, cat, less-more, head-tail, sort, split, paste, od, file-utilities]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: پردازش فایل‌ها
  icon: i-lucide-layers
---

# دستورات پردازش فایل‌ها در لینوکس

پردازش فایل‌ها یکی از **کارهای روزمره‌ی کاربران لینوکس** است. چه نمایش محتوای فایل، ترتیب‌دهی داده‌ها، یا تقسیم فایل‌های بزرگ، لینوکس **ابزارهای قدرتمندی** برای هر کار فراهم می‌کند.

در این فصل، **دستورات مختلفی برای پردازش فایل‌ها** را یاد خواهید گرفت که بخشی‌های مهمی از کارگاه‌های عملی لینوکس هستند.

> **خلاصه‌ی کلیدی:** **`cat`** برای نمایش محتوا، **`less`/`more`** برای نمایش صفحه‌ی صفحه، **`head`** برای خطوط اول، **`tail`** برای خطوط انتهایی، **`sort`** برای ترتیب‌دهی، **`split`** برای تقسیم، **`paste`** برای ترکیب، **`od`** برای نمایش باینری.

## دستور `cat` - نمایش محتوای فایل

### استفاده‌ی ساده

```bash
$ cat filename.txt
```

`cat` (concatenate) محتوای فایل را نمایش می‌دهد:

```bash
Line 1
Line 2
Line 3
```

### ترکیب چندین فایل

```bash
$ cat file1.txt file2.txt file3.txt
```

محتوای تمام فایل‌ها **یکی پس از دیگری** نمایش داده می‌شود.

### نمایش شماره‌ی خط

```bash
$ cat -n filename.txt
     1  Line 1
     2  Line 2
     3  Line 3
```

گزینه‌ی `-n` **شماره‌ی خطوط را نمایش می‌دهد**.

### ایجاد فایل جدید

```bash
$ cat > newfile.txt
(تایپ کنید و سپس Ctrl+D فشار دهید)
Hello World
This is new content
(Ctrl+D)
```

### ترکیب و ذخیره

```bash
$ cat file1.txt file2.txt > combined.txt
```

محتوای دو فایل را در یک فایل جدید ذخیره می‌کند.

## دستورات `less` و `more` - نمایش صفحه‌ی صفحه

### نمایش فایل بزرگ

```bash
$ less largefile.txt
$ more largefile.txt
```

فایل‌های بزرگ را **صفحه‌ی صفحه** نمایش می‌دهند.

### تفاوت بین `less` و `more`

| ویژگی | `less` | `more` |
|--------|--------|--------|
| **Navigation** | تک جهتی و دوجهتی | فقط جلو |
| **جستجو** | ✓ موجود | ✗ ندارد |
| **سرعت** | سریع | سریع |
| **دسترسی** | نه همه‌جا | بسیار رایج |

### کلیدهای navigation

```
Space     # صفحه‌ی بعد
b         # صفحه‌ی قبلی (فقط less)
j         # خط بعد
k         # خط قبلی (فقط less)
/pattern  # جستجو
q         # خروج
```

### مثال

```bash
$ less /var/log/syslog
(Navigation با کلیدهای بالا)
q         # خروج
```

## دستور `head` - خطوط اول

### نمایش 10 خط اول (پیش‌فرض)

```bash
$ head filename.txt
```

### نمایش n خط اول

```bash
$ head -n 5 filename.txt      # 5 خط اول
$ head -5 filename.txt        # روش کوتاه
```

### مثال

```bash
$ head -3 /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
```

## دستور `tail` - خطوط انتهایی

### نمایش 10 خط آخر (پیش‌فرض)

```bash
$ tail filename.txt
```

### نمایش n خط آخر

```bash
$ tail -n 5 filename.txt      # 5 خط آخر
$ tail -5 filename.txt        # روش کوتاه
```

### نمایش خطوط از شماره‌ی خاص

```bash
$ tail -n +100 filename.txt   # از خط 100 تا انتها
```

### Monitoring فایل (Real-time)

```bash
$ tail -f /var/log/syslog     # نمایش بروزرسانی‌های بلادرنگ
```

`-f` (follow) فایل را **پیوسته مراقبت می‌کند** و تغییرات جدید را نمایش می‌دهد.

## دستور `sort` - ترتیب‌دهی خطوط

### ترتیب‌دهی هجایی

```bash
$ sort filename.txt
```

### ترتیب‌دهی عددی

```bash
$ sort -n filename.txt        # ترتیب‌دهی عددی
```

### ترتیب معکوس

```bash
$ sort -r filename.txt        # معکوس
$ sort -rn filename.txt       # عددی و معکوس
```

### حذف تکراری‌ها

```bash
$ sort -u filename.txt        # Unique values
```

### ترتیب‌دهی بر اساس ستون

```bash
$ sort -k 2 file.txt          # بر اساس ستون 2
$ sort -k 2 -n file.txt       # عددی بر اساس ستون 2
```

## دستور `split` - تقسیم فایل

### تقسیم بر اساس تعداد خط

```bash
$ split -l 100 largefile.txt  # هر 100 خط یک فایل
```

نام‌های فایل‌های جدید: `xaa`, `xab`, `xac`, ...

### تقسیم بر اساس اندازه

```bash
$ split -b 1M largefile.txt   # هر 1 مگابایت یک فایل
```

### تقسیم با نام شخصی

```bash
$ split -l 50 largefile.txt part_
```

فایل‌های جدید: `part_aa`, `part_ab`, ...

## دستور `paste` - ترکیب فایل‌ها

### ترکیب عمودی (side-by-side)

```bash
$ paste file1.txt file2.txt
```

```
file1 line 1    file2 line 1
file1 line 2    file2 line 2
```

### تغییر جداکننده

```bash
$ paste -d ',' file1.txt file2.txt   # جداکننده: comma
$ paste -d ':' file1.txt file2.txt   # جداکننده: colon
```

## دستور `od` - نمایش باینری

### نمایش Octal

```bash
$ od -o filename.txt          # Octal format
```

### نمایش Hexadecimal

```bash
$ od -x filename.txt          # Hex format
```

### نمایش ASCII

```bash
$ od -c filename.txt          # ASCII format
```

## جدول خلاصه‌ی دستورات

| دستور | نقش | مثال |
|--------|------|--------|
| **cat** | نمایش کامل | `cat file.txt` |
| **less/more** | نمایش صفحه‌ای | `less largefile.txt` |
| **head** | n خط اول | `head -5 file.txt` |
| **tail** | n خط آخر | `tail -10 file.txt` |
| **sort** | ترتیب‌دهی | `sort -n numbers.txt` |
| **split** | تقسیم فایل | `split -l 100 file.txt` |
| **paste** | ترکیب فایل | `paste file1.txt file2.txt` |
| **od** | نمایش باینری | `od -x file.txt` |

## مثال‌های عملی

### Viewing Log Files

```bash
$ # آخرین 50 خط
$ tail -50 /var/log/syslog

$ # مراقبت بلادرنگ
$ tail -f /var/log/apache2/access.log
```

### Processing Data

```bash
$ # ترتیب و حذف تکراری
$ sort -u data.txt

$ # ترتیب عددی
$ sort -n numbers.txt

$ # ترکیب و رهگیری
$ paste users.txt ids.txt | sort -k 2 -n
```

### Splitting Large Files

```bash
$ # تقسیم فایل بزرگ
$ split -l 1000000 huge_dataset.csv dataset_

$ # ترکیب دوباره
$ cat dataset_* > huge_dataset.csv
```

## نکات اصلاحی

### سوءتفاهم: `cat` تنها برای نمایش است

**نه!** `cat` می‌تواند:
- فایل‌ها را **ترکیب کند**
- فایل‌های **جدید ایجاد کند**
- **شماره‌ی خط اضافه کند**

> **نکته:** نام `cat` از "concatenate" آمده است.

### سوءتفاهم: `less` و `more` یکسان هستند

**نه!** متفاوت هستند:
- **`more`:** ساده‌تر، فقط جلو
- **`less`:** قدرتمندتر، جستجو و ناوبری دوجهتی

> **نکته:** "less is more" - واقعی‌تر است!

## جمع‌بندی

دستورات پردازش فایل یک **مجموعه‌ی ضروری** از ابزارهای لینوکس هستند:
- **نمایش:** `cat`, `less`, `more`
- **استخراج:** `head`, `tail`
- **ترتیب:** `sort`
- **تقسیم:** `split`
- **ترکیب:** `paste`
- **باینری:** `od`

این دستورات به‌طور مستقل قدرتمند هستند و هنگام **ترکیب با pipes** بسیار قدرتمندتر می‌شوند.

```bash
$ cat large.txt | head -100 | sort | tail -10
```

یادگیری این دستورات **مهارت‌های اساسی** برای کار موثر با فایل‌ها در لینوکس است.
