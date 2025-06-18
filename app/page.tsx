"use client";

import { useState } from "react";
import visaData from "@/lib/visaData";
import countryMeta from "@/lib/countryMeta";

const getVisaEmoji = (requirement: string) => {
  const r = requirement.toLowerCase();

  if (
    r.includes("e-visa") ||
    r.includes("evisa") ||
    r.includes("electronic visa")
  )
    return "💻";
  if (
    r.includes("electronic travel authorisation") ||
    r.includes("electronic travel authority") ||
    r.includes("eta")
  )
    return "🌐";
  if (r.includes("freedom")) return "🆓";
  if (r.includes("visa not required")) return "✅";
  if (r.includes("visa on arrival")) return "🛬";
  if (r.includes("visa required")) return "❌";
  if (r.includes("permit")) return "📄";
  if (r.includes("restricted")) return "⛔";

  return "❓";
};

const getNotesEmoji = (notes: string) => {
  const r = notes.toLowerCase();
  if (r.includes("days") || r.includes("month") || r.includes("months"))
    return "⏳";
  return "";
};

export default function Home() {
  const [passportCountry, setPassportCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [result, setResult] = useState<{
    passport_country: string;
    destination_country: string;
    visa_requirement: string;
    notes: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = visaData.find(
      (v) =>
        v.passport_country === passportCountry &&
        v.destination_country === destinationCountry
    );
    setResult(
      entry || {
        passport_country: passportCountry,
        destination_country: destinationCountry,
        visa_requirement: "Data not found",
        notes: "",
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold">WanderVisa</h1>
      <h1 className="text-xl font-medium mb-10 text-gray-400">Visa Checker</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-0.5">
            Your Passport Country
          </label>
          <select
            value={passportCountry}
            onChange={(e) => setPassportCountry(e.target.value)}
            className="w-full p-2 bg-[#1a1a1a] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Country</option>
            {[...new Set(visaData.map((d) => d.passport_country))].map(
              (country) => (
                <option key={country} value={country}>
                  {countryMeta[country as keyof typeof countryMeta]?.emoji ||
                    ""}{" "}
                  {country}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5">
            Destination Country
          </label>
          <select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            className="w-full p-2 bg-[#1a1a1a] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Country</option>
            {[...new Set(visaData.map((d) => d.destination_country))]
              .sort((a, b) => a.localeCompare(b))
              .map((country) => (
                <option key={country} value={country}>
                  {countryMeta[country as keyof typeof countryMeta]?.emoji ||
                    ""}{" "}
                  {country}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Check Visa Requirement
        </button>
      </form>

      {result && (
        <div className="mt-8 border p-4 rounded w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <p>
            <strong>Visa Requirement:</strong>{" "}
            {getVisaEmoji(result.visa_requirement)} {result.visa_requirement}
          </p>
          {result.notes && (
            <p>
              <strong>Allowed Stay:</strong> {getNotesEmoji(result.notes)}{" "}
              {result.notes}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
