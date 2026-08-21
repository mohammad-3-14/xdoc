---
title: تغییر مسیر جریان‌های ورودی و خروجی (Redirection)
description: آموزش تغییر مسیر stdin، stdout، stderr به فایل‌ها، pipes، و ترکیب جریان‌های مختلف
category: linux
tags: [lpic-1, redirection, pipes, stdin-stdout-stderr, file-redirection, stream-manipulation]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: تغییر مسیر جریان‌ها
  icon: i-lucide-arrow-right-left
---

# تغییر مسیر جریان‌های ورودی و خروجی (Redirection)

یکی از مفاهیم **بنیادی** لینوکس، ایده‌ی "همه‌چیز فایل است". این شامل **جریان‌های استاندارد** می‌شود: stdin، stdout و stderr. تغییر مسیر این جریان‌ها به‌شما اجازه می‌دهد **خروجی دستورات را کنترل کنید، خطاها را جداگانه ذخیره کنید، و دستورات را با یکدیگر لیو کنید**.

درک Redirection **یکی از مهم‌ترین مهارت‌های** هر کاربر لینوکس است.

> **خلاصه‌ی کلیدی:** **`>`** برای تغییر مسیر stdout به فایل (جایگزینی)، **`>>`** برای append، **`2>`** برای stderr، **`|`** برای pipe (ارسال خروجی به دستور دیگر)، **`<`** برای stdin از فایل.

## جریان‌های استاندارد (Streams)

لینوکس سه جریان استاندارد دارد:

| جریان | نام | عدد | توضیح |
|--------|------|------|--------|
| **stdin** | Standard Input | 0 | داده‌های ورودی |
| **stdout** | Standard Output | 1 | خروجی معمولی |
| **stderr** | Standard Error | 2 | پیام‌های خطا |

## تغییر مسیر Stdout (`>` و `>>`)

### به فایل (جایگزینی)

```bash
$ echo "Hello" > output.txt
$ cat output.txt
Hello
```

`>` تمام محتوای فایل را **جایگزین** می‌کند.

### Append (افزودن)

```bash
$ echo "Line 1" > file.txt
$ echo "Line 2" >> file.txt
$ cat file.txt
Line 1
Line 2
```

`>>` **انتهای فایل اضافه می‌کند**.

### مثال عملی

```bash
$ ls -la > file_list.txt
$ ps aux >> running_processes.txt
```

## تغییر مسیر Stderr (`2>` و `2>>`)

### Stderr به فایل

```bash
$ grep "pattern" nonexistent.txt 2> errors.txt
$ cat errors.txt
grep: nonexistent.txt: No such file or directory
```

`2>` **پیام‌های خطا** را به فایل ارسال می‌کند.

### Stdout و Stderr جدا

```bash
$ command > output.txt 2> errors.txt
```

**خروجی معمولی** در `output.txt` و **خطاها** در `errors.txt`.

### ترکیب Stdout و Stderr

```bash
$ command > output.txt 2>&1
```

هم **خروجی** و هم **خطاها** در یک فایل.

### Modern syntax

```bash
$ command &> output.txt
```

هم stdout و stderr را یک‌جا ارسال می‌کند.

## Pipes (`|`)

### Pipes برای ارسال خروجی

```bash
$ echo "hello world" | wc -w
2
```

**خروجی** دستور اول (`echo`) به **ورودی** دستور دوم (`wc`) ارسال می‌شود.

### تعداد Pipes

```bash
$ cat file.txt | grep "error" | wc -l
```

خروجی **چند دستور را ترکیب می‌کند**:
1. نمایش محتوای `file.txt`
2. تنها خطوطی که "error" دارند
3. شمارش آن‌ها

## Stdin Redirection (`<`)

### خواندن از فایل

```bash
$ wc < file.txt
```

**محتوای فایل** به عنوان stdin به دستور ارسال می‌شود.

معادل:
```bash
$ cat file.txt | wc
```

## جدول خلاصه‌ی Redirection

| نماد | توضیح |
|------|--------|
| **`> file`** | Stdout به فایل (جایگزینی) |
| **`>> file`** | Stdout به فایل (append) |
| **`2> file`** | Stderr به فایل |
| **`2>> file`** | Stderr به فایل (append) |
| **`&> file`** | Stdout + Stderr به فایل |
| **`< file`** | Stdin از فایل |
| **`\| command`** | Pipe (stdout → stdin) |

## مثال‌های عملی

### جستجو و ذخیره‌سازی نتیجه

```bash
$ grep "error" /var/log/syslog | wc -l > error_count.txt
```

شمارش خطوط با "error" و ذخیره‌ی نتیجه.

### جداسازی خطاها

```bash
$ find / -type f 2> errors.txt 1> files.txt
```

**فایل‌ها** در `files.txt` و **خطاها** در `errors.txt`.

### Processing پیچیده

```bash
$ cat users.txt | grep "admin" | sort | uniq > unique_admins.txt
```

1. نمایش users
2. فیلتر "admin"
3. مرتب‌سازی
4. حذف تکراری‌ها
5. ذخیره

### دانلود و شمارش

```bash
$ curl https://example.com/data.txt | wc -l
```

دانلود و **شمارش خطوط بدون ذخیره** موقت.

## Redirection های پیشرفته

### Duplicate Descriptor

```bash
$ command 2>&1         # Stderr به stdout
$ command 1>&2         # Stdout به stderr
```

### Discard Output

```bash
$ command > /dev/null          # Stdout را نادیده بگیر
$ command 2> /dev/null         # Stderr را نادیده بگیر
$ command &> /dev/null         # همه را نادیده بگیر
```

### Here Document

```bash
$ cat << EOF
This is a multi-line
input that ends with EOF
EOF
```

## نکات اصلاحی

### سوءتفاهم: `>` و `>>` یکسان هستند

**نه!** متفاوت هستند:
- **`>`:** جایگزینی (حذف محتوای قبلی)
- **`>>`:** append (افزودن به انتهای فایل)

```bash
$ echo "First" > file.txt    # file = "First"
$ echo "Second" > file.txt   # file = "Second" (اول حذف شد!)
$ echo "Third" >> file.txt   # file = "Second\nThird"
```

> **نکته:** **`>>`** محفوظ‌تر است برای ذخیره‌ی اطلاعات.

### سوءتفاهم: Pipes مانند Redirection هستند

**نه!**
- **Pipes:** خروجی یک دستور → ورودی دستور دیگر
- **Redirection:** جریان‌ها → فایل‌ها

```bash
$ command1 | command2         # Pipe
$ command1 > file.txt         # Redirection
```

> **نکته:** Pipes **دستورات را در سریال اجرا می‌کند**، redirection **فایل‌ها را فعل‌وانفعال می‌کند**.

## جمع‌بندی

Redirection **مفهوم اساسی** لینوکس است:
- **`>`، `>>`:** فایل‌های خروجی
- **`2>`, `2>>`:** فایل‌های خطا
- **`|`:** ترکیب دستورات
- **`<`:** ورودی از فایل

یادگیری redirection **تغییری بزرگ در توانایی** شما است.

مهم‌ترین نکات:
- **`>`** جایگزینی می‌کند
- **`>>`** append می‌کند
- **`2>`** خطاها را کنترل می‌کند
- **`|`** دستورات را متصل می‌کند
