"use client";

import { useEffect, useState } from "react";
import { FaPassport, FaMoon, FaSun } from "react-icons/fa6";
import visaData from "@/lib/visaData";
import countryMeta from "@/lib/countryMeta";
import Link from "next/link";

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

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background",
      dark ? "#0a0a0a" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--foreground",
      dark ? "#ededed" : "#171717"
    );
    document.documentElement.style.setProperty(
      "--card-bg",
      dark ? "#1b1b1b" : "#f9f9f9"
    );
  }, [dark]);

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
    <main className="min-h-dvh flex flex-col justify-between px-4 py-6 sm:py-8">
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto px-2 sm:px-4 sm:py-2">
        <Link href="https://www.wandertools.online/">
          <FaPassport className="text-2xl sm:text-3xl text-indigo-500" />
        </Link>
        <button
          onClick={() => setDark(!dark)}
          className="text-foreground hover:opacity-80 transition cursor-pointer"
        >
          {dark ? (
            <FaSun size={32} className="h-6 w-6 sm:h-8 sm:w-8" />
          ) : (
            <FaMoon size={32} className="h-6 w-6 sm:h-8 sm:w-8" />
          )}
        </button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center px-2">
        <h1 className="text-3xl font-bold mt-6">WanderVisa</h1>
        <h2
          className={`text-xl font-medium mb-10 ${
            dark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Visa Checker
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-0.5">
              Your Passport Country
            </label>
            <select
              value={passportCountry}
              onChange={(e) => setPassportCountry(e.target.value)}
              className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                dark
                  ? "bg-neutral-900 text-white border-neutral-700"
                  : "bg-neutral-100 text-black border-neutral-300"
              }`}
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
              className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                dark
                  ? "bg-neutral-900 text-white border-neutral-700"
                  : "bg-neutral-100 text-black border-neutral-300"
              }`}
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
            className="w-full bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700"
          >
            Check Visa Requirement
          </button>
        </form>

        {result && (
          <div
            className={`mt-8 border p-4 rounded-xl w-full max-w-md shadow-md ${
              dark
                ? "bg-neutral-900 text-white border-neutral-600"
                : "bg-neutral-100 text-black border-neutral-400"
            }`}
          >
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
      </div>

      <footer className="flex justify-between items-center text-xs text-neutral-500 px-4 max-w-7xl mx-auto w-full mt-8">
        <span>© {new Date().getFullYear()} WanderTools.</span>
        <Link
          href="https://instagram.com/ad.fgrd"
          target="_blank"
          className="underline hover:opacity-80"
        >
          Contact
        </Link>
      </footer>
    </main>
  );
}
