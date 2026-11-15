"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { suggestedVehicle, vehiclesForGroupSize } from "@/data/vehicles";
import { waLink } from "@/lib/whatsapp";

/**
 * Quick transfer request: pickup, drop-off, date and passengers produce a
 * suggested vehicle and a pre-filled WhatsApp message via waLink.
 */
export default function TransferQuickRequest() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(2);

  const suggested = suggestedVehicle(passengers);
  const fitting = vehiclesForGroupSize(passengers);

  const message = useMemo(() => {
    return [
      "Hi Syren, I'd like a private transfer.",
      from ? `From: ${from}` : null,
      to ? `To: ${to}` : null,
      date ? `Date: ${date}` : null,
      `Passengers: ${passengers}`,
      suggested ? `Suggested vehicle: ${suggested.name}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }, [from, to, date, passengers, suggested]);

  const fieldClass =
    "w-full rounded-xl border border-accent-gold/30 bg-background px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent-gold";

  return (
    <div className="rounded-3xl border border-accent-gold/25 bg-surface/30 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="transfer-from" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            From
          </label>
          <input
            id="transfer-from"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="e.g. Cairo Airport (CAI)"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="transfer-to" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            To
          </label>
          <input
            id="transfer-to"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="e.g. Giza hotel"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="transfer-date" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            Date
          </label>
          <input
            id="transfer-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            Passengers
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPassengers((n) => Math.max(1, n - 1))}
              aria-label="Fewer passengers"
              className="rounded-lg border border-accent-gold/30 p-3 text-text-primary transition-colors hover:border-accent-gold"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-serif text-xl text-text-primary">
              {passengers}
            </span>
            <button
              type="button"
              onClick={() => setPassengers((n) => Math.min(20, n + 1))}
              aria-label="More passengers"
              className="rounded-lg border border-accent-gold/30 p-3 text-text-primary transition-colors hover:border-accent-gold"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-accent-gold/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          {suggested ? (
            <>
              Suggested vehicle:{" "}
              <span className="text-text-primary">
                {fitting.map((v) => v.name).join(" / ")}
              </span>
            </>
          ) : (
            "Groups larger than 14: we'll arrange a coordinated convoy."
          )}
        </p>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="syren-btn shrink-0 justify-center"
        >
          Send request on WhatsApp
        </a>
      </div>
      <p className="mt-4 text-xs text-text-secondary">
        Fixed price quoted before you confirm.
      </p>
    </div>
  );
}
