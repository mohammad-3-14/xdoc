---
title: نتورک پلاس
description: نکات پایه‌ای امنیت برای اپلیکیشن‌های وب — از XSS تا مدیریت secrets.
category: security
tags: [security, web, best-practices]
date: 2026-03-01
updatedAt: 2026-06-15
draft: false
navigation:
  title: امنیت
  icon: i-lucide-network
---

# اصول امنیت وب

چند اصل کلیدی که در توسعه هر اپلیکیشن وب باید رعایت شود.

## جلوگیری از XSS

همیشه ورودی کاربر را قبل از رندر در HTML escape کنید. فریم‌ورک‌هایی مثل Vue به‌صورت پیش‌فرض این کار را در binding های متنی انجام می‌دهند، اما `v-html` این محافظت را دور می‌زند:

```vue
<!-- خطرناک اگر userContent از کاربر بیاید و sanitize نشده باشد -->
<div v-html="userContent"></div>
```

برای HTML پویا از یک کتابخانه sanitize مثل DOMPurify استفاده کنید.

## مدیریت Secrets

- هرگز کلید API یا رمز عبور را در کد commit نکنید.
- از فایل‌های `.env` (که در `.gitignore` قرار دارند) یا secret manager استفاده کنید.
- کلیدهای عمومی/قابل افشا (مثل publishable key) را از کلیدهای مخفی جدا نگه دارید.

## هدرهای امنیتی HTTP

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

## احراز هویت

- رمزهای عبور را همیشه با الگوریتم‌های مقاوم مثل `bcrypt` یا `argon2` هش کنید — هرگز MD5/SHA1 خام.
- برای session/token از HttpOnly و Secure cookie استفاده کنید تا در دسترس JavaScript سمت کلاینت نباشد.
- Rate limiting روی endpoint های ورود برای جلوگیری از brute-force ضروری است.
