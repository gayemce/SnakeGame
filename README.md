# Yılan Oyunu

## Proje Genel Bakış
Bu proje, klasik bir Yılan oyunudur. Oyuncu, bir yılanı kontrol eder ve yılanın boyutunu büyütüp skorunu artırmak için ekranda rastgele yerleştirilen elmaları toplamaya çalışır. Oyunda, yılanın kendisine çarpmadan devam etmesi gerekir. Ayrıca, belirli bir skora ulaşıldığında ödül olarak görünen hamburgerlerin toplanması skoru daha da artırır.

## Oyun Elementleri
- **Yılan**: Oyuncunun kontrol ettiği ana karakterdir. Boyutu ve uzunluğu arttıkça puan kazanılır.
- **Elma**: Rastgele konumlara yerleştirilmiş elmaları yemek yılanın boyutunu artırır ve puan kazandırır.
- **Hamburger**: Belirli bir skora ulaşıldığında belirli süreliğine görünen ve ekstra puan kazandıran özel bir ödüldür.

## Skorlama
- Elma yeme: 10 puan
- Hamburger yeme: 15 puan
- Her elma yedikten sonra yılanın boyutu 1 artar.

## Oyun Kontrolleri
- **Yukarı Ok**: Yılanı yukarı hareket ettirir.
- **Aşağı Ok**: Yılanı aşağı hareket ettirir.
- **Sol Ok**: Yılanı sola hareket ettirir.
- **Sağ Ok**: Yılanı sağa hareket ettirir.

## Oyunun Sonlanması
Oyun, yılanın kendisine çarpması durumunda sona erer. Oyunun sona erdiğine dair bir bildirim gösterilir ve oyun başlangıç pozisyonuna dönerek tekrar oynanabilir.

## Oyunun Geliştirilmesi ve Değiştirilmesi
Bu oyun, JavaScript ve HTML5 Canvas kullanılarak geliştirilmiştir. Oyunun kurallarını, görünümünü veya davranışlarını değiştirmek için `snake.js` dosyasındaki kodu düzenleyebilir ve özelleştirebilirsiniz.
