"use client";

import { useState } from "react";
import visaData from "@/lib/visaData";
import countryMeta from "@/lib/countryMeta";

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
      <h1 className="text-3xl font-bold mb-4">WanderVisa – Visa Checker</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">
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
          <label className="block text-sm font-medium">
            Destination Country
          </label>
          <select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            className="w-full p-2 bg-[#1a1a1a] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Country</option>
            {[...new Set(visaData.map((d) => d.destination_country))].map(
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
            <strong>Status:</strong> {result.visa_requirement}
          </p>
          {result.notes && (
            <p>
              <strong>Notes:</strong> {result.notes}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
