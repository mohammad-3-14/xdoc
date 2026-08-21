---
title: دستور Xargs برای اجرای دستورات با آرگومان‌های stdin
description: آموزش کامل xargs برای تبدیل stdout به اجرای دستور، مدیریت آرگومان‌ها، و handling فایل‌های با فاصله
category: linux
tags: [lpic-1, xargs, command-arguments, stdin-to-command, batch-processing, find-xargs]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: Xargs - اجرای دستورات
  icon: i-lucide-zap
---

# دستور Xargs برای اجرای دستورات با آرگومان‌های stdin

Xargs یکی از **قدرتمندترین ابزارهای** پردازش دسته‌ای (batch processing) در لینوکس است. نام آن از **eXtended ARGuments** آمده است. Xargs برای **تبدیل خروجی یک دستور به آرگومان‌های دستور دیگر** استفاده می‌شود.

Xargs بخشی اساسی از **فلسفه لینوکس** است: ابزارهای کوچک که **یکدیگر را تقویت می‌کنند**. درک عمیق Xargs مهارت‌های اتوماسیون و پردازش دسته‌ای شما را **بسیار بهتر می‌کند**.

> **خلاصه‌ی کلیدی:** **`command | xargs another_command`** برای تبدیل stdout به آرگومان، **`xargs -n 1`** برای یک آرگومان در هر دستور، **`xargs -0`** برای handling فایل‌های با فاصله (با `-print0` از find)، **`xargs -I {}`** برای جایگذاری آرگومان‌ها در جای خاص.

## مقدمه‌ی Xargs

### مشکل بدون Xargs

فرض کنید می‌خواهید **تمام فایل‌های با نام "test" را حذف کنید**:

```bash
$ find /tmp -name "test" -type f
/tmp/test1
/tmp/test2
/tmp/test3

$ # سعی کردن pipe به rm
$ find /tmp -name "test" -type f | rm
# ERROR: rm: standard input is not a file
```

`rm` **آرگومان‌های لازم دارد**، نه stdin!

### حل با Xargs

```bash
$ find /tmp -name "test" -type f | xargs rm
```

Xargs **stdout find را به آرگومان‌های rm تبدیل می‌کند**.

معادل:
```bash
$ rm /tmp/test1 /tmp/test2 /tmp/test3
```

## استفاده‌ی ساده

### اجرای دستور برای هر input

```bash
$ echo "file1 file2 file3" | xargs rm
```

معادل:
```bash
$ rm file1 file2 file3
```

### مثال عملی

```bash
$ echo "hello world linux" | xargs echo
hello world linux

$ echo -e "apple\nbanana\ncherry" | xargs echo
apple banana cherry
```

## گزینه‌های مهم

### `-n` - تعداد آرگومان در هر دستور

```bash
$ echo "1 2 3 4 5" | xargs -n 2 echo
1 2
3 4
5
```

هر دستور **2 آرگومان دریافت می‌کند**.

```bash
$ echo "1 2 3 4 5" | xargs -n 1 echo
1
2
3
4
5
```

### `-I {}` - جایگذاری آرگومان در جای خاص

```bash
$ echo "file1 file2 file3" | xargs -I {} cp {} {}.bak
```

`{}` جای آرگومان است:
- `file1` → `cp file1 file1.bak`
- `file2` → `cp file2 file2.bak`
- `file3` → `cp file3 file3.bak`

### `-0` - Null-terminated input (برای فایل‌های با فاصله)

```bash
$ find /tmp -name "*.txt" -print0 | xargs -0 rm
```

**`-print0`** از find فایل‌ها را با null character جدا می‌کند (بدون newline).
**`-0`** در xargs null characters را فهم می‌کند.

### مثال: فایل‌های با فاصله

```bash
# بدون -0 (اشتباه)
$ find /tmp -name "my file" -print | xargs rm
# خطا: فایل "my" و "file" را جستجو می‌کند

# با -0 (درست)
$ find /tmp -name "my file" -print0 | xargs -0 rm
# درست: فایل "my file" را حذف می‌کند
```

### `-p` - تایید قبل از اجرا (Interactive)

```bash
$ echo "file1 file2 file3" | xargs -p rm
rm file1 file2 file3 ?...
```

تایید: `y` برای yes، `n` برای no

## مثال‌های عملی

### حذف فایل‌های پیدا‌شده

```bash
$ # حذف فایل‌های cache
$ find ~/.cache -type f | xargs rm

$ # بدون spaces، safer:
$ find ~/.cache -type f -print0 | xargs -0 rm
```

### Grep و xargs

```bash
$ # یافتن فایل‌های شامل "TODO"
$ grep -l "TODO" *.py | xargs rm

$ # Compress فایل‌های پیدا‌شده
$ find /var/log -name "*.log" -type f | xargs gzip
```

### Copy چندین فایل

```bash
$ # Copy تمام .txt فایل‌ها
$ find . -name "*.txt" | xargs -I {} cp {} backup/{}
```

### اجرای دستور برای هر فایل

```bash
$ # اجرای script برای هر Python file
$ find . -name "*.py" | xargs -I {} python3 lint.py {}

$ # معادل:
$ python3 lint.py file1.py
$ python3 lint.py file2.py
$ python3 lint.py file3.py
```

### Processing فایل‌های بزرگ

```bash
$ # Process فایل‌های بزرگ به صورت batch
$ find /data -type f | xargs -n 100 process_batch.sh

$ # هر 100 فایل یک بار اجرا می‌شود
```

## جدول گزینه‌های مهم

| گزینه | توضیح |
|--------|--------|
| **`-n num`** | تعداد آرگومان در هر دستور |
| **`-I {}`** | جایگذاری آرگومان در جای {} |
| **`-0`** | Null-terminated input |
| **`-p`** | تایید قبل از اجرا |
| **`-t`** | نمایش دستور قبل از اجرا |
| **`-r`** | اگر EOF بدون newline، خیر |
| **`--max-procs num`** | اجرا کردن همزمان (parallel) |

## Xargs vs سایر روش‌ها

### روش 1: Loop (آهسته)

```bash
$ for f in *.txt; do
    rm "$f"
done
```

### روش 2: Shell substitution (محدود)

```bash
$ rm $(find . -name "*.txt")
# خطر: اگر خروجی خیلی بزرگ باشد، overflow می‌کند
```

### روش 3: Xargs (بهترین)

```bash
$ find . -name "*.txt" -print0 | xargs -0 rm
# ایمن، سریع، قدرتمند
```

## نکات اصلاحی

### سوءتفاهم: Xargs تنها برای حذف است

**نه!** Xargs می‌تواند:
- **دستورات هر چند را اجرا کند**
- **آرگومان‌ها را در جای خاص قرار دهد** (`-I`)
- **parallel execution** انجام دهد

```bash
$ echo "apple banana cherry" | xargs -I {} echo "Fruit: {}"
Fruit: apple
Fruit: banana
Fruit: cherry
```

> **نکته:** Xargs یک **ابزار عام‌مقصد** برای batch processing است.

### سوءتفاهم: Xargs و pipes یکسان هستند

**نه!** متفاوت هستند:
- **Pipes:** stdout یک دستور → stdin دستور دیگر
- **Xargs:** stdout یک دستور → **آرگومان‌های** دستور دیگر

```bash
$ echo "hello" | wc            # pipe: "hello" به wc
hello

$ echo "hello" | xargs wc      # xargs: hello به عنوان آرگومان
(می‌تلاش می‌کند فایل "hello" را باز کند)
```

> **نکته:** pipes **stdin را تغییر می‌دهند**، xargs **آرگومان‌ها را تغییر می‌دهد**.

### سوءتفاهم: `-0` بدون `-print0` کار می‌کند

**نه!** باید `find` یا دستوری که `-0` را درک می‌کند استفاده کنید:

```bash
$ find . -name "*.txt" -print0 | xargs -0 rm  # درست

$ echo "file1 file2" | xargs -0 rm            # اشتباه
# `-0` منتظر null characters است، نه newlines
```

## Performance و Parallel Execution

### اجرای Parallel (چندگانه‌ی همزمان)

```bash
$ find /data -type f | xargs -P 4 -n 100 process.sh
```

**`-P 4`** = 4 فرایند همزمان
**`-n 100`** = 100 فایل در هر دستور

برای **پردازش سریع‌تر** فایل‌های بزرگ بسیار مفید است.

## جمع‌بندی

Xargs یک ابزار **ضروری** برای:
- **حذف batch**: `find | xargs rm`
- **Processing batch**: `find | xargs process.sh`
- **Handling filenames**: `find -print0 | xargs -0`
- **Parallel execution**: `xargs -P`

مهم‌ترین نکات:
- **`-0` و `-print0`:** برای فایل‌های با فاصله/newline
- **`-I {}`:** برای جایگذاری آرگومان
- **`-n`:** برای تعداد آرگومان
- **`-P`:** برای parallel execution

درک Xargs **شما را به یک مدیر سیستم ماهرتر تبدیل می‌کند** و **اتوماسیون کارها را ممکن می‌کند**.
