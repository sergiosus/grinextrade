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
      outFile: path.join(outDir, "orings.jpg"),
      prompt:
        "Macro product photo: several different types black rubber O-rings (gaskets) arranged on a clean light background, studio lighting, sharp detail, no hands, no tools, no text, no logos, realistic.",
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