---
title: چک‌سام فایل و تایید درستی فایل‌ها
description: آموزش دستورات md5sum، sha256sum، sha1sum برای محاسبه‌ی چک‌سام و تایید یکپارچگی فایل‌ها
category: linux
tags: [lpic-1, checksums, md5sum, sha256sum, file-integrity, hash-verification, data-integrity]
date: 2025-01-15
updatedAt: 2025-01-15
draft: false
navigation:
  title: چک‌سام فایل
  icon: i-lucide-shield-check
---

# چک‌سام فایل و تایید درستی فایل‌ها

یکی از مشکلات بزرگ در **انتقال فایل‌ها** (مخصوصاً فایل‌های بزرگ) این است که **آیا فایل صحیح‌تر به انجام رسیده است**؟ آیا برخی بایت‌ها **فساد شده‌اند** یا **تغییر کرده‌اند**؟

دستورات **checksum** راهی برای **تایید یکپارچگی (integrity)** فایل‌ها هستند. این دستورات **یک رشته‌ی منفرد** را محاسبه می‌کنند که بر اساس **محتوای فایل** است. اگر حتی **یک بایت** تغییر کند، چک‌سام **کاملاً متفاوت** خواهد شد.

> **خلاصه‌ی کلیدی:** **`md5sum filename`** برای محاسبه‌ی MD5 checksum (32 کاراکتر)، **`sha256sum filename`** برای SHA-256 (64 کاراکتر)، **`sha1sum filename`** برای SHA-1 (40 کاراکتر). می‌توانید **چک‌سام‌ها را در فایل ذخیره کنید** و **`-c` گزینه برای تایید** استفاده کنید.

## چک‌سام چیست؟

چک‌سام (Checksum) یا **Hash** یک **رشته‌ی متنی منفرد** است که بر اساس **کل محتوای فایل** محاسبه می‌شود. مثل **اثر انگشت** برای فایل است:
- اگر فایل **تغییر کند**، چک‌سام **تغییر می‌کند**
- اگر فایل **بدون تغییر** باشد، چک‌سام **یکسان** باقی می‌ماند

## دستور `md5sum`

### محاسبه‌ی MD5 Checksum

```bash
$ md5sum filename.txt
5d41402abc4b2a76b9719d911017c592  filename.txt
```

خروجی:
- **32 کاراکتر:** MD5 checksum
- **نام فایل:** نام فایل مورد محاسبه

### چک‌سام چندین فایل

```bash
$ md5sum file1.txt file2.txt file3.txt
d8e8fca2dc0f896fd7cb4cb0031ba249  file1.txt
5d41402abc4b2a76b9719d911017c592  file2.txt
a906393463374717de23793319635f5d  file3.txt
```

### ذخیره‌ی چک‌سام‌ها در فایل

```bash
$ md5sum file1.txt file2.txt > checksums.md5
$ cat checksums.md5
d8e8fca2dc0f896fd7cb4cb0031ba249  file1.txt
5d41402abc4b2a76b9719d911017c592  file2.txt
```

### تایید چک‌سام‌ها

```bash
$ md5sum -c checksums.md5
file1.txt: OK
file2.txt: OK
```

اگر فایل **تغییر کند**:

```bash
$ md5sum -c checksums.md5
file1.txt: FAILED
md5sum: WARNING: 1 computed checksum did not match
```

## دستور `sha256sum`

### محاسبه‌ی SHA-256 Checksum

```bash
$ sha256sum filename.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  filename.txt
```

خروجی:
- **64 کاراکتر:** SHA-256 checksum (بسیار طولانی‌تر از MD5)
- **قدرتمندتر:** شانس collision بسیار کمتر

### ذخیره‌ی و تایید SHA-256

```bash
$ sha256sum file1.txt file2.txt > checksums.sha256
$ sha256sum -c checksums.sha256
file1.txt: OK
file2.txt: OK
```

## دستور `sha1sum`

### محاسبه‌ی SHA-1 Checksum

```bash
$ sha1sum filename.txt
aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d  filename.txt
```

خروجی:
- **40 کاراکتر:** SHA-1 checksum (میانی بین MD5 و SHA-256)

## مقایسه‌ی الگوریتم‌های Checksum

| الگوریتم | طول | سرعت | امنیت | مثال |
|-----------|------|------|--------|--------|
| **MD5** | 32 | ✓✓ بسیار سریع | ✗ ضعیف | `5d41402abc...` |
| **SHA-1** | 40 | ✓ سریع | ✗ ضعیف‌تر | `aaf4c61ddc...` |
| **SHA-256** | 64 | ✓ معقول | ✓✓ قوی | `e3b0c442...` |
| **SHA-512** | 128 | △ کند | ✓✓✓ بسیار قوی | (بسیار طولانی) |

## مثال‌های عملی

### دانلود فایل و تایید یکپارچگی

```bash
$ wget https://example.com/file.iso
$ sha256sum file.iso
a1b2c3d4e5f6...  file.iso

$ # مقایسه با checksum ارائه‌شده توسط سایت
$ echo "a1b2c3d4e5f6..." | sha256sum -c
file.iso: OK
```

### تایید تمام فایل‌های دانلود‌شده

```bash
$ ls -la *.iso
file1.iso
file2.iso
file3.iso

$ sha256sum *.iso > downloaded_files.sha256
$ sha256sum -c downloaded_files.sha256
file1.iso: OK
file2.iso: OK
file3.iso: OK
```

### پیدا کردن فایل‌های تغییریافته

```bash
$ sha256sum *.txt > original.sha256
$ # حالا برخی فایل‌ها تغییر می‌کنند...
$ sha256sum -c original.sha256
file1.txt: OK
file2.txt: FAILED  # این فایل تغییر کرده است
file3.txt: OK
```

## گزینه‌های مفید

```bash
$ md5sum -b filename        # Binary mode
$ md5sum -t filename        # Text mode (پیش‌فرض)
$ md5sum -c --quiet checksums.md5  # بدون نمایش OK
$ md5sum -c --strict checksums.md5 # درخواست ورودی کامل
```

## نکات درباره‌ی امنیت

### MD5 ضعیف است

MD5 **برای تایید عارضی (accidental) تغییرات کافی است** اما **برای تایید امنیتی (security)** ضعیف است. افراد می‌توانند **نسخه‌ی جعلی** با **همان MD5 checksum** ایجاد کنند.

### SHA-256 بهتر است

SHA-256 **برای اکثر مقاصد امن** است. برای **فیلم، سیستم‌عامل و نرم‌افزارهای مهم**، SHA-256 استفاده شود.

### SHA-512 برای حساس‌ترین موارد

SHA-512 **برای مقاصد رمزنگاری بسیار حساس** استفاده می‌شود.

## نکات اصلاحی

### سوءتفاهم: تمام checksum‌ها یکسان هستند

**نه!** الگوریتم‌های مختلف **نتایج کاملاً متفاوتی** می‌دهند:
- MD5: `5d41402abc4b2a76b9719d911017c592`
- SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

> **نکته:** **هر الگوریتم نتیجه‌ی منفرد‌ای دارد**. یک فایل **سه checksum متفاوت** دارد.

### سوءتفاهم: Checksum داده‌ها را رمزنگاری می‌کند

**نه!** Checksum **تنها تایید‌کننده‌ی یکپارچگی** است، نه **رمزنگار**. اگر فایل را از شبکه‌ی عمومی دانلود کنید، **هنوز هم متن معمولی است**.

> **نکته:** برای **رمزنگاری واقعی**، از SSL/TLS یا GPG استفاده کنید.

## جمع‌بندی

Checksums یک ابزار **ساده اما قدرتمند** برای:
- **تایید یکپارچگی فایل‌ها** پس از انتقال
- **تشخیص خرابی‌های هارد‌وری** یا فساد فایل
- **مقایسه‌ی نسخه‌های مختلف** فایل
- **بررسی دانلود‌های رسمی** (ISO، نرم‌افزار و غیره)

مهم‌ترین نکات:
- **MD5:** سریع اما ضعیف (فقط عارضی)
- **SHA-256:** بهترین انتخاب برای تایید (امن و سریع)
- **`-c` گزینه:** برای تایید checksum‌ها استفاده کنید

این مهارت برای هر مدیر سیستم **ضروری** است.
