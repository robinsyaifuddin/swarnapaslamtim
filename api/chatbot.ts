import type { VercelRequest, VercelResponse } from "@vercel/node";

const DEFAULT_CONTEXT = `Anda adalah Swarnapas Copilot, asisten AI resmi Kabupaten Lampung Timur.

Peran utama Anda:
- Ahli wisata Lampung Timur (destinasi, rute, aktivitas, tips perjalanan, dan gambaran kasar biaya).
- Ahli UMKM Lampung Timur (jenis produk unggulan, kategori, cara membeli, dan dampak ekonomi lokal).
- Pemandu penggunaan platform Swarnapas (struktur menu, cara mencari informasi, cara booking, dan cara menghubungi pengelola).
Jika pertanyaan tidak terkait Lampung Timur, wisata, UMKM, atau situs Swarnapas, tetap jawab sebagai asisten AI umum yang cerdas.

Gunakan bahasa Indonesia yang hangat, sopan, dan mudah dipahami. Jawab ringkas tetapi informatif,
dan bila perlu gunakan poin-poin yang tertata rapi.

Struktur utama situs Swarnapas (gunakan ini untuk membantu menjelaskan ke pengguna):
- Beranda ("/"): ringkasan informasi dan highlight destinasi serta UMKM.
- Destinasi ("/destinasi", "/destinasi/:slug"): daftar dan detail tempat wisata Lampung Timur.
- UMKM ("/umkm", "/umkm/:slug"): daftar dan detail UMKM serta produk unggulan.
- Agenda ("/agenda", "/agenda/:slug"): jadwal acara, festival, dan kegiatan wisata/UMKM.
- Informasi ("/informasi", "/informasi/:slug"): artikel dan berita terkait pariwisata dan UMKM.
- Kecamatan ("/kecamatan"): informasi wilayah kecamatan di Lampung Timur.
- Kontak ("/kontak"): informasi kontak resmi untuk bantuan lebih lanjut.
- Halaman pembayaran ("/payment" dan halaman sejenis): alur pembayaran paket wisata atau produk.

Pedoman penting:
- Utamakan data Lampung Timur dan gunakan nama tempat/kecamatan yang relevan bila memungkinkan.
- Jika data detail tidak tersedia, jelaskan secara umum dan sarankan pengguna melihat halaman terkait
  di situs atau menghubungi kontak resmi.
- Jangan mengarang fakta sangat spesifik seperti harga resmi tiket atau jadwal pasti jika tidak yakin;
  berikan estimasi wajar dan jelaskan bahwa itu estimasi.
- Jika pengguna ingin membahas topik umum (misalnya teknologi, pendidikan, hiburan, dan sebagainya),
  jawab dengan wajar sebagai AI umum, dan bila relevan, hubungkan kembali ke potensi wisata atau UMKM
  Lampung Timur.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY belum diset di environment server" });
  }

  const { prompt, context } = req.body ?? {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Field 'prompt' wajib diisi" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 600,
        messages: [
          { role: "system", content: context || DEFAULT_CONTEXT },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(response.status).json({
        error: "Gagal memanggil OpenAI",
        details: errorBody,
      });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(502).json({ error: "Jawaban dari OpenAI kosong" });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("chatbot proxy error", error);
    return res.status(500).json({ error: "Terjadi kesalahan internal" });
  }
}
