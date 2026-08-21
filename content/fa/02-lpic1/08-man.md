---
title: دستور Man و دریافت کمک در لینوکس
description: آموزش کامل استفاده از دستور man برای دریافت مستندات و راهنما برای دستورات و برنامه‌های لینوکس، جستجو و nawigation در صفحات man
category: linux
tags: [lpic-1, man-pages, manual, help, man-sections, whatis, apropos, info-command]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: دستور Man و کمک گرفتن
  icon: i-lucide-help-circle
---

# دستور Man و دریافت کمک در لینوکس

هیچ‌کس نمی‌تواند تمام جزئیات تمام دستورات و برنامه‌های لینوکس را بخاطر داشته باشد. این سبب طراحی **دستور `man`** شد، که نام‌اختصاری برای "Manual" است. دستور `man` مجموعه‌ای جامع از مستندات را برای تقریباً تمام برنامه‌های لینوکس در اختیار شما قرار می‌دهد.

درک عمیق نحوه استفاده از `man` یکی از مهم‌ترین مهارت‌های برای هر کاربر یا مدیری لینوکس است. نه تنها می‌تواند زمان صرف‌شده برای جستجو را کاهش دهد، بلکه مستندات جامع و قابل‌اعتمادی را برای هر موقعیتی فراهم می‌کند.

> **خلاصه‌ی کلیدی:** دستور **`man command`** **صفحه‌ی راهنما (manual page) برای دستور مشخص شده را نمایش می‌دهد**. صفحات man به **8 بخش** تقسیم می‌شوند (برنامه‌های کاربری، فراخوانی سیستمی، توابع، فایل‌های فرمت و غیره). می‌توانید از **`man -k keyword`** یا **`apropos`** برای **جستجو در صفحات man** استفاده کنید و از **`whatis`** برای **توضیح یک‌خطی دستور** بهره ببرید.

## دستور Man چیست؟

دستور `man` (Manual) یک **سیستم راهنمایی یکپارچه** برای لینوکس است که شامل مستندات فنی است برای:
- **دستورات Shell:** `ls`, `cat`, `grep` و غیره
- **فراخوانی‌های سیستمی:** `open`, `read`, `write` و غیره
- **توابع کتاب‌خانه:** توابع C و غیره
- **فایل‌های فرمت:** ساختار فایل‌های سیستمی
- **برنامه‌های اضافی:** برنامه‌های نصب‌شده توسط کاربر

## استفاده‌ی اساسی `man`

### مشاهده‌ی صفحه‌ی راهنمای دستور

```bash
$ man ls
```

این دستور صفحه‌ی راهنمای دستور `ls` را باز می‌کند. صفحه‌ی man شامل موارد زیر است:

```text
NAME
    ls - list directory contents

SYNOPSIS
    ls [OPTION]... [FILE]...

DESCRIPTION
    List information about the FILEs (the current directory by default).
    Sort entries alphabetically if none of -cftuvSUX or --sort is specified.

OPTIONS
    -a, --all
        do not ignore entries starting with .

    -l
        use a long listing format

    -h, --human-readable
        print sizes in human readable format (e.g., 1K 234M 2G)
```

### بخش‌های صفحه‌ی Man

هر صفحه‌ی man معمولاً شامل بخش‌های استاندارد است:

| بخش | توضیح |
|------|--------|
| **NAME** | نام برنامه/دستور و توضیح یک‌خطی |
| **SYNOPSIS** | خلاصه‌ی نحوه‌ی استفاده و گزینه‌ها |
| **DESCRIPTION** | شرح تفصیلی برنامه و نحوه‌ی کار |
| **OPTIONS** | لیست تمام گزینه‌ها و معنای آن‌ها |
| **EXAMPLES** | مثال‌های عملی برای استفاده |
| **SEE ALSO** | دستورات و موضوعات مرتبط |
| **AUTHOR** | نویسنده برنامه |
| **COPYRIGHT** | اطلاعات مجوز و کپی‌رایت |

### Navigation در صفحات Man

درون صفحه‌ی man، می‌توانید از کلیدهای زیر برای حرکت استفاده کنید:

| کلید | کار |
|------|------|
| **Space** | پیمایش یک صفحه به‌پایین |
| **b** | پیمایش یک صفحه به‌بالا |
| **d** | پیمایش نیم صفحه به‌پایین |
| **u** | پیمایش نیم صفحه به‌بالا |
| **j** | حرکت یک خط به‌پایین |
| **k** | حرکت یک خط به‌بالا |
| **g** | رفتن به ابتدای صفحه |
| **G** | رفتن به انتهای صفحه |
| **q** | خروج از man |

### جستجو درون صفحه‌ی Man

برای جستجوی کلمه یا عبارتی درون صفحه‌ی man:

```bash
/keyword          # جستجو به‌سمت پایین برای keyword
?keyword          # جستجو به‌سمت بالا برای keyword
n                 # نتیجه‌ی بعدی
N                 # نتیجه‌ی قبلی
```

**مثال:**

```bash
$ man ls
/human-readable   # جستجوی "human-readable"
(پرش به بخش مرتبط)

n                 # نتیجه‌ی بعدی
```

## بخش‌های Man (Manual Sections)

صفحات man به **8 بخش** اصلی تقسیم می‌شوند:

| بخش | عنوان | مثال |
|------|--------|--------|
| **1** | User Commands (دستورات کاربری) | `ls`, `cat`, `grep`, `man` |
| **2** | System Calls (فراخوانی‌های سیستمی) | `open`, `read`, `write` |
| **3** | Library Functions (توابع کتاب‌خانه) | `printf`, `malloc` |
| **4** | Special Files (فایل‌های ویژه) | `/dev/null`, `/dev/zero` |
| **5** | File Formats (فرمت‌های فایل) | `fstab`, `passwd` |
| **6** | Games | `tetris` |
| **7** | Miscellaneous (مختلف) | `man`, `inode`, `socket` |
| **8** | System Administration (مدیریت سیستم) | `useradd`, `fdisk` |

### جستجو در بخش خاص

اگر یک نام در چند بخش موجود باشد، می‌توانید بخش خاص را مشخص کنید:

```bash
$ man printf       # بخش 1 (دستور printf)
$ man 3 printf     # بخش 3 (تابع printf کتاب‌خانه C)

$ man 5 passwd     # فرمت فایل passwd
$ man 1 passwd     # دستور passwd
```

## جستجو در صفحات Man

### دستور `man -k` برای جستجوی کلمات کلیدی

```bash
$ man -k directory
```

این دستور تمام صفحات man را که شامل کلمه‌ی "directory" هستند را نمایش می‌دهد:

```bash
cd (1)              - change the working directory
mkdir (1)           - make directories
ls (1)              - list directory contents
find (1)            - search for files in a directory tree
```

### دستور `apropos` - جستجوی بهتر

دستور `apropos` مثل `man -k` است اما برای جستجوی عبارات طولانی‌تر مفید است:

```bash
$ apropos "file permissions"
chmod (1)           - change file mode bits
chown (1)           - change file owner and group
```

### دستور `whatis` - توضیح یک‌خطی

دستور `whatis` **توضیح یک‌خطی** برای دستور را نمایش می‌دهد:

```bash
$ whatis ls
ls (1)              - list directory contents

$ whatis grep
grep (1)            - print lines that match patterns

$ whatis man
man (1)             - an interface to the on-line reference manuals
man (7)             - macros to format man pages
```

## صفحات Man Info

برای برنامه‌های GNU پیشرفته‌تر، **صفحات info** موجود هستند:

```bash
$ info ls
$ info grep
```

صفحات info فرمت‌بندی بهتری دارند و می‌توانند **پیوند داخلی (hyperlinks)** داشته باشند.

## متغیرهای مرتبط

### `MANPATH` - مسیر جستجوی صفحات Man

```bash
$ echo $MANPATH
/usr/local/man:/usr/local/share/man:/usr/share/man

$ export MANPATH=$MANPATH:/opt/custom/man
```

### `PAGER` - نمایشگر صفحات Man

```bash
$ export PAGER=less  # پیش‌فرض
$ export PAGER=more
```

## مثال‌های عملی

### یافتن دستوری که نام آن یادتان نرفته

```bash
$ apropos "change password"
passwd (1)          - change user password
chpasswd (8)        - update passwords in batch mode
```

### یافتن شماره‌ی سکشن صفحه‌ی Man

```bash
$ man -k read | grep "(2)"
read (2)            - read from a file descriptor
```

### مشاهده‌ی دستورات مشابه

```bash
$ man ls
$ whatis ls
ls (1)              - list directory contents

# داخل man پرش به مرتبط‌ها
SEE ALSO
    dir(1), vdir(1), ls(1), ...
```

## گزینه‌های مفید `man`

| گزینه | توضیح |
|-------|--------|
| `man command` | نمایش صفحه‌ی راهنما برای دستور |
| `man 5 command` | نمایش صفحه‌ی راهنما از بخش 5 |
| `man -a command` | نمایش تمام صفحات man برای دستور |
| `man -k keyword` | جستجو در صفحات man |
| `man -f command` | مثل `whatis` |
| `man -w` | نمایش مسیر فایل صفحه‌ی man |

## نکات اصلاحی و دقیق‌تر

### سوءتفاهم: تمام دستورات دارای صفحه‌ی Man نیستند

برخی دستورات (خاص‌الذکر **built-ins** Shell مانند `cd` و `echo`) ممکن است صفحه‌ی man نداشته باشند:

```bash
$ man cd
No manual entry for cd
```

برای این دستورات، می‌توانید از `help` استفاده کنید:

```bash
$ help cd
cd: cd [-L|[-P [-e]] [-@]] [dir]
    Change the shell working directory.
```

> **نکته‌ی اصلاحی:** **Built-in دستورات Shell** معمولاً صفحه‌ی man ندارند. برای آن‌ها از دستور `help` استفاده کنید.

### سوءتفاهم: `-k` و `apropos` نتایج متفاوتی دهند

بعضی اوقات `-k` و `apropos` نتایج متفاوتی می‌دهند زیرا بخش‌های پایگاه‌داده متفاوت استفاده می‌کنند. بهتر است `mandb` را اجرا کنید برای بروزرسانی:

```bash
$ sudo mandb
Building database...
```

> **نکته‌ی اصلاحی:** اگر جستجو نتایج نامناسبی دهد، پایگاه‌داده صفحات man ممکن است قدیمی باشد. `sudo mandb` را اجرا کنید.

### سوءتفاهم: صفحات Man برای برنامه‌های شخصی

اگر شما برنامه‌ای بنویسید و می‌خواهید صفحه‌ی man برایش داشته باشید، باید فایل مستندات را در مسیر درست قرار دهید:

```bash
$ mkdir -p ~/man/man1
$ # نوشتن صفحه‌ی man برای برنامه‌ی شخصی
$ export MANPATH=~/man:$MANPATH
```

## جمع‌بندی

دستور `man` یک ابزار قدرتمند و ضروری برای هر کاربر لینوکس است. اگر شما:
- **`man command`** را بدانید، می‌توانید صفحه‌ی راهنما را ببینید
- **navigation کلیدها** را بدانید، می‌توانید سریع جستجو کنید
- **بخش‌های man** را بفهمید، می‌توانید درست‌ترین صفحه را پیدا کنید
- **`man -k` و `apropos`** را بدانید، می‌توانید دستورات را جستجو کنید
- **`whatis`** را بدانید، می‌توانید توضیح سریع بگیرید

یکی از مزایای لینوکس این است که **مستندات عالی و رایگان** در اختیار شما هستند. کسی که بتواند کاملاً از `man` استفاده کند، می‌تواند تقریباً هر مشکلی را حل کند.

موضوع بعدی **ویرایشگر‌های متنی و مقدمه‌ای بر ویرایش فایل‌ها** است، جایی که دانش `man` مفید خواهد بود.
