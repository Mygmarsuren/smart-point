# Smart Point Admin

Үйлдвэрлэгч, нийлүүлэгчийн бараа, Unique/QR код, оноо, урамшууллыг удирдах responsive веб прототип. Admin-ийн нөхцөл нь цаашдаа тусдаа хэрэглэгчийн веб/апп дээр хэрэгжинэ; үндсэн веб нь зөвхөн Admin. QR/текстийн урсгал шалгах тусдаа `redeem.html` тест хуудас бий.

## Ажиллуулах

Dependency installation шаардлагагүй. `index.html`-ийг браузерт нээх эсвэл:

```sh
cd /workspace/smart-point
python -m http.server 3000 --bind 0.0.0.0
```

QR сан локал `assets/vendor/qrcode.js` дотор байгаа тул гаднын CDN шаардлагагүй. Хувилбар, checksum болон MIT лицензийг `assets/vendor/NOTICE.md`-ээс харна.

## Бараа

Бүтээгдэхүүн дэд цэс: Барааны жагсаалт, Барааны ангилал, Брэнд, Хэмжих нэгж.

Барааны жагсаалтын «Бараа нэмэх» товчоор бүртгэнэ. Картын баруун дээд товч эсвэл дэлгэрэнгүй цонхны «Мэдээлэл засах» товчоор засна.

- Заавал: код, нэр, ангилал (сонголт), брэнд (сонголт), хэмжих нэгж (сонголт), үнэ, олгох оноо.
- Сонголттой: бар код, зураг (PNG/JPG/WebP, 1 MB хүртэл), код хүчинтэй эхлэх/дуусах огноо.
- Идэвхтэй, НӨАТ, НХАТ checkbox; Unique код ашиглах эсэх сонголт.
- Код давхардахгүй; оноо бүхэл, сөрөг биш; үнэ сөрөг биш; дуусах огноо эхлэхээс өмнө байж болохгүй.
- Unique код ашиглахгүй бол кодын хугацааг хадгалахгүй. Идэвхгүй/Unique кодгүй бараанд код үүсгэхгүй.
- НӨАТ/НХАТ нь одоогоор шинж тэмдэг төдий; татварын хувь, үнийн тооцоолол хийгдээгүй.

Хайлт нь нэр/код/брэндээр, шүүлтүүр нь ангиллаар ажиллана. 4 эхний бараа, 6 ангилал, брэнд/нэгжүүд нь жишээ өгөгдөл. Ангилал, брэнд, хэмжих нэгжийг тус тусын дэлгэцээс нэмж, хайж болно. Өмнөх хувилбарын барааны мэдээллийг устгахгүй; шинэ талбаруудад анхны утга онооно. Өмнөх савлагааны хэмжээ хадгалагдах боловч шинэ бүртгэлд шаардлагатай талбар биш.

## Unique код / QR

1. «Бөөнөөр код үүсгэх» хэсэгт бараа сонгож 1–500 код үүсгэнэ. Шинэ код нь `SP-XXXX-XXXX-XXXX` хэлбэртэй. 12 тэмдэгтийг 32 тэмдэгттэй цагаан толгойгоос crypto.getRandomValues ашиглан санамсаргүй сонгож, local бүртгэлд давхцах эсэхийг шалгана. I/O/0/1 ашиглахгүй. Хуучин урт кодыг тайрахгүй, өөрчлөхгүй.
2. Код нь барааны код/нэр, олгох оноо, хүчинтэй хугацааны тухайн үеийн хуулбар, үүсгэсэн огноотой хадгалагдана. Барааны нөхцөлийг засах нь өмнө үүссэн кодын нөхцөлийг өөрчлөхгүй.
3. Жагсаалтад код сонгоод идэвхжүүлэх/идэвхгүй болгох боломжтой. Ашигласан кодыг дахин идэвхжүүлэхгүй. Идэвхгүй бараа, хугацаа дууссан кодыг идэвхжүүлэхгүй. Ирээдүйд эхлэх кодыг урьдчилан үүсгэж, идэвхжүүлж болно; ашиглах эрхийн хугацааг хэрэглэгчийн сервер шалгах ёстой.
4. Код бүрийн QR-ийг харах, сонгосон/шүүсэн кодуудын QR шошгыг хэвлэх, өөртөө SVG агуулсан хэвлэх HTML файл болон CSV татах боломжтой. QR нь `redeem.html#code=...` тест хуудасны бүтэн URL агуулна. Доор нь мөн ижил Unique кодыг бүтнээр хэвлэнэ; текстэд тусдаа код үүсгэхгүй.
5. Хэвлэх preview/export нэг удаа 500 хүртэл QR гаргана. A4, 100% хэмжээ, 3 баганатай шошго; браузерын хэвлэх үйлдэл болон PDF болгон хадгалах боломжтой. Физик принтерээр хараахан туршаагүй.
6. Жагсаалт, ашиглалтын түүхэд баталгаажуулсан хэрэглэгч/огнооны багана бий. Тестийн амжилттай ашиглалтад «Тест хэрэглэгч» болон огноо бүртгэнэ; ашиглаагүй код дээр «—» харагдана.

## Хадгалалт, хязгаарлалт

Өгөгдөл `localStorage`-ийн `smartpoint-v1` түлхүүрт хадгалагдана. Браузерын өгөгдлийг устгахад мэдээлэл алга болно; олон төхөөрөмжид синхрончлохгүй. Хадгалах зай хүрэлцэхгүй бол нэмэх/засах үйлдэл буцаагдаж, алдаа харуулна.

Энэ нь сервер, нэвтрэлт, байгууллага тусгаарлалт, эрхийн баталгаажуулалтгүй local прототип. Unique кодыг нэг удаа ашиглаж оноо олгох ажиллагаа Admin дээр хийгдэхгүй. Олон хэрэглэгчийн давхар ашиглалтаас хамгаалах, QR баталгаажуулах, атомик онооны гүйлгээ үүсгэх ажиллагааг backend болон хэрэглэгчийн тусдаа веб/апптай холбох шаардлагатай. QR экспорт нь кодын нууцлалыг хангах серверийн баталгаажуулалтыг орлохгүй.

Dashboard нь тогтмол жишээ статистиктай; огнооны шүүлтүүр бодит тайлан шүүхгүй. Зарим бусад удирдлагын дэд хэсэг дэлгэцийн бүтэц төдий. Өмнө хийсэн 6 жишээ үйлдвэрлэлийн багцын өгөгдөл кодод хадгалагдсан боловч шинэ шаардлагын дөрвөн дэд цэсэнд цувралын хэсэг орохгүй.

## QR болон текстээр шалгах тусдаа тест

Admin-д код үүсгээд идэвхжүүлнэ. QR preview-ийн «Эхний кодыг хэрэглэгчийн тест хуудсанд шалгах» холбоосыг нээх, эсвэл ижил веб хаягийн redeem.html хуудсанд текст код оруулна.

- QR холбоос нь кодыг бөглөнө; «Оноо авах» дарж баталгаажуулна. Автоматаар оноо олгохгүй.
- Камерын зөвшөөрөлтэй үед jsQR ашиглан уншина; камергүй үед QR зураг сонгох болон текст оруулах боломжтой. Камер HTTPS эсвэл localhost шаарддаг. Физик камер/принтерээр хараахан туршаагүй; QR зургийн decode болон PDF байрлалыг браузерт шалгасан.
- Хуучин урт код, зураасгүй, жижиг үсгээр бичсэн кодыг мөн хүлээн авна.
- Идэвхгүй, ашигласан, эхлэх хугацаа болоогүй, дууссан, онооны утгагүй кодыг татгалзана. Амжилтад local оноо, гүйлгээ, кодын хэрэглэгч/огноо шинэчлэгдэнэ.
- Admin болон тест хуудсыг нэг браузер, ижил origin-д ашиглана. Tab хооронд storage event-ээр өгөгдөл шинэчлэгдэнэ. Өөр утас/браузерт уншихад хуудас нээгдэж код бөглөгдөх боловч local өгөгдөл байхгүй тул оноо олгохгүй.
- Энэ local туршилт нь authentication эсвэл атомик server redemption биш. Олон төхөөрөмж, зэрэгцээ хүсэлт, байгууллага тусгаарлалт, давхар оноо олголтыг үйлдвэрлэлийн түвшинд баталгаажуулах backend шаардлагатай.

## Кодын цэсийн бүтэц

Unique код / QR нь Кодын жагсаалт, Бөөнөөр код үүсгэх, Код ашиглалтын түүх гэсэн 3 дэд цэстэй. QR харах, хэвлэх, экспортлох болон сонгосон кодыг идэвхжүүлэх/идэвхгүй болгох үйлдлүүд Кодын жагсаалт дотор байна; тусдаа давхардсан цэс байхгүй.

## Жишээ ашиглалтын түүх ба шошгоны хэлбэр

Код ашиглалтын түүхийг анх нээхэд 40 жишээ ашиглалт нэг удаа нэмэгдэнэ (sampleCodeHistoryVersion=1). Өмнөх код, гүйлгээг устгахгүй; дахин нээхэд үржүүлэхгүй. Жишээ бүртгэлүүд одоо байгаа хэрэглэгчийн нэр/утас, барааны код/нэр/оноотой холбогдоно. Жишээ кодын орлого тайланд харагдана, гэхдээ тестийн онооны үлдэгдлийг нэмэхгүй. Жагсаалтад Жишээ тэмдэглэгээтэй. Хэрэглэгч, бараагаар зэрэг шүүх, нэр/утсаар хайх, хэрэглэгчийн түүхийг нээх боломжтой. Хэрэглэгчдийн жагсаалтад ашигласан кодын тоо, эдгээр кодоос цуглуулсан оноо, түүх рүү шилжих товч харагдана.

Хэвлэх шошгонд QR + текст, зөвхөн QR, зөвхөн текст сонголттой. Сонголтыг үндсэн жагсаалт эсвэл preview цонхонд өөрчилж болно; хэвлэх HTML болон PDF layout ижил хэлбэрийг ашиглана. Текст-only шошгонд QR үүсгэхгүй, бүтэн Unique кодыг 10px хэмжээтэй хэвлэнэ. Хуучин кодыг тайрахгүй. Шинэ кодын санамсаргүй хэсгийг 12 тэмдэгтээр хадгалсан (60 бит); 10 тэмдэгтээс илүү нөөцтэй, local давхардлын шалгалттай. Бүх орчинд давтагдашгүй байдлыг баталгаажуулахад backend өгөгдлийн санд unique constraint мөн хэрэгтэй.

## Оноо модуль

- **Оноо олгох нөхцөл / Бөөнөөр оноо тохируулах:** барааны зураг, код, нэр, брэнд, ангилал, үнэ, одоогийн оноо, төлөвтэй жагсаалт. Хайлт/ангилал/төлөвөөр шүүж, харагдах бараанаас нэг эсвэл олныг сонгоно. Нэг бараанд «Оноо засах» товчтой.
- Баталгаажуулах цонхонд одоогийн → шинэ оноог бараа бүрээр харуулна; шалтгаан заавал оруулна. 0–1,000,000,000 бүхэл оноо. Өөрчлөлтийг огноо, шалтгаан, бараа, өмнөх/дараах утгаар audit түүхт хадгална. Хадгалалт амжилтгүй бол буцаана. Өмнө үүсгэсэн код, олгосон оноо өөрчлөгдөхгүй; дараагийн код шинэ оноо авна.
- Барааны нэмэх/засах цонхны «Олгох оноо» мөн тухайн барааны оноог тохируулна. Одоогийн audit хүснэгт нь Оноо модулийн өөрчлөлтүүдийг бүртгэдэг; бүх системийн серверийн аудит хараахан биш.
- **Онооны гүйлгээ:** орлого, зарлага, цэвэр хөдөлгөөн, тоо гэсэн үзүүлэлтүүд шүүлтүүртэй хамт шинэчлэгдэнэ. Эдгээр нь гүйлгээний нийлбэр бөгөөд дансны бодит үлдэгдэл биш. Хэрэглэгч/утас/бараа/код/үйлдлээр хайж, чиглэл, төрөл, хэрэглэгч, огноо, жишээ эсвэл тестийн үйлдлээр шүүнэ. CSV нь шүүсэн бүх мөрийг гаргана; дэлгэцийн хүснэгт 25/50/100 мөрөөр хуудаслагдана.
- Дэлгэрэнгүй цонхноос хэрэглэгч, бараа, Unique код, холбоотой хүрд/купоны үйлдлийн дугаар, огноо, оноо, дуусах хугацааг харна. Point report нь ижил дэлгэрэнгүй гүйлгээний дэлгэцийг ашиглана.
- Гүйлгээний хэсгийг анх нээхэд 40 жишээ кодын орлого болон 10 жишээ хүрд/купоны зарлага, тэдгээрийн холбоос үйлдлүүд нэг удаа нэмэгдэнэ. Эдгээр нь хэрэглэгч, бараатай холбогдож Жишээ тэмдэглэгээтэй харагдана. Тестийн онооны үлдэгдлийг өөрчлөхгүй. Хүрд/купоны үйлдвэрлэлийн удирдлагын систем хэрэгжсэн гэсэн үг биш.
- **Онооны хүчинтэй хугацаа:** 0 = хугацаагүй, эсвэл 1–3650 хоног тохируулна. Шинэ код бүр pointsValidDays утгыг хуулж хадгална; хэрэглэгч тест хуудсаар ашиглахад орлогын expiresAt огноо тооцогдоно. Өмнөх код, гүйлгээг өөрчлөхгүй. Хугацаа дууссан оноог үлдэгдлээс автоматаар хасах ажиллагаа, FIFO зарцуулалт, олон төхөөрөмжийн атомик гүйлгээ backend-д хэрэгжих шаардлагатай; энэ хувилбарт хийгдээгүй.

Код ашиглалтын түүхээс шошго хэвлэх, хэвлэх HTML, хэлбэр сонгох болон мөрийн QR preview үйлдлийг хассан. Энэ хэсэгт хайлт, шүүлтүүр, хэрэглэгчийн түүх, CSV экспорт үлдэнэ. Шошго хэвлэх нь Кодын жагсаалт / Бөөнөөр код үүсгэх хэсэгт хэвээр.

### Нэгдсэн онооны нөхцөл ба хугацааны хяналт

Давхардсан «Бөөнөөр оноо тохируулах» дэд цэсийг хассан; «Оноо олгох нөхцөл» дотор нэг болон олон барааны оноо засах үйлдэл хэвээр. Тохиргооны түүхийг анх нээхэд барааны код/нэр/брэндтэй холбоотой 4 жишээ audit нэмэгдэнэ (бодит оноог өөрчлөхгүй, дахин үржүүлэхгүй). Цаашид Оноо модулиас болон барааны засах цонхноос оноо өөрчлөхөд бодит local audit нэмэгдэнэ.

Хүчинтэй хугацааны хэсэг нь шинэ кодод хэрэглэх онооны хоногийн бодлого, олгосон орлогын хугацааны жагсаалттай. Хугацаа заагаагүй / хүчинтэй / 30 хоногт дуусах / дууссан төлөвөөр шүүнэ. Орлогын анхны дүнг харуулах бөгөөд зарцуулсны дараах үлдэгдэл биш. QR ашиглах хүчинтэй огноо болон онооны дуусах хугацаа тусдаа ойлголт.

### Бараа тус бүрийн онооны хоног

Оноо олгох нөхцөл жагсаалтад «Онооны хүчинтэй хоног» харагдана. «Нөхцөл засах» болон олноор тохируулах цонхонд олгох оноо + хүчинтэй хоног (0–3650, 0=хугацаагүй) хамт оруулна. Барааны нэмэх/засах цонх мөн энэ талбартай. Хоногийн өмнөх/дараах утгыг audit түүхт хадгална.

Ерөнхий 350 хоногийн тохиргоо нь тусгай хоног оруулаагүй барааны анхны санал утга. Бараанд тусгайлан 30 хоног хадгалбал ерөнхий 350-аас үл хамааран тухайн барааны шинэ код 30 хоногийн snapshot авна. Кодын жагсаалт болон CSV-д «Онооны хоног» харагдана. Хэрэглэгч авсан өдрөөс snapshot хоногийг нэмж expiresAt тооцно.

Хугацааны дэлгэцийн доод жагсаалт бол өмнө олгосон онооны түүх. Ерөнхий тохиргоо эсвэл барааны нөхцөл өөрчлөхөд тэр жагсаалтын огноо өөрчлөгдөхгүй. Шинэ нөхцөлтэй шинэ кодыг ашиглаж оноо авсны дараа шинэ мөрийн дуусах огноо гарна.

## Хүрд модуль

- **Хүрдний жагсаалт:** 6 жишээ хүрд. Нэр/төлөвөөр хайх, бүртгэх, засах, эхлэх/дуусах огноо болон эргэлтийн онооны үнэ тохируулах, идэвхжүүлэх/идэвхгүй болгох. Идэвхгүй, эхлэхийг хүлээсэн, хугацаа дууссан төлөв тусдаа.
- **Шагнал, магадлал, нөөц:** 24 жишээ шагнал. Оноо, биет шагнал, купон, хожилгүй төрлүүдтэй. Хүрд бүрийн шагналыг хамт засаж, нэмэх/хасах, тоо хэмжээ/магадлал тохируулна. Нийлбэр 100%; нийт нөөц олгосноос бага байж болохгүй. Олголтын түүхтэй шагналыг хасахгүй. Магадлалтай шагналын нөөц дууссан бол идэвхжүүлэх/шалгахыг хориглоно; магадлалыг автоматаар өөрчлөхгүй.
- **Эргүүлэх эрхийн нөхцөл:** хүрд бүрийн зарцуулах оноо, хугацаа, төлөвийг харж засна. Шинэ хүрд идэвхгүй үүснэ; шагнал тохируулсны дараа идэвхжүүлнэ.
- **Эргэлт, хожлын түүх:** 60 жишээ үр дүн, бүртгэлтэй хэрэглэгчийн нэр/утас, хүрд, онооны үнэ, шагнал, огноо, олголтын төлөвтэй. Хүрд/үр дүнгээр шүүх, хайх, 20 мөрөөр хуудаслах, CSV татах боломжтой. Жишээ кодын нэр бус, өөрийн snapshot нэр/үнэ хадгалдаг тул нөхцөл засахад хуучин үр дүн өөрчлөгдөхгүй.
- Жишээ хүрдний зарлага, онооны хожлыг Онооны гүйлгээнд eventId-гаар холбосон; Жишээ тэмдэглэгээтэй, тест хэрэглэгчийн баланс өөрчлөхгүй. Seed нь wheelModuleVersion=1 тул дахин нэмэгдэхгүй.
- **Нөхцөл шалгах:** зөвхөн админы тест. Магадлалаар үр дүн гаргаж TEST ID-тай түүхт хадгална. Бодит оноо хасахгүй, шагналын нөөц зарцуулахгүй. Түүхт cost=0, configuredCost=тохируулсан үнэ хадгална. Энэ нь хэрэглэгчийн бодит эргэлтийн endpoint биш.
- Бодит хэрэглэгчийн эрх/үлдэгдэл шалгах, оноо атомикаар хасах, нөөц бууруулах, шагнал баталгаажуулах, олон төхөөрөмжийн зэрэгцээ эргэлт болон бодит шагнал олголт backend-тай холбогдоогүй. Нөөц, магадлалын local шалгалт нь үйлдвэрлэлийн серверийн баталгаажуулалтыг орлохгүй.

## Купон модуль

- **Купоны жагсаалт:** 6 зурагтай жишээ купон. Нэр/нөхцөл, оноогоор авах үнэ, нийт нөөц, хүчинтэй эхлэх/дуусах огноо бүртгэх/засах; зураг PNG/JPG/WebP, 1 MB хүртэл. Идэвхжүүлэх/идэвхгүй болгох, хайлт, төлөвийн шүүлтүүртэй. Шинэ купон идэвхгүй үүснэ.
- **Худалдан авалтын түүх:** 60 жишээ хэрэглэгчийн купон. Бүртгэлтэй хэрэглэгчийн нэр/утас болон pointEvents, онооны зарлагатай eventId-гаар холбогдоно. Купон бүрийн эрхийн код давтагдашгүй; үнэ, нөхцөл, дуусах огнооны snapshot хадгална. Кампанит купоныг засахад өмнөх худалдан авалтын нөхцөл өөрчлөгдөхгүй.
- **Купоны ашиглалт:** CP-XXXX-XXXX-XXXX кодыг жижиг үсэг/зураасгүйгээр хайж шалгах, ашигласныг баталгаажуулж ажилтан, огноо, тайлбар хадгалах. Ашигласан/хугацаа дууссан эрхийг дахин ашиглуулахгүй. Ашиглалт нь худалдан авалтын өөр төлөв бөгөөд борлуулалтын нөөцийг дахин буцааж нэмэхгүй.
- 20 мөрөөр хуудаслах, хэрэглэгч/утас/код/нэрээр хайх, кампанит купон/төлөвөөр шүүх, CSV экспорт. Хуучин хэрэглэгчийн `claims` туршилтын массивыг устгахгүй, шинэ модуль `couponCampaigns`, `couponPurchases` түлхүүр ашиглана.
- Жишээ өгөгдөл couponModuleVersion=1 тэмдэглэгээгээр нэг удаа үүснэ. Анхны 60 худалдан авалт болон зарлагууд нь Жишээ тэмдэглэгээтэй; тестийн хэрэглэгчийн баланс өөрчлөхгүй.
- **Тест бүртгэл:** админ хэрэглэгчийг сонгон local тестийн купон үүсгэж болно. Энэ нь хэрэглэгчийн худалдан авах UI биш; бодит оноо хасахгүй. Local кампанийн нөөцийн бүртгэл 1-ээр багасаж, Жишээ зарлага/купон бий болно. Нөөц дууссан, идэвхгүй, хугацаа эхлээгүй/дууссан купонд тест үүсгэхгүй.
- Бодит хэрэглэгчийн худалдан авалт, оноо атомикаар хасалт, нөөц захиалга, купон баталгаажуулах эрх, олон төхөөрөмжийн зэрэгцээ ашиглалт backend-тай холбогдоогүй. Одоогийн ашиглалт бүртгэл нь энэ браузер дахь local прототип.

## Судалгаа болон даалгавар

Хоёр модулийг анх нээхэд engagementVersion=1 тэмдэглэгээгээр 6 судалгаа / 30 хариулт, 6 даалгавар / 30 биелэлт нэг удаа нэмэгдэнэ. Бүртгэлтэй хэрэглэгч, бүтээгдэхүүнтэй холбогдоно. Судалгааны 30 оролцоо, баталгаажсан 12 даалгаврын 42 жишээ онооны орлогыг pointEvents болон transactions-д id холбоосоор хадгална. Тестийн баланс өөрчлөхгүй. Хэрэглэгчийн жагсаалтын цуглуулсан оноо нь холбоотой бүх эерэг гүйлгээг тооцно, зөвхөн кодоор хязгаарлахгүй.

### Судалгаа

Нэр, хугацаа, бүтээгдэхүүн, олгох оноо, онооны хүчинтэй хоног, хэрэглэгч бүрийн оролцооны дээд тоо (нийт эсвэл өдөр бүр, UTC+08) тохируулна. Нэг сонголт, олон сонголт, текст хариулттай 1–20 асуулт; сонголттой асуулт 2–20 давхардаагүй сонголттой. Заавал хариулах эсэх тохируулна. Хариулт ирсэн судалгааны асуултыг өөрчлөхгүй; шинэ судалгаа үүсгэж хувилбарлана.

Оролцогчид/хариултыг хайх, судалгаагаар шүүх, 20 мөрөөр хуудаслах, CSV татах, дэлгэрэнгүй хариулт харах. Үр дүнд оролцоо, давхардаагүй хэрэглэгч, бодитоор бүртгэгдсэн орлогын нийлбэр, асуулт бүрийн тоо/хувь болон текст хариултыг харуулна. Олон сонголтын хувь нийлээд 100%-аас их байж болно.

Админы «Хариултын тест» нь хэрэглэгч сонгон локал хариулт илгээдэг; required хариулт болон оролцооны хязгаар шалгаж, нэг бүртгэлд нэг онооны гүйлгээ үүсгэнэ. Энэ нь эцсийн хэрэглэгчийн үйлдвэрлэлийн веб биш.

### Даалгавар

Нэр, нөхцөл, хугацаа, бүтээгдэхүүн, олгох оноо, онооны хүчинтэй хоногийг бүртгэнэ. Админы «Биелэлтийн тест»-ээр хэрэглэгч сонгон тайлбар болон сонголттой зураг (PNG/JPG/WebP ≤1 MB) илгээнэ. Хүлээгдэж буй/баталгаажсан биелэлттэй хэрэглэгч дахин илгээхгүй; татгалзсан бол дахин илгээж болно.

«Гүйцэтгэл баталгаажуулах» нь pending биелэлтийг харуулна. Ажилтан нөхцөл, нотолгоо үзээд баталгаажуулахад snapshot оноог нэг удаа transactions/pointEvents-д бүртгэнэ; өмнө нь шалгасан болон ижил хэрэглэгчийн баталгаажсан даалгаварт давхар оноо олгохгүй. Татгалзахад шалтгаан заавал. Шалгасан ажилтан, огноо, тайлбар хадгална. Хадгалалт амжилтгүй бол статус болон онооны гүйлгээг хамт буцаана. Түүхт бүх төлөвийг хайж/шүүж CSV экспортлоно. Онооны утгыг даалгавар засахад өмнөх биелэлт, олголтод буцааж өөрчлөхгүй.

Бүх өгөгдөл localStorage-д байна. Жинхэнэ хэрэглэгчийн нэвтрэлт, олон төхөөрөмжийн давтамжийн баталгаажуулалт, atomic нэг удаагийн оноо олголт, бодит wallet/онооны үлдэгдэлд шилжүүлэх ажиллагаа backend-тай холбогдоогүй.

## Байгууллага, админ, роль ба системийн тохиргоо

Тохиргоо дэд цэс: Байгууллагын мэдээлэл, Ажилтнууд, Албан үүрэг/хандах эрх, Системийн үндсэн тохиргоо, Үйлдлийн түүх. 3 жишээ байгууллага (2 үйлдвэрлэгч, 1 нийлүүлэгч), байгууллага бүрд 3 роль/3 админ ажилтан, 3 жишээ тохиргооны үйлдэлтэй. И-мэйлүүд .example домэйнтэй танилцуулгын өгөгдөл.

- Байгууллагын нэр/регистр/төрөл/утас/и-мэйл/хаяг засах, байгууллага шинээр бүртгэх. Нэр эсвэл регистр давхардахгүй.
- Одоогийн байгууллагын админ ажилтан нэмэх/засах, и-мэйл, утас, роль, идэвхтэй төлөв хадгалах. Ижил байгууллагад и-мэйл давхардахгүй. Нууц үг, жинхэнэ нэвтрэлт, урилга илгээх ажиллагаа байхгүй.
- Байгууллага тус бүрийн роль үүсгэж, 12 модулийн Хандахгүй/Харах/Удирдах матриц хадгална. Энэ нь эрхийн metadata тохиргоо; нэвтэрсэн хэрэглэгчээр үйлдэл хориглодог бодит client/server enforcement хараахан хийгдээгүй.
- Үндсэн тохиргоонд шинэ барааны анхны оноо, хүчинтэй хоног, дэмжлэгийн и-мэйл, Монгол хэл/UTC+08, Онооны гүйлгээний анхны хуудасны 25/50/100 мөрийн хэмжээ орно. Өмнөх код/олголтыг өөрчлөхгүй.
- Тохиргооны үйлдлийн түүх байгууллагаар тусдаа, local actor огноо/тайлбартай. Бүх модулийн серверийн бүрэн audit биш.

### Local байгууллагын тусгаарлалт

Толгойн байгууллага сонголт нь URL-ийн `org` параметрээр workspace солино. ORG001 нь өмнөх `smartpoint-v1` түлхүүрийг хэвээр ашиглаж хуучин өгөгдлийг хадгална. Бусад байгууллага `smartpoint-v1:<orgId>` тусдаа түлхүүртэй; бараа, код, оноо, хүрд, купон, судалгаа, даалгавар, гүйлгээ холилдохгүй. Байгууллага/админ/роль metadata нь `smartpoint-admin-directory-v1` бүртгэлд orgId-гаар scope хийнэ. Шинэ workspace танилцуулгын анхны өгөгдөлтэй; бодит байгууллагын өгөгдөл гэж үзэхгүй.

QR болон хэрэглэгчийн тест URL нь org параметртэй. Тест нь зөвхөн тухайн байгууллагын storage key-г уншина; хуучин org-гүй QR нь ORG001-д хамаарна. Байгууллага солиход reload хийдэг. Нэг браузерын нэг origin дахь local storage тусгаарлалт нь аюулгүй multi-tenant серверийн хамгаалалт биш: бүх сонголт демо админд нээлттэй. Backend auth/session, database tenant scope, эрхийн enforcement, криптограф баталгаажуулалт шаардлагатай.

## Шинэ workspace UI (2026-10-28)

Smart Distribution reference-ийн цэнхэр нимгэн толгой, цагаан ажлын талбар, зүүн талын хоёр хэсэгтэй sidebar, табын байрлалыг Smart Point брэндээр хэрэгжүүлсэн. Цэсний нэр, бизнесийн үйлдэл, хадгалсан өгөгдлийн схемийг өөрчлөөгүй.

- Доод хэсэгт 12 үндсэн модуль, дээр нь сонгосон модулийн дэд цэсүүд. Nested хэрэглэгчийн дэлгэрэнгүй хавтсыг дэлгэж болно.
- Нээгдсэн дэлгэцүүд дээд таб дээр гарна; солих/хаах боломжтой. Нүүр хуудас хаагдахгүй. Табууд тухайн page session-д л хадгалагдана; reload/байгууллага солиход шинээр нээгдэнэ.
- Нүүр хуудасны welcome доторх «Хяналтын самбар харах» товчоор өмнөх статистикийг харна.
- Desktop sidebar нарийсгах, mobile drawer нээх/хаах хэвээр. Header байгууллага солих боломжтой.
- Визуал override нь assets/workspace-shell.css, navigation/tab shell нь assets/workspace-shell.js. Хуучин assets/style.css нь module-specific үндсэн style-уудтай хэвээр.

### Welcome artwork

Нүүр хуудсанд assets/smart-point-welcome.png зураг ашиглана. Хэрэглэгчийн screenshot-д тулгуурлан Smart Software лого, торон дүрслэл, Welcome бичгийг дахин дүрсэлж, гол нэрийг SMART POINT, тайлбарыг LOYALTY & REWARDS MANAGEMENT SYSTEM болгон сольсон. Эх сайт read-only хүсэлтэд 403 өгсөн тул эх asset-ийг шууд хуулсан pixel-identical файл биш. Өмнөх статистикийг зүүн дээд дэд цэсний «Хяналтын самбар харах» товчоор нээнэ. Үндсэн цэс, бүртгэлийн өгөгдлийг өөрчлөөгүй.

### Хяналтын самбарыг хассан (2026-10-28)

Хяналтын самбарын үндсэн цэс, статистикийн дэлгэц, түүнийг нээх товч, огнооны шүүлтүүр болон ролийн модуль жагсаалтаас хассан. Нүүр хуудасны welcome зураг home route/tab-аар хэвээр; үндсэн модулийн тоо 11. Өмнөх статистикийн helper функцуудыг арилгасан. Өмнө хадгалсан бараа, код, оноо болон бусад ажлын өгөгдлийг өөрчлөөгүй.

### Систем / Мастер дата дэд цэс

- Систем → Тохиргоо (Байгууллагын мэдээлэл, Албан үүрэг/эрх, Системийн үндсэн тохиргоо), Лог (өмнөх Үйлдлийн түүх), Импорт.
- Мастер дата → Хэрэглэгч (жагсаалт/дэлгэрэнгүй), Бүтээгдэхүүн (жагсаалт/ангилал/брэнд/нэгж), Ажилтан (өмнөх админ ажилтны бүртгэл).
- Тохиргоо, Бүтээгдэхүүн, Хэрэглэгчид гэсэн давхардсан үндсэн модулиудыг доод жагсаалтаас хассан; хуучин дэлгэцийн ID болон өгөгдөл хэвээр. Үндсэн модулийн тоо 10.
- Импорт нь одоогоор зөвхөн дэд цэс/дэлгэцийн placeholder; файл импортлох үйлдэл хараахан байхгүй.

### Ерөнхий тохиргоо → Компани

Систем → Тохиргоо → өмнөх Байгууллагын мэдээлэл нь Ерөнхий тохиргоо нэртэй болсон. Дэлгэц дотор Ерөнхий тохиргоо (мэдээллийн тойм), Компани гэсэн табуудтай; Компани анх нээгдэнэ. Accounting reference-ийн нягт label/value мөр, компанийн тохиргооны fieldset, Хадгалах & Гарах командын байрлалаар загварчилсан.

Компани таб: компанийн нэр, регистр, үйл ажиллагааны төрөл (үйлдвэрлэгч/нийлүүлэгч), и-мэйл, утас, хаяг, лого. PNG/JPG/WebP ≤1 MB логог сонгох, preview, арилгах, тухайн байгууллагад хадгалах боломжтой. Нэр/регистр давхардахгүй; алдаатай хадгалалтад бичсэн мэдээлэл хэвээр үлдэнэ. Дотоод таб солиход draft алдагдахгүй. Хадгалах & Гарах нь хадгалалт амжилттай бол workspace табыг хааж нүүр рүү буцна. Байгууллага бүрийн лого/мэдээлэл directory orgId-аар тусдаа. Байгууллага шинээр бүртгэх боломж Ерөнхий тохиргоо тойм таб дотор хэвээр.

## Стандарт логийн UI

Систем → Лог нь Бүртгэлийн лог, Системийн лог, Хэрэглэгчийн лог гэсэн дэлгэцтэй. Reference-ийн нягт хүснэгт, шүүлтийн нөхцөл, цэнхэр Бүх/Бүртгэсэн/Зассан/Устгасан тоон товч, шар идэвхтэй бүлгийн мөр, дэлгэх/хумих бүлэг ашиглана. Огноо (UTC+08), хэрэглэгч, модуль, эх сурвалжаар шүүх, хайх, CSV, бүх шүүсэн логийн хэвлэх тайлантай. Хэрэглэгчийн лог нь actor бүрийн үйлдлийн тоо, дэлгэрэнгүй рүү шилжихтэй.

48 нэг удаагийн sample лог (logExamplesVersion=1) нь дүрслэлийн өгөгдөл; устгалын sample бодит бараа устгахгүй. Local хадгалалтын save дээр бараа/код/хүрд/купон/судалгаа/даалгаврын өөрчлөлтийг whitelist талбараар өмнөх/дараах утгатай auditEntries-д хадгална. Company/staff/role тохиргоог directory auditEntries-д orgId scope-тай бүртгэнэ. Зургийн base64 логт орохгүй; урт утгыг 800 тэмдэгтийн хураангуй гэж тэмдэглэнэ. Импорт/серверийн нэвтрэлт/бодит IP-г зохиомлоор бүртгэхгүй. Энэ нь append-only хамгаалалттай серверийн аудит биш; браузерын local лог. Хэвлэх/экспортын хүсэлтүүдийг local үйлдлээр бүртгэнэ.

## Leaf icon ба хэрэглэгчийн стандарт хүснэгт

Дэд цэстэй node нь folder, шууд дэлгэц нээх node нь зориулалтын SVG icon-той. Систем болон бусад бүх модульд адил зарчимтай.

Мастер дата → Хэрэглэгч → Хэрэглэгчийн жагсаалт нь reference-ийн toolbar/filter/dense grid загвартай: код, нэр, бүлэг, идэвхтэй төлөв, утас, и-мэйл, хаяг, зэрэглэл, ашигласан код, орлого/зарлагын нийлбэр. Хайлт, бүлэг/хэрэглэгч/төлөв/зэрэглэлийн шүүлтүүр, баганаар эрэмбэлэх, сонголт, 25 мөрийн pagination, CSV, сонгосон эсвэл шүүсэн бүх хэрэглэгчийн хэвлэх тайлан. Нэр/утасны өмнөх db.users бүтэц болон бусад модулийн холбоосыг хадгалж, нэмэлт мэдээллийг db.userProfiles-д утсаар холбодог.

Хэрэглэгч нээж дэлгэрэнгүй/гүйлгээ харах, нэмэх/засах боломжтой. Код/нормчилсон утас давхардахгүй. Холбоосыг эвдэхгүйн тулд одоо байгаа утсыг засахгүй; нэр болон профайл засна. Анхны 5 профайлын нэмэлт имэйл/хаяг нь .example танилцуулга бөгөөд Жишээ тэмдэглэгээтэй. Жинхэнэ login, message/email sending байхгүй. Create/edit нь хэрэглэгчийн локал лог үүсгэдэг; байгууллагаар тусгаарлагдана.

### Smart UI standard (2026-10-28)

The user list follows the supplied Smart CRM reference: 40px blue header, 190px split sidebar, 32px workspace tabs, three compact filter rows, a 60px grid header and 24px data rows. The count and pagination stay at the bottom of the viewport; the grid scrolls independently. Phone and email filters operate on existing user data. Mobile navigation retains a header menu button. No stored data or business rules are migrated by this visual update.

User registration uses a tab-free Smart desktop modal with code, name, phone, email, registration channel, level and active state. Save & New opens a cleared form; Save & Close returns to the list. Existing phone references and profile metadata are preserved.

Registration fields now use a single aligned column in the 800px Smart user window. The list, CSV and printed report omit the group column; registration channel replaces the group filter. Legacy group metadata remains stored for compatibility.

The user list toolbar follows the six-action Smart standard: New, Copy, Edit, Delete, Refresh and Print. Copy requires one selected user and assigns a fresh code with an empty phone field. Edit requires one selected user. Delete asks for confirmation and hides the selected records using a persisted deleted flag, retaining user references and activity history with an audit entry. Refresh redraws the current filtered list and clears selection.

User registration has the Smart two-row window header: title with maximize/close, save commands, New/Edit state, new-record shortcut, first/previous/next/last navigation within the current filtered list, local storage information and help. Record navigation asks before discarding unsaved changes; unavailable directions are disabled.

Clicking a user's code or name now opens the same registration window. Existing users also see read-only earned, spent and transaction-derived net points plus their ledger history and grant expiry dates. The totals are scoped by user phone (including code-linked ledger entries), refresh during record navigation, and do not claim to deduct expired grants automatically. New users have no points history panel.

### Goods master data (2026-10-28)

Under Master Data, Products is now Goods (Бараа), with six Smart desktop screens: Бараа, Барааны дэлгэрэнгүй жагсаалт, Барааны бүлэг, Барааны ангилал, Бренд and Хэмжих нэгж. The basic grid has a hierarchical group pane; the detail grid has code/name/reference/type/tax/active filters and bulk group/category/brand assignment. Existing products and reference names remain compatible with QR and points modules. Company columns reflect the active organization; there is no financial-system import integration.

Reference registers provide code/name search, sorting, create/copy/edit/delete and printing, with seeded examples. Reference renames propagate to products; groups support parent/child relationships. References already used by a product or subgroup cannot be deleted. Existing product codes are read-only to protect historical QR references. Removing a product archives it (inactive/deleted), retaining QR and ledger history. The same existing product form retains image, price, tax, QR and points settings and adds group/type fields. Local browser storage remains the persistence layer.

Goods registration additionally stores an optional account code, standard unit cost, purchase/receipt price and sales-item flag. Existing `price` remains the sale price, now labeled Худалдах үнэ. Legacy records default new costs to zero and sales-item to true, preserving prior sale prices. Numeric costs/prices must be nonnegative. Detail grids, printing, copies and audit changes include these fields; the account is stored as a code, without an accounting-system connection.

The goods-group register follows the supplied DemoCenter tree/window reference: 550px compact modal with title controls, Save & New / Save & Exit, edit/new state and record navigation. Its two visible fields are Код (the group's display identifier/name, matching the reference) and Харьяалагдах бүлэг (parent code/picker plus read-only name). Internal stable group IDs are retained for product links. Parent options exclude the edited group and descendants. Tree rows support double-click editing, collapse/expand, sibling ordering, and protected deletion. Untouched four-group starter directories receive richer sample subgroups once; custom directories are preserved.

Category, brand and unit registration use the same 500px Smart reference window: exactly two visible fields (code/name), Save & New / Save & Exit, New/Edit state, first/previous/next/last navigation and maximize/close. Existing category descriptions remain stored while hidden from the compact editor. All reference validation, rename propagation and local persistence remain active.

### Employee register

Master Data → Ажилтан uses the Smart six-action grid and a 650px employee window matching the reference, omitting the Company field. Records are scoped automatically to the selected organization. Fields are code/name, permanent/contract/hourly type, registration, email, phone, job title, active state and an optional link to an existing local admin record. The link stores metadata and does not create authentication or grant roles. Existing IDs and role metadata remain intact; new employee records receive no admin role automatically. Copy clears unique contact/login links, code/email duplicates are checked within the organization, and deletion archives the record while preserving its ID/history. Save & New, record navigation, maximize/close, search, print and directory audit are supported.

### EAF QR documents and lists

QR issuance is modeled as a **document**: it records a unique document number, date, referenced product, quantity and immutable points/validity snapshot. Product/category/unit data remain master references. Код үүсгэх баримт now lists issuance documents and opens a compact Save & New / Save & Exit window. Saving creates 1–500 fresh inactive Unique codes and the document together; a failed local save rolls back both. Copy creates a new document and new codes. Editing an issued document changes only its date/note, preserving code identities, quantities and snapshots. Deleting is implemented as confirmed cancellation; documents with used codes are protected, and cancelled codes cannot be reactivated. Existing codes without a document remain intact and show no invented document number.

Кодын жагсаалт and Код ашиглалтын түүх use EAF dense list grids, a collapsible date/product/status filter area, F3 search, sort, selection, related information, and icon-only print/help/settings commands. Individual code lists retain activation and QR/text label export; history offers list printing and CSV, without direct label-print actions. Column visibility settings are saved per organization. The related information window links the source document, user and actual point transactions. Label preview follows the same compact window style and supports QR, full text or both.

Issuance shortcuts: Ctrl+N new, Alt+C copy, F2 edit metadata, Delete cancel, F5 filter/refresh, F3 search, Ctrl+S Save & New, Ctrl+Alt+S Save & Exit, Ctrl+P selected document print and Ctrl+Shift+P list print. Delete/edit are not dispatched while typing in an input. Document dates/numbers use Asia/Shanghai business dates. These remain browser-local demo operations, not a server-authorized or multi-device issuance service.

Validated QR changes with browser tests covering issuance snapshots, copy/uniqueness, rollback, filtering, activation, cancellation/used-code guards, column settings, legacy code preservation, related data, keyboard actions, tenant isolation, QR/text HTML export and separate PDF outputs for labels/documents/lists, plus mobile layout.
