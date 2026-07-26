---
title: توپولوژی‌های وایرلس؛ از Ad Hoc تا Mesh و PtMP
description: بررسی عمیق توپولوژی‌های شبکه بی‌سیم (Ad Hoc، Infrastructure، ESS، Mesh، PtP/PtMP) با مثال واقعی، دستور ترمینال و تله‌های رایج امتحان و مصاحبه
category: devops
tags: [wireless, wifi, networking, network-plus, mesh, wlan]
date: 2026-07-26
updatedAt: 2026-07-26
draft: false
navigation:
  title: توپولوژی‌های وایرلس
  icon: i-lucide-wifi
---

# توپولوژی‌های وایرلس؛ از Ad Hoc تا Mesh و PtMP

توپولوژی فیزیکی (که قبلاً در بحث ethernet دیدیم: bus، star، ring، mesh) وقتی پای وایرلس وسط میاد یک لایه‌ی دیگه پیدا می‌کنه. چون کابل نداری، سوال اینه که کی با کی مستقیم صحبت می‌کنه و ترافیک از کجا رد می‌شه. اینجا دقیقاً همون‌جاییه که آدم‌ها Infrastructure mode رو با Mesh، یا Ad Hoc رو با Mesh قاطی می‌کنن. این یادداشت دقیقاً همین مرزها رو مشخص می‌کنه.

## Ad Hoc / IBSS — ارتباط مستقیم بدون AP

**چیه:** دو یا چند دستگاه وایرلس مستقیماً بدون هیچ Access Point به هم وصل می‌شن. اسم رسمی‌ش تو استاندارد 802.11، **IBSS** (Independent Basic Service Set) هست.

**چرا مهمه:** توی صنعت عملاً مرده — امروز کسی از native ad hoc استفاده نمی‌کنه چون هم کند بود هم امنیتش ضعیف. ولی توی امتحان همیشه میاد چون concept پایه‌ای مقایسه با بقیه‌ست.

**کجا واقعاً دیده می‌شه:**
- بعضی پروتکل‌های legacy فایل‌شیرینگ P2P وایرلس
- برخی سناریوهای IoT مثل Bluetooth mesh یا Zigbee که از منطق مشابه استفاده می‌کنن (گرچه دیگه 802.11 خالص نیست)
- Wi-Fi Direct که نسخه‌ی مدرن‌تر و مدیریت‌شده‌تر همین ایده‌ست

**کجا اشتباه می‌کنن:**
> تله رایج: خیلی‌ها فکر می‌کنن Ad Hoc همون Mesh هست چون هر دوش "بدون AP مرکزی" به نظر می‌رسن. فرق اصلی: در Ad Hoc خالص هیچ **routing** بین دستگاه‌هایی که در رنج هم نیستن وجود نداره. یعنی اگه A به B و B به C وصله ولی A به C نه، A و C اصلاً نمی‌تونن با هم حرف بزنن. در Mesh واقعی، پروتکل‌های routing (مثل 802.11s) این مسیریابی رو انجام می‌دن.

بررسی mode یک اینترفیس وایرلس روی لینوکس:

```bash
$ iwconfig wlan0
wlan0     IEEE 802.11  ESSID:off/any
          Mode:Ad-Hoc  Frequency:2.412 GHz  Cell: Not-Associated
          Tx-Power=20 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Encryption key:off
          Power Management:off
```
`Mode:Ad-Hoc` یعنی این کارت رادیویی الان داره مستقیم با دستگاه‌های دیگه صحبت می‌کنه، نه با یک AP. `Cell: Not-Associated` یعنی هنوز به شبکه‌ای وصل نشده.

## Infrastructure Mode / BSS — حالت استاندارد امروزی

**چیه:** یک Access Point مرکزی داری و همه‌ی کلاینت‌ها فقط با AP صحبت می‌کنن، نه مستقیم با هم. حتی اگه دو لپ‌تاپ کنار هم روی همون Wi-Fi باشن، ترافیک‌شون از AP رد می‌شه (hairpin). این همون **BSS** (Basic Service Set) هست.

**سه اصطلاح که باید دقیق از هم جدا باشن:**

| اصطلاح | تعریف دقیق |
|---|---|
| **SSID** | اسمی که انسان می‌بینه، مثل `NetAfraz-5G` |
| **BSSID** | آدرس MAC رادیوی AP — یکتا برای هر AP، حتی اگه SSID مشترک باشه |
| **ESSID** | عملاً همون SSID هست ولی در سطح ESS (چند AP با یک اسم) به کار می‌ره |

> تله رایج: در امتحان می‌پرسن "کدوم به AP خاص اشاره می‌کنه؟" جواب BSSID هست، نه SSID. چون چند AP می‌تونن SSID یکسان داشته باشن (مثل خونه‌ای که چند AP روی یک اسم Wi-Fi ست شدن) ولی BSSID هر کدوم فرق داره.

## ESS — Extended Service Set، وقتی یک AP کافی نیست

**چیه:** چند تا BSS (چند AP) که همه SSID یکسان دارن و معمولاً از طریق شبکه‌ی سیمی (distribution system / DS) به هم و به شبکه‌ی اصلی وصلن. کلاینت بین AP ها **roam** می‌کنه بدون این‌که وصل شدنش به SSID قطع بشه.

**سناریوی واقعی:** یک ساختمان اداری سه‌طبقه با سه AP که هر سه `Office-WiFi` نام دارن. وقتی از طبقه یک به سه می‌ری، لپ‌تاپت بی‌صدا از AP1 به AP3 سوییچ می‌کنه.

**نکته‌ی فنی مهم — کانال:** AP هایی که پوشش‌شون هم‌پوشانی داره باید روی کانال‌های non-overlapping باشن. توی 2.4GHz فقط سه کانال واقعاً non-overlapping داری: **1، 6، 11**. اگه AP1 روی کانال 3 و AP2 روی کانال 6 باشن، هنوزم overlap دارن و throughput هر دو میاد پایین.

```bash
$ iw dev wlan0 scan | grep -E "SSID|freq|signal"
SSID: Office-WiFi
freq: 2412  (channel 1)
signal: -42.00 dBm
SSID: Office-WiFi
freq: 2462  (channel 11)
signal: -58.00 dBm
```
همین‌جا می‌بینی دو BSSID متفاوت (دو AP) با SSID یکسان `Office-WiFi` روی کانال‌های non-overlapping (1 و 11) — طراحی درست ESS.

**Roaming استاندارد و protocol های کمکی:**
- **802.11r (Fast BSS Transition):** handshake امنیتی رو از قبل انجام می‌ده تا roam بدون وقفه محسوس (مهم برای VoIP وایرلس)
- **802.11k:** به کلاینت لیست AP های همسایه و کیفیت‌شون رو می‌ده تا بهترین رو انتخاب کنه
- **802.11v:** به AP اجازه می‌ده کلاینت رو "هدایت" کنه سمت AP بهتر

> تله رایج: کلاینت خودش تصمیم می‌گیره کِی roam کنه، نه AP. یعنی اگه سیگنال AP فعلی هنوز -70dBm و "قابل قبول" باشه، خیلی از کارت‌های وایرلس دیر roam می‌کنن حتی اگه AP بهتری نزدیک‌تر باشه — این پدیده رو **sticky client** می‌گن.

## Mesh — وقتی backhaul هم وایرلسه

**چیه:** چند node وایرلس که هم به کلاینت‌ها سرویس می‌دن هم بین خودشون (backhaul) وایرلس صحبت می‌کنن و خودشون مسیر بهینه رو پیدا می‌کنن. استاندارد رسمی‌ش **802.11s** هست.

**تفاوت کلیدی با ESS:**

| | ESS | Mesh |
|---|---|---|
| Backhaul بین AP ها | معمولاً سیمی (Ethernet) | وایرلس (یا ترکیبی) |
| نیاز به کابل‌کشی | بله، هر AP باید کابل بخوره | خیر، فقط یک یا چند node به مودم/روتر وصله |
| Self-healing | نه به‌صورت پیش‌فرض | بله — اگه یک node بمیره، بقیه مسیر جدید پیدا می‌کنن |
| مثال محصول | AP های Enterprise با سوییچ PoE | Eero, Google Nest Wifi, Ubiquiti AmpliFi, TP-Link Deco |

**سناریوی واقعی:** خونه‌ی دوبلکس که کابل‌کشی کردن به طبقه بالا سخته. سه واحد mesh می‌ذاری: یکی به مودم وصله (root/gateway node)، بقیه فقط برق می‌خوان و از طریق رادیوی جداگانه (اکثر سیستم‌های خوب مش یک باند رو فقط برای backhaul جدا می‌کنن) با node اصلی صحبت می‌کنن.

**Full mesh vs Partial mesh (همون تقسیم‌بندی توپولوژی فیزیکی، اینجا وایرلس):**
- **Full mesh:** هر node مستقیماً با تمام node های دیگه لینک داره — مقاوم‌ترین ولی گرون‌ترین (از نظر تعداد رادیو و مدیریت)
- **Partial mesh:** فقط بعضی node ها مستقیم به هم وصلن، بقیه از طریق چند hop می‌رسن — رایج‌تر در عمل، هزینه پایین‌تر

> تله رایج: "Mesh یعنی هیچ AP مرکزی نداری" — غلط. حتی در mesh هم معمولاً یک یا چند **gateway/root node** داری که به اینترنت وصله؛ فرقش با ESS اینه که مسیر رسیدن ترافیک به اون gateway وایرلس و پویا تصمیم‌گیری می‌شه، نه یک کابل ثابت.

## Point-to-Point (PtP) و Point-to-Multipoint (PtMP)

این دو تا بیشتر در سناریوی **outdoor** و فاصله‌ی بلند به کار می‌رن، نه شبکه‌ی داخل ساختمان.

**Point-to-Point:**
یک لینک مستقیم بین دو نقطه با آنتن‌های directional (dish یا yagi) با gain بالا. کاربرد اصلی: وصل کردن دو ساختمان که کابل‌کشی فیزیکی (فیبر) بین‌شون گرون یا غیرممکنه.

**Point-to-Multipoint:**
یک نقطه‌ی مرکزی (معمولاً روی یک برج یا پشت‌بام بلند) با آنتن sector یا omni، و چند کلاینت که هرکدوم یک آنتن directional به سمت مرکز دارن. این دقیقاً معادل وایرلس همون **star topology** فیزیکیه. رایج‌ترین کاربردش **WISP** (Wireless Internet Service Provider) هست — رسوندن اینترنت به مناطقی که فیبر یا DSL نداره.

**نکته‌ی فنی که خیلی‌ها نادیده می‌گیرن — Fresnel Zone:**
حتی اگه بین دو آنتن **line of sight** بصری داشته باشی (یعنی یکی رو از اون یکی می‌بینی)، ممکنه لینک ضعیف کار کنه. چون سیگنال رادیویی یک ناحیه‌ی بیضی‌شکل دور خط مستقیم رو هم لازم داره (Fresnel zone) و اگه یک درخت یا ساختمون حتی وسط این بیضی باشه — نه لزوماً روی خط مستقیم — attenuation قابل توجه ایجاد می‌کنه.

> تله رایج در امتحان: "Line of sight دارم پس لینک خوب کار می‌کنه" — نه لزوماً. باید حداقل ۶۰٪ از Fresnel zone آزاد باشه، وگرنه throughput افت می‌کنه حتی با LOS بصری کامل.

## معماری کنترل: Autonomous (Thick) vs Controller-based (Thin) AP

این مستقیماً توپولوژی فیزیکی نیست ولی توی هر بحث Infrastructure/ESS واقعی حتماً میاد وسط، چون تصمیم می‌گیره ESS ت چطور مدیریت بشه:

**Autonomous / Thick AP:**
هر AP خودش کاملاً مستقل تنظیم می‌شه — کانال، power، SSID، امنیت، همه جدا. مناسب شبکه‌های کوچیک با تعداد کم AP. مشکل: با افزایش تعداد AP، مدیریت دستی جهنم می‌شه و roaming بین AP ها هماهنگ نیست.

**Controller-based / Thin AP:**
AP ها فقط radio هستن؛ تمام تصمیم‌گیری (channel planning، power adjustment، امنیت، load balancing بین AP ها) از یک **WLAN Controller** مرکزی میاد. این همون چیزیه که roaming نرم (802.11r) و مدیریت صدها AP رو در enterprise واقعی ممکن می‌کنه.

```bash
# نمونه‌ی چک وضعیت یک AP کنترلر-محور روی سیستم‌های Ubiquiti UniFi از طریق API محلی
$ curl -sk https://unifi-controller.local:8443/api/s/default/stat/device \
  -H "Cookie: unifi_session=..." | jq '.data[] | {name, state, channel}'
{
  "name": "AP-Floor1",
  "state": 1,
  "channel": 1
}
{
  "name": "AP-Floor2",
  "state": 1,
  "channel": 11
}
```
همین‌جا کنترلر داره خودش channel planning رو انجام می‌ده — این کاریه که در معماری Thick AP باید دستی انجام می‌شد.

## جدول مقایسه‌ی کلی همه‌ی توپولوژی‌ها

| توپولوژی | نیاز به AP مرکزی | Backhaul | معادل توپولوژی فیزیکی | کاربرد اصلی |
|---|---|---|---|---|
| Ad Hoc (IBSS) | خیر | ندارد | mesh ناقص بدون routing | ارتباط مستقیم دو دستگاه، legacy |
| Infrastructure (BSS) | بله (یک AP) | — | star | شبکه‌ی خانگی/اداری معمولی |
| ESS | بله (چند AP) | سیمی معمولاً | چند star به هم وصل | ساختمان بزرگ، roaming بی‌وقفه |
| Mesh | بله (root/gateway node) | وایرلس یا ترکیبی | full/partial mesh | محیط بدون امکان کابل‌کشی |
| PtP | بله (دو رادیو دایرکشنال) | — | point-to-point | اتصال دو سایت دور از هم |
| PtMP | بله (یک hub + چند کلاینت) | — | star در مقیاس بزرگ | توزیع اینترنت WISP |

## مرور سریع

- **Ad Hoc (IBSS):** بدون AP، بدون routing بین node های خارج از رنج مستقیم — با Mesh اشتباه نشه.
- **BSS:** یک AP، ترافیک همیشه از AP رد می‌شه حتی بین دو کلاینت نزدیک هم.
- **BSSID ≠ SSID:** BSSID مک‌آدرس یکتای هر AP، SSID اسم مشترک قابل تکرار روی چند AP.
- **ESS:** چند AP با SSID مشترک، معمولاً backhaul سیمی؛ کانال‌های AP همسایه باید non-overlapping باشن (1/6/11 در 2.4GHz).
- **802.11r/k/v:** پروتکل‌های roaming نرم — تصمیم روم همیشه با کلاینته، نه AP (مراقب sticky client).
- **Mesh:** برخلاف تصور رایج، gateway مرکزی داره؛ فرقش با ESS در وایرلس بودن backhaul و self-healing هست.
- **PtP/PtMP:** برای فواصل بلند و outdoor؛ LOS بصری کافی نیست، Fresnel zone هم باید عمدتاً آزاد باشه.
- **Thick vs Thin AP:** معماری مدیریتیه نه توپولوژی خام، ولی مستقیم روی کیفیت roaming در ESS بزرگ اثر می‌ذاره.

## سرفصل‌ها و کلمات کلیدی که پوشش داده شد

Ad Hoc, IBSS, Infrastructure Mode, BSS, BSSID, SSID, ESSID, ESS (Extended Service Set), Distribution System, Roaming, 802.11r/k/v, Sticky Client, Co-channel Interference, Non-overlapping Channels (1/6/11), Mesh Topology, 802.11s, Full Mesh, Partial Mesh, Self-healing, Backhaul, Point-to-Point (PtP), Point-to-Multipoint (PtMP), WISP, Fresnel Zone, Line of Sight, Autonomous/Thick AP, Controller-based/Thin AP, WLAN Controller