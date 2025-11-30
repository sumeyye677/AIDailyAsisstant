# AI Günlük Asistanım 📝

Kullanıcının yazdığı cümleleri AI ile analiz eden ve duygu durumuna göre öneriler sunan mobil uygulama.

## 🎯 Proje Özeti

Bu uygulama, kullanıcıların günlük duygularını yazmasına ve AI tarafından analiz edilmesine olanak tanır. Uygulama:
- Duygu analizi yapar (pozitif/nötr/negatif)
- Basit özet sunar
- Kişiselleştirilmiş öneriler verir
- Tüm kayıtları lokal olarak saklar
- Haftalık özet gösterir

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler
- ✍️ Günlük girdi ekranı
- 🤖 AI duygu analizi (Hugging Face API)
- 📚 Geçmiş kayıtlar ekranı
- 💾 Lokal veri saklama (AsyncStorage)
- 📊 Haftalık özet istatistikleri
- 🎨 Duygu durumuna göre renk değişimi
- 📱 Offline çalışma desteği

## 🛠️ Teknolojiler

| Kategori | Teknoloji |
|----------|-----------|
| Mobil Platform | React Native CLI (TypeScript) |
| State Yönetimi | Context API |
| AI Entegrasyonu | Hugging Face (distilbert-base-uncased-finetuned-sst-2-english) |
| Veri Saklama | AsyncStorage |
| UI Kütüphanesi | React Native Paper |
| Navigasyon | React Navigation |

## 📦 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- React Native CLI
- Android Studio (Android için) veya Xcode (iOS için)
- Java JDK 17

### Adımlar

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd AIGunlukAsistani
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. iOS için (sadece macOS):
```bash
cd ios && pod install && cd ..
```

4. Uygulamayı çalıştırın:

Android için:
```bash
npx react-native run-android
```

iOS için:
```bash
npx react-native run-ios
```

## 🤖 AI Modeli Hakkında

### Kullanılan Model
**cardiffnlp/twitter-roberta-base-sentiment-latest**

- **Platform**: Hugging Face Inference API
- **Maliyet**: Ücretsiz (API token gerekli)
- **Görev**: Sentiment Analysis (Duygu Analizi)
- **Çıktılar**: positive, neutral, negative

### API Kurulumu
1. [Hugging Face](https://huggingface.co/join) hesabı oluşturun
2. Settings → Access Tokens → New Token (Read) oluşturun
3. `src/services/aiService.ts` dosyasında `HF_TOKEN` değişkenine token'ınızı ekleyin

### Fallback Mekanizması
API çalışmazsa uygulama otomatik olarak lokal keyword-based analiz yapar.

## 📱 Ekran Görüntüleri
<img width="362" height="785" alt="image" src="https://github.com/user-attachments/assets/793c5af5-7587-4b0c-bf3d-3f7db29da12a" />


<img width="369" height="797" alt="image" src="https://github.com/user-attachments/assets/0087cdfe-9c3c-49f4-a079-4a5c75c86556" />

### Ana Ekran (Günlük)
- Kullanıcı duygularını yazar
- "Analiz Et" butonuna tıklar
- AI analiz sonucunu görür
- Sonuç otomatik olarak kaydedilir

### Geçmiş Ekran
- Tüm kayıtlar listelenir
- Her kayıt duygu durumuna göre renklendirilir
- Haftalık özet istatistikleri gösterilir
- Offline erişim mevcut

## 🎨 Duygu Renkleri

- 😊 **Pozitif**: Altın sarısı (#FFD700)
- 😐 **Nötr**: Açık mavi (#87CEEB)
- 😔 **Negatif**: Gri (#B0B0B0)

## 📂 Proje Yapısı

```
AIGunlukAsistani/
├── src/
│   ├── components/      # UI bileşenleri
│   │   └── EntryCard.tsx
│   ├── context/         # Context API
│   │   └── EntriesContext.tsx
│   ├── screens/         # Ekranlar
│   │   ├── HomeScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── services/        # API ve Storage servisleri
│   │   ├── aiService.ts
│   │   └── storageService.ts
│   ├── types/           # TypeScript tipleri
│   │   └── index.ts
│   └── utils/           # Yardımcı fonksiyonlar
│       └── helpers.ts
├── App.tsx              # Ana uygulama
└── package.json
```

### Offline Çalışma
- Tüm veriler AsyncStorage'da saklanır
- İnternet bağlantısı sadece yeni analiz için gereklidir
- Geçmiş kayıtlar her zaman erişilebilir

### Gelecek Geliştirmeler
- [ ] Grafik ve trend analizi
- [ ] Bildirim sistemi
- [ ] Tema değiştirme (dark mode)
- [ ] Veri dışa aktarma
- [ ] Çoklu dil desteği

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👨‍💻 Geliştirici

Stajyer Projesi - 3 Günlük Mini Proje

---

## 🤖 AI Araç Kullanımı

Bu proje **Kiro AI** asistanı ile birlikte geliştirilmiştir. Kod yazımı, hata ayıklama ve dokümantasyon süreçlerinde AI desteği alınmıştır.

---

**Not**: Uygulama ücretsiz servisler kullanmaktadır. Hugging Face API token'ı gereklidir.
