const RUBRIC = [
  {
    key: "A",
    title: "Motivasyon & Karakter",
    items: [
      { key: "A1", label: "İstikrar/Devam niyeti" },
      { key: "A2", label: "Müşteri ve ekip iletişimi" },
      { key: "A3", label: "Sorumluluk alma ve hata sahiplenme" },
      { key: "A4", label: "Stres altında tutum" },
      { key: "A5", label: "Dürüstlük/şeffaflık" },
    ],
  },
  {
    key: "B",
    title: "Teknik Yatkınlık",
    items: [
      { key: "B1", label: "El becerisi & ince motor" },
      { key: "B2", label: "Dikkat/temizlik/düzen" },
      { key: "B3", label: "Mekanik mantık (sök-tak mantığını anlama)" },
      { key: "B4", label: "Araç-gereç kullanım özeni" },
      { key: "B5", label: "Risk farkındalığı (kırılgan parça/ESD/batarya)" },
    ],
  },
  {
    key: "C",
    title: "Öğrenme & Gelişim",
    items: [
      { key: "C1", label: "Talimatı anlama (tek seferde)" },
      { key: "C2", label: "Geri bildirimle düzeltme hızı" },
      { key: "C3", label: "Not alma / adım adım çalışma" },
      { key: "C4", label: "Problem çözme yaklaşımı" },
      { key: "C5", label: "Merak ve öğrenme isteği" },
    ],
  },
  {
    key: "D",
    title: "Disiplin & İş Ahlakı",
    items: [
      { key: "D1", label: "Zaman yönetimi & dakiklik" },
      { key: "D2", label: "İş güvenliği & kurala uyum" },
      { key: "D3", label: "Kalite standardı (tekrar kontrol)" },
      { key: "D4", label: "Gizlilik ve müşteri cihazına saygı" },
      { key: "D5", label: "İş bitirme takibi (yarım bırakmama)" },
    ],
  },
];

const INTERVIEW_FLOW = [
  {
    stepKey: "A",
    title: "Motivasyon & Karakter",
    description: "Tutum, dürüstlük, stres ve sorumluluk",
    questions: [
      {
        id: "A_q1",
        title: "İş istikrarı ve devam niyeti",
        rubricKey: "A1",
        prompt: "Bu işi 6 ay sürdürebilmeni engelleyebilecek şeyler neler? Bu riskleri nasıl yönetirsin?",
        candidatePrompt: "İlk ayında işler yoğun, eve yorgun dönüyorsun ve arkadaşların farklı iş teklifleri yapıyor. Bu durumda ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Belirsiz/çelişkili, sık iş değişimi normal", candidateLabel: "Arkadaşlarımın tekliflerini değerlendiririm, bu iş zaten geçici olabilir." },
          { label: "Orta", score: 3, note: "Niyet var ama plan net değil", candidateLabel: "Biraz kararsız kalırım ama devam etmeye çalışırım, bakalım ne olacak." },
          { label: "İyi", score: 4, note: "Somut plan ve devam motivasyonu", candidateLabel: "Hedefime odaklanırım; bu işte kendimi geliştirmek istiyorum, geçici zorluklara takılmam." },
          { label: "Çok iyi", score: 5, note: "Net hedef, istikrar kanıtı, gerçekçi plan", candidateLabel: "Uzun vadeli planıma bakarım; bu işin bana neler katacağını düşünür, kararlılıkla devam ederim." },
        ],
      },
      {
        id: "A_q2",
        title: "Hata sahiplenme",
        rubricKey: "A3",
        prompt: "Bir hatayı fark ettiğinde ilk 3 adımın ne olur? (müşteri/ekip etkisi varsa)",
        candidatePrompt: "Bir müşterinin telefonunu tamir ederken yanlışlıkla ekran kablosuna hasar verdin. Kimse görmedi. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Gizleme/suç atma eğilimi", candidateLabel: "Kabloyu yerine takarım, belki fark edilmez diye umarım." },
          { label: "Orta", score: 3, note: "Söyler ama geç/dağınık iletişim", candidateLabel: "Biraz beklerim; sorun çıkarsa o zaman söylerim." },
          { label: "İyi", score: 4, note: "Hızlı bildirir, çözüm odaklı", candidateLabel: "Hemen ustama söylerim ve birlikte çözüm ararız." },
          { label: "Çok iyi", score: 5, note: "Erken bildirir, etkiyi azaltır, tekrar önlemi önerir", candidateLabel: "Durumu hemen bildiririm, hasarın etkisini anlatırım ve benzer hataları önlemek için ne yapabileceğimi sorarım." },
        ],
        redFlagOn: ["Gizlerim", "Söylemem"],
      },
      {
        id: "A_q3",
        title: "Stres altında tutum",
        rubricKey: "A4",
        prompt: "Teslim saati yaklaştı ve bir adımda emin değilsin. Ne yaparsın?",
        candidatePrompt: "Saat 17:00'de teslim edilmesi gereken 3 telefon var. Saat 16:30 ve birinde hangi adımı atacağından emin değilsin. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Acele eder, riski görmez", candidateLabel: "Hızlıca deneyip bitirmeye çalışırım; zaman kaybetmemem lazım." },
          { label: "Orta", score: 3, note: "Yapmaya çalışır ama yöntem karışık", candidateLabel: "En iyisini yapmaya çalışırım ama biraz panikleyebilirim." },
          { label: "İyi", score: 4, note: "Durur, kontrol eder, yardım ister", candidateLabel: "Emin olmadığım adımda dururum, ustama sorarım ve güvenli şekilde devam ederim." },
          { label: "Çok iyi", score: 5, note: "Güvenlik/kalite önceliği, net iletişim, kontrollü ilerler", candidateLabel: "Önce durumu ustama bildiririm, gecikme olabileceğini söyletirim; güvenli ve doğru şekilde tamamlarım." },
        ],
      },
      {
        id: "A_q4",
        title: "İletişim",
        rubricKey: "A2",
        prompt: "Müşteriye kötü bir haberi (gecikme/ek maliyet) nasıl iletirsin?",
        candidatePrompt: "Bir müşterinin telefonu tahminden daha hasarlı çıktı. Ekstra maliyet ve 2 gün gecikme olacak. Müşteriyi araman gerekiyor. Ne söylersin?",
        options: [
          { label: "Zayıf", score: 1, note: "Savunmacı/sert dil", candidateLabel: "\"Telefon çok bozukmuş, fazladan para lazım\" derim; kabul etmezse yapamayız derim." },
          { label: "Orta", score: 3, note: "Temel anlatır ama empati zayıf", candidateLabel: "Durumu anlatırım ama müşteri kızarsa ne diyeceğimi bilemem." },
          { label: "İyi", score: 4, note: "Net, saygılı, çözüm önerir", candidateLabel: "Kibarca durumu açıklar, ek maliyeti ve süreyi net söyler, anlayış dilerim." },
          { label: "Çok iyi", score: 5, note: "Beklenti yönetimi + alternatifler + kayıt altına alma", candidateLabel: "Durumu detaylı açıklarım, alternatif çözümler sunarım, yazılı bilgi gönderirim ve süreci takip ederim." },
        ],
      },
      {
        id: "A_q5",
        title: "Dürüstlük / şeffaflık",
        rubricKey: "A5",
        prompt: "Bir hatayı kimse görmeden düzeltebileceğini fark ettin. Yine de bildirir misin? Nasıl?",
        candidatePrompt: "Tamir sırasında küçük bir plastik klipsi kırdın. Yerine takınca dışarıdan belli olmuyor ve kimse fark etmeyecek gibi. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Bildirmem / saklarım", redFlag: true, candidateLabel: "Belli olmuyorsa sorun yok, yerine takarım ve devam ederim." },
          { label: "Orta", score: 3, note: "Duruma göre değişir", candidateLabel: "Duruma göre karar veririm; çok önemli bir parça değilse geçerim." },
          { label: "İyi", score: 4, note: "Bildiririm, çözümle birlikte", candidateLabel: "Ustama söylerim, yeni klips takılması gerekiyorsa birlikte yaparız." },
          { label: "Çok iyi", score: 5, note: "Erken bildirir, kayıt altına alır, tekrar önlemi önerir", candidateLabel: "Hemen bildiririm, yedek parçayla değiştiririm, bu tür kırılma riskini azaltmak için not alırım." },
        ],
      },
    ],
  },
  {
    stepKey: "B",
    title: "Teknik Yatkınlık",
    description: "El becerisi, düzen, risk farkındalığı",
    questions: [
      {
        id: "B_q0",
        title: "El becerisi & ince motor",
        rubricKey: "B1",
        prompt: "Küçük parçalarla (vida/klips) çalışırken elin kayarsa ne yaparsın? Kuvveti nasıl ayarlarsın?",
        candidatePrompt: "Telefon içindeki çok küçük bir vidayı sökerken tornavidan kayıyor ve vida yuvası hasar görebilir. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Zorlar/acele eder", candidateLabel: "Biraz daha bastırarak tekrar denerim; çıkması lazım." },
          { label: "Orta", score: 3, note: "Dener ama yöntemi net değil", candidateLabel: "Birkaç kez denerim, olmazsa yardım isterim ama biraz zorlarım önce." },
          { label: "İyi", score: 4, note: "Doğru uç/pozisyon, yavaş ilerler", candidateLabel: "Dururum, tornavida ucunu kontrol ederim, doğru açıyla yavaşça tekrar denerim." },
          { label: "Çok iyi", score: 5, note: "Kuvvet/denge, tekrar denemeden önce pozisyonu düzeltir", candidateLabel: "Hemen dururum, uygun ucu seçerim, gerekirse ışık ve büyüteç kullanırım, kontrollü şekilde ilerlerim." },
        ],
      },
      {
        id: "B_q1",
        title: "Düzen / parça yönetimi",
        rubricKey: "B2",
        prompt: "Küçük vidalar/parçalarla çalışırken düzeni nasıl kurarsın?",
        candidatePrompt: "Bir telefonu açtın, içinden 12 farklı vida ve 5 küçük parça çıktı. Masanda bunları nasıl düzenlersin?",
        options: [
          { label: "Zayıf", score: 1, note: "Düzen yöntemi yok", candidateLabel: "Hepsini masanın bir köşesine koyarım, takma sırasında hatırlarım." },
          { label: "Orta", score: 3, note: "Basit yöntem var ama tutarsız", candidateLabel: "Kabaca gruplarım ama bazen karışabilir." },
          { label: "İyi", score: 4, note: "Mat/kap/etiket gibi yöntemle sistem kurar", candidateLabel: "Manyetik mat veya küçük kaplar kullanırım, çıkış sırasına göre dizerim." },
          { label: "Çok iyi", score: 5, note: "Sıra + kontrol + kayıp önleme yöntemi net", candidateLabel: "Her vidayı çıkış sırasıyla numaralı bölmelere koyar, fotoğraf çeker ve not alırım." },
        ],
      },
      {
        id: "B_q2",
        title: "Araç kullanımı",
        rubricKey: "B4",
        prompt: "Daha önce kullanmadığın bir aleti eline alınca önce ne yaparsın?",
        candidatePrompt: "Ustan sana daha önce hiç kullanmadığın özel bir alet verdi ve \"bununla aç\" dedi. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Deneyip zorlar, riskli", candidateLabel: "Hemen denemeye başlarım, kullanarak öğrenirim." },
          { label: "Orta", score: 3, note: "Sorabilir ama aceleci", candidateLabel: "Bir göz atarım, emin olmasam da denerim." },
          { label: "İyi", score: 4, note: "Kısa kontrol + talimat/soru", candidateLabel: "Ustama nasıl kullanılacağını sorar, göstermesini isterim, sonra dikkatlice uygularım." },
          { label: "Çok iyi", score: 5, note: "Güvenlik + doğru uç/kuvvet + test", candidateLabel: "Aletin ne işe yaradığını sorar, doğru tutma şeklini ve kuvvetini öğrenir, önce yanında denememi isterim." },
        ],
      },
      {
        id: "B_q3",
        title: "Mekanik mantık",
        rubricKey: "B3",
        prompt: "Bir parçayı sökerken 'hangi sırayla' gideceğine nasıl karar verirsin?",
        candidatePrompt: "Daha önce hiç açmadığın bir telefon modelini sökmen gerekiyor. Nereden başlarsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Rastgele/acele", candidateLabel: "Mantıklı görünen yerden başlarım; bozulursa geri alırım." },
          { label: "Orta", score: 3, note: "Genel mantık var ama sistem yok", candidateLabel: "İnternetten bakabilirim ama genelde deneyerek ilerlerim." },
          { label: "İyi", score: 4, note: "Adım adım, foto/not, ters sırayla toplama", candidateLabel: "Önce rehber veya video izlerim, adımları not alırım, sırayla ilerlerim." },
          { label: "Çok iyi", score: 5, note: "Riskli alanları ayırır, kontrol noktaları koyar", candidateLabel: "Rehberi inceler, riskli noktaları (kablo, batarya) belirler, her adımı not alır ve ters sırayla toplayacak şekilde ilerlerim." },
        ],
      },
      {
        id: "B_q4",
        title: "Risk farkındalığı",
        rubricKey: "B5",
        prompt: "Batarya/ısı/ESD gibi risklerde nasıl önlem alırsın?",
        candidatePrompt: "Tamir sırasında batarya biraz şişmiş görünüyor. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Önlem gereksiz görür", candidateLabel: "Dikkatlice çıkarmaya çalışırım, genelde sorun olmaz." },
          { label: "Orta", score: 3, note: "Temel farkındalık", candidateLabel: "Biraz tedirgin olurum ama devam ederim; sorun olursa dururum." },
          { label: "İyi", score: 4, note: "Doğru önlem, emin değilse durur", candidateLabel: "İşi durdururum ve ustama haber veririm, güvenli çıkarma yöntemini sorarım." },
          { label: "Çok iyi", score: 5, note: "Proaktif; standardı korur; riskte işi durdurur", candidateLabel: "Hemen dururum, bataryaya dokunmam, güvenlik mesafesi bırakırım; ustamı çağırır, uygun ekipmanla müdahale edilmesini sağlarım." },
        ],
        redFlagOn: ["Önemsiz"],
      },
    ],
  },
  {
    stepKey: "C",
    title: "Öğrenme & Gelişim",
    description: "Talimat, geri bildirim, problem yaklaşımı",
    questions: [
      {
        id: "C_q1",
        title: "Talimatı anlama",
        rubricKey: "C1",
        prompt: "Yeni bir işi tek sefer anlatınca nasıl emin olursun?",
        candidatePrompt: "Ustan sana yeni bir tamir işlemini anlattı: \"Önce ısı tabancasıyla yumuşat, sonra ince spatulayla ayır, dikkat et kablo var.\" Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Sormadan başlar, hata riski", candidateLabel: "\"Tamam anladım\" der, hemen başlarım." },
          { label: "Orta", score: 3, note: "Bazen sorar", candidateLabel: "Kafamda tekrarlarım, soru sormam ama dikkatli olurum." },
          { label: "İyi", score: 4, note: "Kritik noktada soru + tekrar", candidateLabel: "Kablonun nerede olduğunu sorar, bir de göstermesini isterim." },
          { label: "Çok iyi", score: 5, note: "Kendi cümlesiyle tekrar eder + kontrol listesi", candidateLabel: "Adımları kendi cümlemle tekrarlarım: \"Önce ısıtıyorum, sonra spatulayla ayırıyorum, kablo şurada mı?\" diye teyit alır, not alırım." },
        ],
      },
      {
        id: "C_q2",
        title: "Geri bildirimle düzeltme",
        rubricKey: "C2",
        prompt: "Usta seni düzelttiğinde ne yaparsın?",
        candidatePrompt: "Ustanız \"Bu vidayı çok sıktın, kırılabilirdi\" dedi. Ne hisseder, ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Savunmaya geçer", candidateLabel: "İçimden \"abartıyor\" derim, zaten kırılmadı ki." },
          { label: "Orta", score: 3, note: "Kabul eder ama tekrar riski", candidateLabel: "Biraz kötü hissederim ama \"tamam\" derim, dikkat etmeye çalışırım." },
          { label: "İyi", score: 4, note: "Hemen düzeltir, tekrar etmez", candidateLabel: "Teşekkür ederim, doğru sıkma kuvvetini sorarım ve hemen düzeltirim." },
          { label: "Çok iyi", score: 5, note: "Düzeltir + nedenini öğrenir + standartlaştırır", candidateLabel: "Teşekkür ederim, neden kırılma riski olduğunu öğrenirim, doğru torku sorar ve bundan sonraki işlerde kontrol noktası olarak aklıma yazarım." },
        ],
      },
      {
        id: "C_q3",
        title: "Not alma",
        rubricKey: "C3",
        prompt: "İş akışını hatasız yapmak için nasıl not/işaret kullanırsın?",
        candidatePrompt: "Yeni bir tamir sürecini öğreniyorsun. 8 adım var ve bazıları çok benziyor. Karıştırmamak için ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Not almam", candidateLabel: "Ezberlerim, not almaya gerek yok." },
          { label: "Orta", score: 3, note: "Bazen alırım", candidateLabel: "Aklımda tutmaya çalışırım, gerekirse tekrar sorarım." },
          { label: "İyi", score: 4, note: "Adım adım not alır", candidateLabel: "Adımları kısa kısa not alırım ve sırayla takip ederim." },
          { label: "Çok iyi", score: 5, note: "Kontrol listesi + kontrol noktaları", candidateLabel: "Her adımı not alır, benzer adımları renkle işaretler, kontrol listesi yapar ve her seferinde listeye bakarak ilerlerim." },
        ],
      },
      {
        id: "C_q4",
        title: "Problem yaklaşımı",
        rubricKey: "C4",
        prompt: "Hata yaptığını fark ettin. İlk kontrol edeceğin 3 şey ne?",
        candidatePrompt: "Tamir ettiğin telefon açılmıyor. Her şeyi doğru yaptığını düşünüyorsun. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Panik/rasgele deneme", candidateLabel: "Tekrar söker takarım, belki düzelir." },
          { label: "Orta", score: 3, note: "Biraz sistem var", candidateLabel: "Biraz bakınırım, düzelmezse ustama gösteririm." },
          { label: "İyi", score: 4, note: "Adım geri + doğrulama", candidateLabel: "Son yaptığım adıma geri döner, bağlantıları tek tek kontrol ederim." },
          { label: "Çok iyi", score: 5, note: "Kök neden + kayıt + tekrar önleme", candidateLabel: "Sakin kalır, yaptığım her adımı geriye doğru kontrol eder, sorunlu noktayı tespit edip not alır ve ustama rapor veririm." },
        ],
      },
      {
        id: "C_q5",
        title: "Merak ve öğrenme isteği",
        rubricKey: "C5",
        prompt: "Bilmediğin bir konuda iyi soru sormak önemlidir. Yeni bir konuda ne tür sorular sorarsın?",
        candidatePrompt: "İlk kez gördüğün bir telefon parçası var, ne olduğunu bilmiyorsun. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Sormam / umursamam", candidateLabel: "Gerek yok, işimi yaparım geçerim." },
          { label: "Orta", score: 3, note: "Soru sorar ama dağınık", candidateLabel: "Merak ederim ama sormaya çekinebilirim." },
          { label: "İyi", score: 4, note: "Kritik noktaya odaklı sorular", candidateLabel: "Ustama bu parçanın ne işe yaradığını sorarım." },
          { label: "Çok iyi", score: 5, note: "Net hedefli sorular + not alıp tekrar eder", candidateLabel: "Parçanın ne olduğunu sorar, nasıl çalıştığını öğrenir, not alırım ve benzer parçaları da araştırırım." },
        ],
      },
    ],
  },
  {
    stepKey: "D",
    title: "Disiplin & İş Ahlakı",
    description: "Gizlilik, kalite, kural",
    questions: [
      {
        id: "D_q0",
        title: "Zaman yönetimi & dakiklik",
        rubricKey: "D1",
        prompt: "Geç kalma riskini nasıl yönetirsin? Bir gün gecikeceğini anladın, ne yaparsın?",
        candidatePrompt: "Sabah yola çıktın ama trafik çok yoğun. 15 dakika geç kalacağını anlıyorsun. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Haber vermeden geç kalırım", candidateLabel: "Gelince açıklarım, büyütülecek bir durum değil." },
          { label: "Orta", score: 3, note: "Haber veririm ama plan yok", candidateLabel: "Mesaj atarım: 'Geç kalıyorum.'" },
          { label: "İyi", score: 4, note: "Önceden haber + telafi planı", candidateLabel: "Hemen ararım, tahmini varış saatimi söyler ve o gün telafi etmeyi teklif ederim." },
          { label: "Çok iyi", score: 5, note: "Önleyici plan + düzenli iletişim + tekrar etmemek için aksiyon", candidateLabel: "Hemen ararım, durumu açıklar, tahmini süre söylerim. İşlerin aksamaması için ne yapılabileceğini sorarım. Bir daha için daha erken çıkmayı planlarım." },
        ],
      },
      {
        id: "D_q1",
        title: "Gizlilik",
        rubricKey: "D4",
        prompt: "Müşteri cihazında özel bilgiler var. Sınırın nedir?",
        candidatePrompt: "Tamir ettiğin telefonda ekranı açınca müşterinin özel fotoğrafları görünüyor. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Merak edip bakmak normal" , redFlag: true, candidateLabel: "Bir göz atarım, merak insanın doğasında."},
          { label: "Orta", score: 3, note: "Genel olarak bakmam der", candidateLabel: "Bakmamaya çalışırım ama gözüme çarparsa olan olmuştur." },
          { label: "İyi", score: 4, note: "Kesin sınır + prensip", candidateLabel: "Hemen başka ekrana geçerim, kesinlikle bakmam." },
          { label: "Çok iyi", score: 5, note: "Gizlilik + kayıt + ekran kilidi/etik standart", candidateLabel: "Ekranı hemen kapatır veya kilitli moda alırım. Müşteri verilerine asla bakmam, bu benim meslek ilkemdir." },
        ],
      },
      {
        id: "D_q2",
        title: "Kural ve güvenlik",
        rubricKey: "D2",
        prompt: "Kurala aykırı ama işi hızlandıran bir yol var. Ne yaparsın?",
        candidatePrompt: "Bir tamir adımında koruyucu gözlük takman gerekiyor ama gözlük çok rahatsız ve kimse takmıyor. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Kuralı esnetmek normal", redFlag: true, candidateLabel: "Kimse takmıyorsa ben de takmam, gereksiz." },
          { label: "Orta", score: 3, note: "Duruma göre değişir", candidateLabel: "Tehlikeli görünürse takarım, yoksa çıkarırım." },
          { label: "İyi", score: 4, note: "Kurala uyar, gerekirse sorar", candidateLabel: "Her zaman takarım, kural kuraldir." },
          { label: "Çok iyi", score: 5, note: "Güvenlik/kalite önceliği, doğru eskalasyon", candidateLabel: "Her zaman takarım. Rahatsızsa daha uygun bir model önerir, diğerlerine de hatırlatırım." },
        ],
      },
      {
        id: "D_q3",
        title: "Kalite kontrol",
        rubricKey: "D3",
        prompt: "Teslim öncesi kalite kontrolü nasıl yaparsın?",
        candidatePrompt: "Tamiri bitirdin, telefon çalışıyor. Ama teslim etmeden önce son bir kontrol yapman öneriliyor. Saat geç ve yorgunsun. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Gerek görmem", candidateLabel: "Çalışıyor, kontrol gereksiz, teslim ederim." },
          { label: "Orta", score: 3, note: "Hızlı bakarım", candidateLabel: "Hızlıca bir bakarım, sorun yoksa veririm." },
          { label: "İyi", score: 4, note: "Kontrol listesiyle kontrol", candidateLabel: "Kontrol listesini takip eder, her maddeyi tek tek test ederim." },
          { label: "Çok iyi", score: 5, note: "Standart QC + kayıt + tekrar kontrol", candidateLabel: "Yorgun olsam da kontrol listesini eksiksiz uygular, her fonksiyonu test eder, sonucu not alır ve güvenle teslim ederim." },
        ],
      },
      {
        id: "D_q4",
        title: "İş takibi",
        rubricKey: "D5",
        prompt: "Yarım kalan işi bir sonraki kişiye nasıl devredersin?",
        candidatePrompt: "Mesai bitiyor ama elindeki tamir yarım kaldı. Yarın sen gelmeyeceksin, iş arkadaşın devam edecek. Ne yaparsın?",
        options: [
          { label: "Zayıf", score: 1, note: "Sözlü bırakırım", candidateLabel: "Masada bırakırım, arkadaşım halleder." },
          { label: "Orta", score: 3, note: "Kısaca yazarım", candidateLabel: "Kısaca söylerim: 'Şurada kaldım' derim." },
          { label: "İyi", score: 4, note: "Not + parça düzeni + durum", candidateLabel: "Kalan adımları ve parça durumunu not ederim, masayı düzenli bırakırım." },
          { label: "Çok iyi", score: 5, note: "Devir checklist + risk notu + kalan adım", candidateLabel: "Detaylı not yazarım: hangi adımda kaldım, riskli noktalar, parça düzeni, kalan işler. Arkadaşıma da sözlü aktarırım." },
        ],
      },
    ],
  },
];

const DIRECT_QUESTIONS = [
  { id: "dir_1", text: "Son 6 ayda kaç kez geç kaldın? Sebep ve çözüm neydi?" },
  { id: "dir_2", text: "Bu işte seni en çok zorlayacak konu sence ne?" },
  { id: "dir_3", text: "Ekip içinde anlaşmazlık yaşadığında nasıl çözersin?" },
  { id: "dir_4", text: "Müşteri cihazına/emanete yaklaşımın nasıl?" },
];

const INTERVIEW_STATE = {
  stepIndex: 0,
  answers: {},
  candidateChoices: {},
  directChecks: {},
  autoFilled: {},
  autoRedFlag: false,
};

function getMode() {
  if (document.documentElement.classList.contains("candidate-mode")) return "candidate";
  const params = new URLSearchParams(window.location.search);
  return (params.get("mode") || "admin").toLowerCase();
}

function isCandidateMode() {
  return getMode() === "candidate";
}

function applyModeUI() {
  const candidate = isCandidateMode();

  const banner = document.getElementById("candidateBanner");
  if (banner) banner.classList.toggle("hidden", !candidate);

  document.querySelectorAll(".admin-only").forEach((n) => {
    n.classList.toggle("hidden", candidate);
  });

  document.querySelectorAll(".candidate-only").forEach((n) => {
    n.classList.toggle("hidden", !candidate);
  });

  const submit = document.getElementById("btnSubmit");
  if (submit) submit.textContent = candidate ? "Başvuru Gönder" : "Kaydet";

  if (candidate) {
    const evaluator = document.querySelector('[name="evaluator"]');
    if (evaluator && !evaluator.value) evaluator.value = "Aday";
  }
}

const QUESTION_SET = [
  {
    key: "A",
    title: "Motivasyon & Karakter",
    questions: [
      "Bu iş dikkat ve sabır istiyor. Daha önce uzun süre aynı işi dikkatle yaptığın bir durumu anlat. Ne zorladı, nasıl sürdürdün?",
      "Bir müşteriye yanlış bilgi verdiğini fark ettin. Müşteriye ve yöneticine nasıl anlatırsın?",
      "Bir ekip arkadaşın hatalı işlem yaptı ve kimse görmedi. Ne yaparsın, nasıl konuşursun?",
      "İş yoğun, teslim saati yaklaşıyor. Senin yüzünden gecikme riski var. Hangi adımları atarsın?",
    ],
  },
  {
    key: "B",
    title: "Teknik Yatkınlık",
    questions: [
      "Evde/bir işte bir şeyi söküp-taktığın bir örnek ver (bisiklet, bilgisayar, mobilya vs.). Hangi araçları kullandın, neye dikkat ettin?",
      "Çok küçük ve kaybolabilecek parçalarla çalıştığın bir iş oldu mu? Parçaları nasıl organize ettin?",
      "Bir işlemi yaparken ‘burası kırılabilir’ diye düşündüğün bir anı anlat. Nasıl önlem aldın?",
      "Sana bir alet verildi (tornavida/pens). Daha önce kullanmadın. Önce ne yaparsın?",
    ],
  },
  {
    key: "C",
    title: "Öğrenme & Gelişim",
    questions: [
      "Sana yeni bir işi 5 dakikada anlatıyoruz. Sonra tek başına yapacaksın. Anlamadığın yerde nasıl davranırsın?",
      "Daha önce bir konuda hızlı öğrenmek zorunda kaldın mı? Ne kadar sürede öğrendin, hangi yöntemle?",
      "Bir usta/öğretmen seni düzelttiğinde ilk tepkin ne olur? Sonra ne yaparsın?",
      "Bir işi yaparken hata yaptığını fark ettin. Hemen neyi kontrol edersin?",
    ],
  },
  {
    key: "D",
    title: "Disiplin & İş Ahlakı",
    questions: [
      "Müşteri cihazı geldi. İçinde özel fotoğraflar/mesajlar olabilir. Bu cihazla çalışırken sınırın nedir?",
      "Kural: batarya şişmesi/ısınma riski varsa işlem durur. İş yetişmiyor. Ne yaparsın?",
      "Bir işi bitirmeden bırakman gerekti (acil iş). Devam edecek kişiye nasıl devir yaparsın?",
      "İş sonunda kalite kontrol yapmak vakit alıyor. Herkes hızlıca teslim ediyor. Sen ne yaparsın?",
    ],
  },
];

function safeInt(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (typeof min === "number" && n < min) return min;
  if (typeof max === "number" && n > max) return max;
  return Math.trunc(n);
}

function buildDirectQuestions() {
  const container = document.getElementById("directQuestions");
  if (!container) return;
  container.innerHTML = "";

  for (const q of DIRECT_QUESTIONS) {
    const row = el("label", "flex items-start gap-2", null);
    const cb = el("input", "mt-1", null);
    cb.type = "checkbox";
    cb.checked = !!INTERVIEW_STATE.directChecks[q.id];
    cb.addEventListener("change", () => {
      INTERVIEW_STATE.directChecks[q.id] = cb.checked;
    });
    const t = el("span", "text-sm text-slate-200", q.text);
    row.appendChild(cb);
    row.appendChild(t);
    container.appendChild(row);
  }
}

function renderStepper() {
  const container = document.getElementById("interviewStepper");
  if (!container) return;
  if (isCandidateMode()) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = "";

  INTERVIEW_FLOW.forEach((s, idx) => {
    const isActive = idx === INTERVIEW_STATE.stepIndex;
    const isComplete = isStepComplete(idx);
    const btn = el(
      "button",
      "px-3 py-1.5 rounded-full border text-sm font-medium transition " +
        (isActive
          ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white border-violet-600 shadow-lg shadow-violet-600/30"
          : isComplete
            ? "bg-emerald-600/20 text-emerald-300 border-emerald-600/50 hover:bg-emerald-600/30"
            : "bg-dark-800 text-slate-300 border-dark-600 hover:bg-dark-700"),
      `${idx + 1}. ${s.title}`
    );
    btn.type = "button";
    btn.addEventListener("click", () => {
      INTERVIEW_STATE.stepIndex = idx;
      renderInterviewStep();
    });
    container.appendChild(btn);
  });
}

function totalInterviewQuestions() {
  return INTERVIEW_FLOW.reduce((a, s) => a + s.questions.length, 0);
}

function answeredCount() {
  let c = 0;
  for (const step of INTERVIEW_FLOW) {
    for (const q of step.questions) {
      if (isCandidateMode()) {
        if (INTERVIEW_STATE.candidateChoices[q.id]?.key) c++;
      } else {
        if (INTERVIEW_STATE.answers[q.id]?.score) c++;
      }
    }
  }
  return c;
}

function isStepComplete(stepIdx) {
  const step = INTERVIEW_FLOW[stepIdx];
  if (!step) return false;
  if (isCandidateMode()) {
    return step.questions.every((q) => !!INTERVIEW_STATE.candidateChoices[q.id]?.key);
  }
  return step.questions.every((q) => !!INTERVIEW_STATE.answers[q.id]?.score);
}

function setRubricAuto(rubricKey, score, note) {
  const select = document.querySelector(`[name="${rubricKey}"]`);
  const noteInput = document.querySelector(`[name="${rubricKey}_note"]`);
  if (!select || !noteInput) return;
  select.value = String(score);
  if (note && !noteInput.value) noteInput.value = note;
  INTERVIEW_STATE.autoFilled[rubricKey] = true;
  computeScores();
}

function computeInterviewMeta() {
  const filled = Object.keys(INTERVIEW_STATE.autoFilled).length;
  const node = document.getElementById("autoFilledCount");
  if (node) node.textContent = String(filled);
  const rf = document.getElementById("autoRedFlag");
  if (rf) rf.textContent = INTERVIEW_STATE.autoRedFlag ? "Evet" : "Hayır";

  const answered = answeredCount();
  const total = totalInterviewQuestions();
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const pbar = document.getElementById("interviewProgress");
  if (pbar) pbar.style.width = `${pct}%`;
  const pl = document.getElementById("interviewProgressLabel");
  if (pl) pl.textContent = String(pct);
  const an = document.getElementById("interviewAnswered");
  if (an) an.textContent = `${answered} / ${total}`;

  if (!isCandidateMode() && INTERVIEW_STATE.autoRedFlag) {
    const redSel = document.querySelector('[name="redFlag"]');
    if (redSel && redSel.value !== "Evet") redSel.value = "Evet";
  }
}

function renderInterviewStep() {
  renderStepper();
  if (!isCandidateMode()) buildDirectQuestions();

  const step = INTERVIEW_FLOW[INTERVIEW_STATE.stepIndex];
  const card = document.getElementById("interviewCard");
  if (!card) return;
  card.innerHTML = "";

  const top = el("div", "mb-3", null);
  if (isCandidateMode()) {
    const answered = answeredCount();
    const total = totalInterviewQuestions();
    top.appendChild(el("div", "text-sm text-slate-400 font-medium", `Soru: ${answered + 1} / ${total}`));
  } else {
    top.appendChild(el("div", "text-sm text-slate-400", step.description));
    top.appendChild(el("div", "text-lg font-semibold text-slate-100", step.title));
  }
  card.appendChild(top);

  step.questions.forEach((q) => {
    const box = el("div", "border border-violet-600/30 rounded-xl p-4 mb-3 bg-dark-800/50", null);
    if (!isCandidateMode()) box.appendChild(el("div", "font-medium text-slate-200", q.title));
    box.appendChild(el("div", "text-sm text-slate-300 mt-1", isCandidateMode() && q.candidatePrompt ? q.candidatePrompt : q.prompt));

    if (isCandidateMode()) {
      const optWrap = el("div", "grid md:grid-cols-2 gap-2 mt-3", null);
      q.options.forEach((opt) => {
        const isSelected = INTERVIEW_STATE.candidateChoices[q.id]?.key === opt.label;
        const label = el("label", "border rounded-xl p-3 cursor-pointer transition " + (isSelected ? "border-violet-400 bg-violet-600/20 ring-1 ring-violet-400/50" : "border-violet-600/30 bg-dark-800 hover:bg-dark-700 hover:border-violet-600/50"), null);
        const radio = el("input", "mr-2 accent-blue-600", null);
        radio.type = "radio";
        radio.name = q.id;
        radio.value = String(opt.label);
        radio.checked = isSelected;
        radio.addEventListener("change", () => {
          INTERVIEW_STATE.candidateChoices[q.id] = {
            key: opt.label,
            story: opt.candidateLabel || opt.note || "",
          };
          renderInterviewStep();
        });

        const storyText = el("div", "text-sm text-slate-200", opt.candidateLabel || opt.note || "");
        label.appendChild(radio);
        label.appendChild(storyText);
        optWrap.appendChild(label);
      });
      box.appendChild(optWrap);
    } else {
      const optWrap = el("div", "grid md:grid-cols-4 gap-2 mt-3", null);
      q.options.forEach((opt) => {
        const id = `${q.id}_${opt.score}`;
        const isAdminSel = INTERVIEW_STATE.answers[q.id]?.score === opt.score;
        const label = el("label", "border rounded-xl p-2 cursor-pointer transition " + (isAdminSel ? "border-violet-400 bg-violet-600/20 ring-1 ring-violet-400/50" : "border-violet-600/30 bg-dark-800 hover:bg-dark-700 hover:border-violet-600/50"), null);
        const radio = el("input", "mr-2 accent-blue-600", null);
        radio.type = "radio";
        radio.name = q.id;
        radio.value = String(opt.score);
        radio.checked = INTERVIEW_STATE.answers[q.id]?.score === opt.score;
        radio.addEventListener("change", () => {
          INTERVIEW_STATE.answers[q.id] = { score: opt.score, label: opt.label, note: opt.note || "" };
          if (opt.redFlag) INTERVIEW_STATE.autoRedFlag = true;
          setRubricAuto(q.rubricKey, opt.score, opt.note);
          renderInterviewStep();
        });
        const text = el("span", "text-sm font-medium text-slate-200", `${opt.label} (${opt.score})`);
        const hint = el("div", "text-xs text-slate-400 mt-1", opt.note || "");
        label.appendChild(radio);
        label.appendChild(text);
        label.appendChild(hint);
        optWrap.appendChild(label);
      });
      box.appendChild(optWrap);
    }
    card.appendChild(box);
  });

  const stepLabel = document.getElementById("stepLabel");
  if (stepLabel) stepLabel.textContent = `${INTERVIEW_STATE.stepIndex + 1} / ${INTERVIEW_FLOW.length}`;
  const prevBtn = document.getElementById("btnPrevStep");
  if (prevBtn) prevBtn.disabled = INTERVIEW_STATE.stepIndex === 0;
  const nextBtn = document.getElementById("btnNextStep");
  if (nextBtn) {
    nextBtn.textContent = INTERVIEW_STATE.stepIndex === INTERVIEW_FLOW.length - 1 ? "Bitti" : "İleri";
    nextBtn.disabled = !isStepComplete(INTERVIEW_STATE.stepIndex);
  }
  computeInterviewMeta();
}

function validateRequiredFields() {
  // Form fields have the same names in both modes
  const required = [
    { selector: '[name="fullName"]', message: 'Ad Soyad zorunludur.' },
    { selector: '[name="age"]', message: 'Yaş zorunludur.' },
    { selector: '[name="education"]', message: 'Eğitim durumu zorunludur.' },
    { selector: '[name="technicalBackground"]', message: 'Teknik bilgi zorunludur.' },
    { selector: '[name="branch"]', message: 'Şube zorunludur.' },
  ];

  for (const field of required) {
    const element = document.querySelector(field.selector);
    if (!element || !element.value.trim()) {
      // Show alert for candidate mode since saveStatus might not be visible
      if (isCandidateMode()) {
        alert(field.message);
      } else {
        showStatus("saveStatus", "err", field.message);
      }
      if (element) element.focus();
      return false;
    }
  }
  return true;
}

async function showCandidateThankYou() {
  // Validate required fields first
  if (!validateRequiredFields()) {
    return;
  }

  const section = document.getElementById("interviewSection");
  if (!section) return;
  section.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="w-20 h-20 rounded-full bg-emerald-600/20 flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-100 mb-3">Teşekkürler!</h2>
      <p class="text-slate-300 max-w-md mb-2">Tüm soruları başarıyla tamamladın. Cevapların değerlendirme ekibimize iletilecektir.</p>
      <p class="text-slate-400 text-sm mb-8">Bu sayfayı artık kapatabilirsin.</p>
      <a href="index.html" class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 font-medium transition shadow-lg">Anasayfaya Dön</a>
    </div>
  `;

  try {
    const nameInput = document.querySelector('[name="fullName"]');
    const ageInput = document.querySelector('[name="age"]');
    const educationInput = document.querySelector('[name="education"]');
    const technicalInput = document.querySelector('[name="technicalBackground"]');
    const branchInput = document.querySelector('[name="branch"]');
    const evaluatorInput = document.querySelector('[name="evaluator"]');
    
    const idInput = document.querySelector('[name="candidateId"]');
    const candidateId = (idInput ? idInput.value : "").toString().trim() || generateCandidateId();

    const payload = {
      candidateId,
      fullName: nameInput ? nameInput.value.trim() : "Aday",
      age: ageInput ? ageInput.value.trim() : "",
      education: educationInput ? educationInput.value : "",
      technicalBackground: technicalInput ? technicalInput.value : "",
      branch: branchInput ? branchInput.value : "",
      evaluator: evaluatorInput ? evaluatorInput.value.trim() : "Aday",
      interview: {
        mode: "candidate",
        candidateChoices: INTERVIEW_STATE.candidateChoices,
        answers: INTERVIEW_STATE.answers,
        directChecks: INTERVIEW_STATE.directChecks,
        autoRedFlag: INTERVIEW_STATE.autoRedFlag,
      },
      createdAt: new Date().toISOString(),
    };

    const computed = computeCandidateScoresFromInterview(payload.interview);
    payload.phase = "pre_application";
    payload.categoryTotals = computed.totals;
    payload.preQuestionCount = computed.questionCount;
    payload.preMaxScore = computed.maxScore;
    payload.preScoreRaw = computed.totalScore;
    payload.preScorePercent = computed.percent;
    payload.preDecision = computed.decision;
    payload.totalScore = computed.totalScore;
    payload.decision = computed.decision;
    payload.redFlag = computed.redFlag ? "Evet" : "Hayır";

    // Save locally first
    const localSave = saveToLocal(payload);

    let firestoreId = "";
    try {
      firestoreId = await firestoreAddEvaluation(payload);
      if (firestoreId) markLocalSynced(payload, firestoreId);
    } catch (e) {
      console.error("DB yazma hatası:", e);
    }

    if (localSave) {
      console.log("Aday cevapları yerel olarak kaydedildi:", payload.fullName);
    }
  } catch (e) {
    console.error("Aday verisi kaydedilemedi:", e);
  }
}

function bindInterviewNav() {
  const prev = document.getElementById("btnPrevStep");
  const next = document.getElementById("btnNextStep");
  if (prev) {
    prev.addEventListener("click", () => {
      INTERVIEW_STATE.stepIndex = Math.max(0, INTERVIEW_STATE.stepIndex - 1);
      renderInterviewStep();
    });
  }
  if (next) {
    next.addEventListener("click", () => {
      if (!isStepComplete(INTERVIEW_STATE.stepIndex)) {
        return;
      }
      if (isCandidateMode() && INTERVIEW_STATE.stepIndex === INTERVIEW_FLOW.length - 1) {
        showCandidateThankYou();
        return;
      }
      INTERVIEW_STATE.stepIndex = Math.min(INTERVIEW_FLOW.length - 1, INTERVIEW_STATE.stepIndex + 1);
      renderInterviewStep();
    });
  }
}

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (typeof text === "string") e.textContent = text;
  return e;
}

function buildRubric() {
  const container = document.getElementById("rubricContainer");
  if (!container) return;
  container.innerHTML = "";

  for (const section of RUBRIC) {
    const card = el("div", "border border-amber-600/30 rounded-xl p-4 bg-dark-800/50");
    const header = el("div", "flex items-center justify-between gap-3 mb-3");
    header.appendChild(el("h3", "font-semibold text-slate-200", section.title));
    const subtotal = el("div", "text-sm text-slate-400");
    subtotal.innerHTML = `Alt toplam: <span id="sub_${section.key}" class="font-bold text-slate-100">0</span> / 25`;
    header.appendChild(subtotal);
    card.appendChild(header);

    const grid = el("div", "grid md:grid-cols-2 gap-3");

    for (const item of section.items) {
      const row = el("div", "border border-amber-600/30 rounded-lg p-3 bg-dark-800/50");
      row.appendChild(el("div", "text-sm font-medium text-slate-200 mb-2", `${item.key} — ${item.label}`));

      const line = el("div", "grid grid-cols-6 gap-2 items-center");
      const select = el("select", "col-span-1 px-2 py-2 border border-amber-600/30 rounded-lg bg-dark-800 text-sm text-slate-100 score", null);
      select.name = item.key;
      for (let i = 0; i <= 5; i++) {
        const opt = el("option", "", String(i));
        opt.value = String(i);
        select.appendChild(opt);
      }

      const note = el("input", "col-span-5 px-3 py-2 border border-amber-600/30 rounded-lg bg-dark-800 text-sm text-slate-100", null);
      note.name = `${item.key}_note`;
      note.placeholder = "Kanıt/Not (1 cümle)";

      line.appendChild(select);
      line.appendChild(note);
      row.appendChild(line);
      grid.appendChild(row);
    }

    card.appendChild(grid);
    container.appendChild(card);
  }
}

function buildQuestionSet() {
  const container = document.getElementById("questionSet");
  if (!container) return;
  container.innerHTML = "";

  for (const group of QUESTION_SET) {
    const details = el("details", "border rounded-xl p-4 bg-white");
    details.open = group.key === "A";

    const summary = el("summary", "cursor-pointer select-none font-semibold");
    summary.textContent = group.title;
    details.appendChild(summary);

    const list = el("ol", "mt-3 space-y-2 list-decimal pl-5 text-sm text-slate-800");
    for (const q of group.questions) {
      const li = el("li", "", q);
      list.appendChild(li);
    }
    details.appendChild(list);

    container.appendChild(details);
  }
}

function computeScores() {
  const totalNode = document.getElementById("totalScore");
  const decisionNode = document.getElementById("decision");
  if (!totalNode || !decisionNode) {
    return { totals: { A: 0, B: 0, C: 0, D: 0 }, total: 0, decision: "Ele" };
  }

  const totals = { A: 0, B: 0, C: 0, D: 0 };

  for (const section of RUBRIC) {
    for (const item of section.items) {
      const v = document.querySelector(`[name="${item.key}"]`)?.value;
      totals[section.key] += safeInt(v, 0, 5);
    }
  }

  for (const k of Object.keys(totals)) {
    const node = document.getElementById(`sub_${k}`);
    if (node) node.textContent = String(totals[k]);
  }

  const total = totals.A + totals.B + totals.C + totals.D;
  totalNode.textContent = String(total);

  const redFlagEl = document.querySelector('[name="redFlag"]');
  const redFlag = redFlagEl ? redFlagEl.value === "Evet" : false;
  const decision = computeDecision(total, redFlag);
  decisionNode.textContent = decision;
  decisionNode.className = "font-semibold " + (decision.includes("Direkt") ? "text-emerald-700" : decision.includes("Eğitime") ? "text-sky-700" : decision.includes("Riskli") ? "text-amber-700" : decision.includes("Ele") ? "text-rose-700" : "text-slate-900");

  return { totals, total, decision };
}

function computeLiveTotal() {
  const n1 = document.querySelector('[name="live_t1"]');
  const n2 = document.querySelector('[name="live_t2"]');
  const n3 = document.querySelector('[name="live_t3"]');
  const n4 = document.querySelector('[name="live_t4"]');
  const t1 = safeInt(n1 ? n1.value : 0, 0, 10);
  const t2 = safeInt(n2 ? n2.value : 0, 0, 10);
  const t3 = safeInt(n3 ? n3.value : 0, 0, 10);
  const t4 = safeInt(n4 ? n4.value : 0, 0, 5);
  const total = t1 + t2 + t3 + t4;
  const node = document.getElementById("liveTotal");
  if (node) node.textContent = String(total);
  return { t1, t2, t3, t4, total };
}

function computeDecision(total, redFlag) {
  if (redFlag) return "Riskli";
  if (total >= 80) return "Direkt işe al";
  if (total >= 60) return "Eğitime al";
  if (total >= 40) return "Riskli";
  return "Ele";
}

function computeCandidateScoresFromInterview(interview) {
  const choices = interview?.candidateChoices || {};
  const totals = { A: 0, B: 0, C: 0, D: 0 };

  const labelToScore = {
    "Zayıf": 1,
    "Orta": 3,
    "İyi": 4,
    "Çok iyi": 5,
  };

  for (const k of Object.keys(choices)) {
    const picked = choices[k]?.key;
    if (!picked) continue;
    const score = labelToScore[picked] || 0;
    const section = String(k || "").split("_")[0];
    if (totals[section] === undefined) continue;
    totals[section] += score;
  }

  const totalScore = totals.A + totals.B + totals.C + totals.D;
  const questionCount = Object.keys(choices).length;
  const maxScore = questionCount * 5;
  const percent = maxScore ? Math.round((totalScore / maxScore) * 1000) / 10 : 0;
  const redFlag = !!interview?.autoRedFlag;
  const decision = computeDecision(totalScore, redFlag);
  return { totals, totalScore, decision, redFlag, questionCount, maxScore, percent };
}

async function firestoreFindLatestPreApplicationByCandidateId(candidateId) {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) {
    throw new Error("Firebase bağlantısı yok");
  }

  const snap = await fb.db
    .ref("evaluations")
    .orderByChild("candidateId")
    .equalTo(candidateId)
    .limitToLast(50)
    .once("value");

  let best = null;
  snap.forEach((child) => {
    const d = child.val() || {};
    if (d.phase && d.phase !== "pre_application") return;
    if (!best) {
      best = { id: child.key, ...d };
      return;
    }
    const a = best.createdAt ? Date.parse(best.createdAt) : 0;
    const b = d.createdAt ? Date.parse(d.createdAt) : 0;
    if (b >= a) best = { id: child.key, ...d };
  });
  return best;
}

function renderPreApplicationSummary(doc) {
  const status = document.getElementById("preAppStatus");
  const content = document.getElementById("preAppContent");
  if (!status || !content) return;

  if (!doc) {
    status.className = "mt-3 text-sm text-amber-700";
    status.textContent = "Kayıt bulunamadı.";
    content.textContent = "";
    return;
  }

  const percent = doc.preScorePercent ?? doc.pre_percent ?? null;
  const total = doc.preScoreRaw ?? doc.totalScore ?? null;
  const decision = doc.preDecision ?? doc.decision ?? "";

  status.className = "mt-3 text-sm text-emerald-700";
  status.textContent = `Bulundu: ${doc.fullName || ""} (${doc.candidateId || ""})`;

  const lines = [];
  if (percent !== null && percent !== undefined) lines.push(`Ön Başvuru Skoru: %${percent}`);
  if (total !== null && total !== undefined) lines.push(`Ham Puan: ${total}`);
  if (decision) lines.push(`Karar: ${decision}`);
  content.textContent = lines.join(" · ");

  const idInput = document.querySelector('[name="candidateId"]');
  if (idInput) idInput.value = doc.candidateId || idInput.value;
  const nameInput = document.querySelector('[name="fullName"]');
  if (nameInput && doc.fullName) nameInput.value = doc.fullName;
  const ageInput = document.querySelector('[name="age"]');
  if (ageInput && doc.age) ageInput.value = doc.age;
  const eduInput = document.querySelector('[name="education"]');
  if (eduInput && doc.education) eduInput.value = doc.education;
  const techInput = document.querySelector('[name="technicalBackground"]');
  if (techInput && doc.technicalBackground) techInput.value = doc.technicalBackground;
  const branchInput = document.querySelector('[name="branch"]');
  if (branchInput && doc.branch) branchInput.value = doc.branch;

  window.TS_PREAPP = {
    id: doc.id,
    candidateId: doc.candidateId,
    preScorePercent: percent,
    preScoreRaw: total,
  };
}

function generateCandidateId() {
  const dt = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `ADY-${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}-${pad(dt.getHours())}${pad(dt.getMinutes())}${pad(dt.getSeconds())}`;
}

async function firestoreAddEvaluation(payload) {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) {
    throw new Error("Firebase bağlantısı yok");
  }

  const ref = fb.db.ref("evaluations").push();
  await ref.set(payload);
  return ref.key;
}

async function syncLocalToFirestoreOnce() {
  const fb = window.TS_FIREBASE;
  if (!fb || !fb.db) return;

  let data = [];
  try {
    data = loadFromLocal();
  } catch (_) {
    data = [];
  }

  if (!Array.isArray(data) || data.length === 0) return;

  let changed = false;
  for (const item of data) {
    if (!item || item.firestoreId) continue;
    try {
      const ie = 
      console.error("DB senkron hatası:", e);await firestoreAddEvaluation(item);
      item.firestoreId = id;
      item.firestoreSyncedAt = new Date().toISOString();
      changed = true;
    } catch (_) {
    }
  }

  if (changed) {
    try {
      localStorage.setItem('teknikServisDegerlendirme', JSON.stringify(data));
    } catch (_) {
    }
  }
}

function getPayload() {
  const form = document.getElementById("evalForm");
  const fd = new FormData(form);

  const candidateId = (fd.get("candidateId") || "").toString().trim() || generateCandidateId();

  const hasRubric = !!document.getElementById("rubricContainer");
  const hasLive = !!document.getElementById("liveTotal") || !!document.querySelector('[name="live_t1"]');

  const rubricScores = {};
  const rubricNotes = {};
  let totals = { A: 0, B: 0, C: 0, D: 0 };
  let total = 0;
  let decision = "Ele";
  if (hasRubric) {
    for (const section of RUBRIC) {
      for (const item of section.items) {
        rubricScores[item.key] = safeInt(fd.get(item.key), 0, 5);
        rubricNotes[item.key] = (fd.get(`${item.key}_note`) || "").toString().trim();
      }
    }
    const computed = computeScores();
    totals = computed.totals;
    total = computed.total;
    decision = computed.decision;
  }

  const live = hasLive ? computeLiveTotal() : { t1: 0, t2: 0, t3: 0, t4: 0, total: 0 };

  return {
    candidateId,
    fullName: (fd.get("fullName") || "").toString().trim(),
    age: (fd.get("age") || "").toString().trim(),
    education: (fd.get("education") || "").toString(),
    technicalBackground: (fd.get("technicalBackground") || "").toString(),
    evaluator: (fd.get("evaluator") || "").toString().trim(),
    branch: (fd.get("branch") || "").toString().trim(),
    term: (fd.get("term") || "").toString().trim(),
    redFlag: (fd.get("redFlag") || "Hayır").toString(),
    generalNote: (fd.get("generalNote") || "").toString().trim(),
    scores: rubricScores,
    scoreNotes: rubricNotes,
    categoryTotals: totals,
    totalScore: total,
    decision,
    live,
    interview: {
      mode: isCandidateMode() ? "candidate" : "admin",
      answers: INTERVIEW_STATE.answers,
      candidateChoices: INTERVIEW_STATE.candidateChoices,
      directChecks: INTERVIEW_STATE.directChecks,
      autoRedFlag: INTERVIEW_STATE.autoRedFlag,
    },
    createdAt: new Date().toISOString(),
  };
}

function saveToLocal(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('teknikServisDegerlendirme') || '[]');
    existing.push(data);
    localStorage.setItem('teknikServisDegerlendirme', JSON.stringify(existing));
    return true;
  } catch (e) {
    console.error('Local storage save error:', e);
    return false;
  }
}

function markLocalSynced(payload, firestoreId) {
  try {
    const data = loadFromLocal();
    for (let i = data.length - 1; i >= 0; i--) {
      const item = data[i];
      if (!item || item.firestoreId) continue;
      if (item.candidateId === payload.candidateId && item.createdAt === payload.createdAt) {
        item.firestoreId = firestoreId;
        item.firestoreSyncedAt = new Date().toISOString();
        localStorage.setItem('teknikServisDegerlendirme', JSON.stringify(data));
        break;
      }
    }
  } catch (_) {
  }
}

function loadFromLocal() {
  try {
    return JSON.parse(localStorage.getItem('teknikServisDegerlendirme') || '[]');
  } catch (e) {
    console.error('Local storage load error:', e);
    return [];
  }
}

function clearLocalData() {
  localStorage.removeItem('teknikServisDegerlendirme');
}

function exportLocal() {
  const data = loadFromLocal();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `degerlendirme_verileri_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showStatus(nodeId, type, message) {
  const node = document.getElementById(nodeId);
  if (!node) return;
  const cls = type === "ok" ? "text-emerald-700" : type === "warn" ? "text-amber-700" : "text-rose-700";
  node.className = `mt-2 ${cls}`;
  node.textContent = message;
}

function bindEvents() {
  document.addEventListener("input", (e) => {
    if (e.target?.classList?.contains("score") || e.target?.classList?.contains("live") || e.target?.name === "redFlag") {
      computeScores();
      computeLiveTotal();
    }
  });

  const btnReset = document.getElementById("btnReset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      document.getElementById("evalForm").reset();
      INTERVIEW_STATE.stepIndex = 0;
      INTERVIEW_STATE.answers = {};
      INTERVIEW_STATE.candidateChoices = {};
      INTERVIEW_STATE.directChecks = {};
      INTERVIEW_STATE.autoFilled = {};
      INTERVIEW_STATE.autoRedFlag = false;
      renderInterviewStep();
      computeScores();
      computeLiveTotal();
      showStatus("saveStatus", "ok", "Form temizlendi.");
    });
  }

  const btnExportLocal = document.getElementById("btnExportLocal");
  if (btnExportLocal) btnExportLocal.addEventListener("click", exportLocal);

  const btnClearLocal = document.getElementById("btnClearLocal");
  if (btnClearLocal) {
    btnClearLocal.addEventListener("click", () => {
      if (confirm("Tüm yerel verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
        clearLocalData();
        showStatus("saveStatus", "ok", "Yerel veri temizlendi.");
      }
    });
  }

  document.getElementById("evalForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isCandidateMode()) {
      if (!isStepComplete(INTERVIEW_STATE.stepIndex) || INTERVIEW_STATE.stepIndex !== INTERVIEW_FLOW.length - 1) {
        showStatus("saveStatus", "warn", "Lütfen tüm soruları tamamlayın.");
        return;
      }
      showCandidateThankYou();
      return;
    }

    // Validate required fields
    if (!validateRequiredFields()) {
      return;
    }

    const payload = getPayload();
    if (!payload.fullName) {
      showStatus("saveStatus", "err", "Ad Soyad zorunlu.");
      return;
    }

    // Always save locally first
    const localSave = saveToLocal(payload);
    if (localSave) {
      showStatus("saveStatus", "warn", "Yerel kayıt başarılı. DB kaydı yapılıyor...");
    } else {
      showStatus("saveStatus", "warn", "Yerel kayıt başarısız. DB kaydı yapılıyor...");
    }

    let firestoreOk = false;
    let firestoreId = "";
    try {
      firestoreId = await firestoreAddEvaluation(payload);
      firestoreOk = true;
      if (firestoreId) markLocalSynced(payload, firestoreId);
    } catch (err) {
      firestoreOk = false;
    }

    if (firestoreOk) {
      showStatus("saveStatus", "ok", `DB kaydedildi. Kayıt ID: ${firestoreId || "-"} (Yerel kopya mevcut)`);
      document.querySelector('[name="candidateId"]').value = payload.candidateId;
    } else {
      showStatus("saveStatus", "warn", "DB kaydı başarısız. Sadece yerel kayıt mevcut.");
    }
  });
}

(function main() {
  applyModeUI();
  buildRubric();
  buildQuestionSet();
  bindInterviewNav();
  renderInterviewStep();
  bindEvents();
  computeScores();
  computeLiveTotal();
  syncLocalToFirestoreOnce();
})();
