---
title: دستور Grep برای جستجوی متن
description: آموزش کامل دستور grep برای جستجو و فیلتر کردن متن، pattern‌های منظم (regex)، گزینه‌های مهم
category: linux
tags: [lpic-1, grep, text-search, pattern-matching, regex, regular-expressions, filtering]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: دستور Grep
  icon: i-lucide-search
---

# دستور Grep برای جستجوی متن

Grep یکی از **قدرتمندترین ابزارهای** کار کردن با متن در لینوکس است. نام آن از **G**lobal **R**egular **E**xpression **P**rint آمده است. Grep برای **جستجوی الگوهای خاص در متن** و **فیلتر کردن داده‌ها** استفاده می‌شود.

آیا بخواهید **تمام خطوطی که شامل کلمه‌ی خاص هستند را پیدا کنید**؟ یا **خطوط که شامل شماره هستند**؟ یا **تمام خطوط که یک الگوی خاص را دنبال می‌کنند**؟ Grep این همه کارها و بیشتر را انجام می‌دهد.

> **خلاصه‌ی کلیدی:** **`grep pattern filename`** برای جستجوی pattern در فایل، **`grep -i` برای جستجوی غیرحساس به بزرگ/کوچک**، **`grep -v` برای خطوط که pattern را ندارند**، **`grep -E` برای regex توسعه‌یافته**. **Pipes** (`|`) برای استفاده‌ی grep با دستورات دیگر بسیار قدرتمند است.

## مقدمه‌ی Grep

### استفاده‌ی ساده

```bash
$ grep "search_term" filename.txt
```

Grep تمام خطوطی را که **شامل "search_term" هستند** را نمایش می‌دهد.

### مثال

فرض کنید فایل `users.txt` به‌شرح زیر است:
```
ali
behnam
ali_reza
alireza
sara
```

### جستجوی "ali"

```bash
$ grep "ali" users.txt
ali
ali_reza
alireza
```

Grep تمام خطوطی را که **شامل "ali"** هستند را نمایش می‌دهد.

## گزینه‌های اساسی

### `-i` - جستجوی غیرحساس به بزرگ/کوچک (Case-insensitive)

```bash
$ grep -i "ALI" users.txt
ali
ali_reza
alireza
```

یافت می‌شود حتی با **بزرگ‌نویسی متفاوت**.

### `-v` - معکوس کردن (نمایش خطوط بدون pattern)

```bash
$ grep -v "ali" users.txt
behnam
sara
```

تنها خطوطی که **شامل "ali" نیستند** نمایش داده می‌شوند.

### `-c` - شمارش خطوط

```bash
$ grep -c "ali" users.txt
3
```

**تعداد خطوطی که pattern را دارند** را نمایش می‌دهد.

### `-n` - نمایش شماره‌ی خط

```bash
$ grep -n "ali" users.txt
1:ali
3:ali_reza
4:alireza
```

**شماره‌ی خط** قبل از محتوا نمایش داده می‌شود.

### `-l` - نام‌های فایل‌هایی که pattern را دارند

```bash
$ grep -l "ali" *.txt
users.txt
names.txt
```

تنها **نام‌های فایلی که شامل pattern هستند** را نمایش می‌دهد.

### `-E` - استفاده‌ی Regex توسعه‌یافته

```bash
$ grep -E "[0-9]+" users.txt
user123
admin456
```

**الگوهای منظم پیشرفته** را پشتیبانی می‌کند.

## جستجو در چندین فایل

### جستجو در تمام فایل‌ها

```bash
$ grep "search_term" *.txt
file1.txt:line with search_term
file2.txt:line with search_term
```

Grep **تمام فایل‌های منطبق** را جستجو می‌کند.

### جستجو بازگشتی (Recursive)

```bash
$ grep -r "search_term" /path/to/directory
directory/file1.txt:line
directory/subdir/file2.txt:line
```

**تمام فایل‌های زیردایرکتوری** را جستجو می‌کند.

## الگوهای منظم (Regex)

### الگوهای ساده

```bash
$ grep "^ali" users.txt      # خطوطی که با "ali" شروع می‌شوند
$ grep "sara$" users.txt     # خطوطی که با "sara" تمام می‌شوند
$ grep "a.i" users.txt       # "a" و "i" با یک کاراکتر درمیان
$ grep "a*i" users.txt       # هر تعداد "a"
$ grep "[aeiou]" users.txt   # خطوطی که حروف مصوت دارند
$ grep "[0-9]" users.txt     # خطوطی که عدد دارند
```

### مثال‌های عملی

فایل `log.txt`:
```
user1 logged in
USER2 LOGGED OUT
admin123 failed
error occurred
success message
```

```bash
$ grep -i "logged" log.txt
user1 logged in
USER2 LOGGED OUT

$ grep "[0-9]" log.txt
admin123 failed

$ grep "^[a-z]" log.txt
user1 logged in
admin123 failed
error occurred
success message

$ grep "[A-Z]" log.txt
USER2 LOGGED OUT
```

## Grep با Pipes (لوله‌ها)

### استفاده‌ی Grep در Pipeline

Grep معمولاً با **pipes (`|`)** برای **فیلتر کردن خروجی دستورات دیگر** استفاده می‌شود:

```bash
$ ps aux | grep firefox
```

تمام **فرایندهای مرتبط با Firefox** را نمایش می‌دهد.

### مثال‌های دیگر

```bash
$ ls -la | grep "^d"         # تنها دایرکتوری‌ها
$ cat /etc/passwd | grep "bash"  # کاربرانی که از bash استفاده می‌کنند
$ ps aux | grep -v grep      # فرایندها بدون خط grep خود
$ df -h | grep /home         # partition مرتبط با /home
```

## جدول خلاصه‌ی گزینه‌ها

| گزینه | توضیح |
|--------|--------|
| `-i` | Ignore case (غیرحساس) |
| `-v` | معکوس (خطوط بدون pattern) |
| `-c` | تنها شمارش |
| `-n` | نمایش شماره‌ی خط |
| `-l` | تنها نام‌های فایل |
| `-E` | Regex توسعه‌یافته |
| `-r` | جستجوی بازگشتی |
| `-w` | جستجوی کلمه کامل |
| `-A n` | n خط بعد از match |
| `-B n` | n خط قبل از match |
| `-C n` | n خط قبل و بعد |

## مثال‌های عملی مفید

### پیدا کردن خطوط خاص

```bash
$ # خطوطی که "error" دارند
$ grep -i "error" /var/log/syslog

$ # خطوطی که با # شروع نمی‌شوند (برای config files)
$ grep -v "^#" /etc/ssh/sshd_config | grep -v "^$"

$ # IP addresses در فایل
$ grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" /var/log/access.log

$ # کاربرانی که shell دارند
$ grep "/bin/bash$" /etc/passwd
```

### شمارش تعداد

```bash
$ # تعداد دفعات که "ERROR" ظاهر شده است
$ grep -c "ERROR" /var/log/syslog

$ # تعداد users
$ grep -c "^" /etc/passwd
```

### نمایش متن اطراف

```bash
$ # 3 خط قبل و بعد
$ grep -C 3 "search_term" filename.txt

$ # 2 خط بعد
$ grep -A 2 "search_term" filename.txt

$ # 2 خط قبل
$ grep -B 2 "search_term" filename.txt
```

## نکات اصلاحی

### سوءتفاهم: Grep تنها دقیق است

**نه!** Grep می‌تواند:
- **غیرحساس به بزرگ/کوچک** باشد (`-i`)
- **الگوهای پیچیده** را پشتیبانی کند (`-E`)
- **معکوس شود** (`-v`)

> **نکته:** Grep **بسیار انعطاف‌پذیر و قدرتمند است**.

### سوءتفاهم: Grep فقط برای فایل‌ها است

**نه!** Grep می‌تواند:
- **خروجی دستورات** را فیلتر کند (pipes)
- **stdin** را خوانده و پردازش کند

> **نکته:** Grep بخشی از **فلسفه لینوکس** است: "ابزارهایی کوچک که خوب کار می‌کنند و با یکدیگر می‌شود آن‌ها را ترکیب کرد."

## جمع‌بندی

Grep یک ابزار **اساسی و ضروری** برای:
- **جستجوی متن** در فایل‌ها
- **فیلتر کردن خروجی** دستورات
- **تجزیه‌ی فایل‌های log**
- **پردازش داده‌ها**

مهم‌ترین گزینه‌ها:
- **`-i`:** غیرحساس
- **`-v`:** معکوس
- **`-c`:** شمارش
- **`-n`:** شماره‌ی خط
- **`-E`:** regex

یادگیری Grep **سرمایه‌گذاری خوبی** برای هر کاربر لینوکس است. هر روز این ابزار را استفاده خواهید کرد.
