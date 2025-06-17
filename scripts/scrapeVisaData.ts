import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import countryMeta from "../lib/countryMeta";

const BASE_URL = "https://en.wikipedia.org/wiki/Visa_requirements_for_";
const passportCountries = [
  "France",
  "Italy",
  "Lebanon",
  "Singapore",
  "United States",
];

async function scrapeCountry(passportCountry: string) {
  const slug =
    countryMeta[passportCountry as keyof typeof countryMeta]?.slug ||
    `${passportCountry.replace(/ /g, "_")}_citizens`;
  const url = BASE_URL + slug;

  console.log(`🔍 Fetching ${url}`);
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // TODO: replace any type with actual type
  let targetTable: any | null = null;

  $("table.wikitable").each((_, table) => {
    const headers = $(table)
      .find("th")
      .map((_, th) => $(th).text().trim().toLowerCase())
      .get();

    if (headers[0]?.includes("country") && headers[1]?.includes("visa")) {
      targetTable = $(table);
      return false;
    }
  });

  if (!targetTable) {
    console.warn(`⚠️ No visa table found for ${passportCountry}`);
    return [];
  }

  const results: {
    passport_country: string;
    destination_country: string;
    visa_requirement: string;
    notes: string;
  }[] = [];

  // TODO: replace any types with actual types
  targetTable.find("tbody tr").each((_: any, row: any) => {
    const cells = $(row).find("td");
    if (cells.length < 2) return;

    const destination = $(cells[0])
      .text()
      .trim()
      .replace(/\[.*?\]/g, "");
    const requirement = $(cells[1])
      .text()
      .trim()
      .replace(/\[.*?\]/g, "");
    const notes = cells[2]
      ? $(cells[2])
          .text()
          .trim()
          .replace(/\[.*?\]/g, "")
      : "";

    if (destination && requirement) {
      results.push({
        passport_country: passportCountry,
        destination_country: destination,
        visa_requirement: requirement,
        notes,
      });
    }
  });

  return results;
}

(async () => {
  const allData = [];

  for (const country of passportCountries) {
    console.log(`⏳ Scraping ${country}...`);
    const data = await scrapeCountry(country);
    allData.push(...data);
  }

  fs.writeFileSync(
    "./lib/visaData.ts",
    `const visaData = ${JSON.stringify(
      allData,
      null,
      2
    )};\n\nexport default visaData;`
  );

  console.log("✅ visaData.ts generated.");
})();
