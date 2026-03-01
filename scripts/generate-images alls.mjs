import fs from "fs";
import path from "path";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeBase64Image(filePath, base64) {
  const buf = Buffer.from(base64, "base64");
  fs.writeFileSync(filePath, buf);
}

async function generateOne({ outFile, prompt }) {
  console.log(`\nGenerating: ${outFile}`);
  const res = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    // Важно: сайт у тебя ждёт JPG/1536x1024
    size: "1536x1024",
    // некоторые SDK по умолчанию возвращают base64; для GPT Image обычно это b64_json
    // если у тебя другая версия SDK, см. ниже "Если упадёт с ошибкой"
  });

  const b64 = res.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error(
      `No b64_json returned. Got keys: ${Object.keys(res || {}).join(", ")}`
    );
  }

  writeBase64Image(outFile, b64);
  const stats = fs.statSync(outFile);
  console.log(`OK: ${outFile} (${Math.round(stats.size / 1024)} KB)`);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENAI_API_KEY is not set");
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), "public", "images");
  ensureDir(outDir);

  // Промпты сделаны так, чтобы получались "каталожные" изображения (как для карточек)
  // и чтобы модель не уходила в левые сюжеты.
  const jobs = [
    {
      outFile: path.join(outDir, "waffle-towels.jpg"),
      prompt:
        "Product photo, studio lighting: a neat stack of white waffle weave towels, clean minimal background (light grey/white), sharp focus, no people, no text, no logos, e-commerce style, realistic.",
    },
    {
      outFile: path.join(outDir, "bed-linen.jpg"),
      prompt:
        "Hotel bed linen product photo: neatly made hotel bed with crisp white sheets and duvet cover, minimal modern hotel room, soft natural light, no people, no text, no logos, realistic, e-commerce style.",
    },
    {
      outFile: path.join(outDir, "textile.jpg"),
      prompt:
        "Studio product photo: stack of clean white waffle towels and folded hotel towels, minimal light background, sharp focus, no people, no tools, no text, no logos, realistic e-commerce     catalog style."
    },
    {
      outFile: path.join(outDir, "contact.jpg"),
      prompt:
        "Contact page hero image for an export trading company: clean modern business desk with laptop, documents, world map or subtle logistics elements, soft neutral lighting, minimal background, no people, no text, no logos, realistic, corporate style."
    },
    {
      outFile: path.join(outDir, "hero-export.jpg"),
      prompt:
        "Wide hero banner image for an international export trading company website: modern port logistics scene with cargo containers, ship or cranes in the background, subtle global trade vibe, clean corporate look, soft natural light, slightly blurred background, no people close-up, no text, no logos, realistic photography style."
    },
    {
      outFile: path.join(outDir, "orings.jpg"),
      prompt:
        "Macro product photo: several black rubber O-rings (gaskets) arranged on a clean light background, studio lighting, sharp detail, no hands, no tools, no text, no logos, realistic.",
    },
    {
      outFile: path.join(outDir, "seals.jpg"),
      prompt:
        "Product photo: industrial mechanical seals and gaskets arranged neatly on a clean light background, studio lighting, sharp focus, no hands, no text, no logos, realistic catalog style.",
    },
  ];

  for (const job of jobs) {
    await generateOne(job);
  }

  console.log("\nDone. Images saved to public/images/");
}

main().catch((e) => {
  console.error("FAILED:", e?.message || e);
  process.exit(1);
});