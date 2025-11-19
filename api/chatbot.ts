import type { VercelRequest, VercelResponse } from "@vercel/node";

const DEFAULT_CONTEXT = `Anda adalah Swarnapas Copilot, asisten AI resmi Kabupaten Lampung Timur.
Fokus menjawab dengan data wisata, UMKM, agenda, dan potensi daerah.
Gunakan bahasa Indonesia yang ramah dan ringkas. Jika tidak tahu, sarankan pengguna
untuk menghubungi Dinas Pariwisata Lampung Timur.`;

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
