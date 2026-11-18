"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Users, Luggage, Minus, Plus } from "lucide-react";
import { vehicles, vehiclesForGroupSize, type Vehicle } from "@/data/vehicles";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type VehicleSelectorVariant = "full" | "compact" | "band";

interface VehicleSelectorProps {
  variant?: VehicleSelectorVariant;
  className?: string;
  /** Heading shown above the band variant. */
  heading?: string;
  /** Initial group size. */
  defaultGroupSize?: number;
  /** Extra context appended to the WhatsApp message, e.g. the event name. */
  contextLabel?: string;
}

function GroupSizeControl({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
        Passengers
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Fewer passengers"
          className="p-2 rounded-lg border border-accent-gold/30 text-text-primary hover:border-accent-gold transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="font-serif text-lg text-text-primary w-8 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(20, value + 1))}
          aria-label="More passengers"
          className="p-2 rounded-lg border border-accent-gold/30 text-text-primary hover:border-accent-gold transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function VehicleThumb({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative h-16 w-24">
        <Image
          src={vehicle.smallImage}
          alt={`${vehicle.name} exterior view`}
          fill
          sizes="96px"
          className="object-contain"
        />
      </div>
      <div className="text-sm text-text-primary">{vehicle.name}</div>
      <div className="flex items-center gap-3 text-[11px] text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <Users size={12} className="text-accent-gold-ink" aria-hidden /> {vehicle.passengers}
        </span>
        <span className="inline-flex items-center gap-1">
          <Luggage size={12} className="text-accent-gold-ink" aria-hidden /> {vehicle.bags}
        </span>
      </div>
    </div>
  );
}

export default function VehicleSelector({
  variant = "full",
  className,
  heading,
  defaultGroupSize = 2,
  contextLabel,
}: VehicleSelectorProps) {
  const [groupSize, setGroupSize] = useState(defaultGroupSize);
  const [activeId, setActiveId] = useState(vehicles[0].id);
  const [animating, setAnimating] = useState(false);

  const fitting = useMemo(() => vehiclesForGroupSize(groupSize), [groupSize]);
  const fittingIds = useMemo(() => new Set(fitting.map((v) => v.id)), [fitting]);
  const active = vehicles.find((v) => v.id === activeId) ?? vehicles[0];

  const waHref = (vehicle: Vehicle) =>
    waLink(
      `Hi Syren, I'd like a private ${vehicle.name} transfer${
        contextLabel ? ` for ${contextLabel}` : " in Egypt"
      } for ${groupSize} passenger${groupSize > 1 ? "s" : ""}.`
    );

  const selectVehicle = (vehicle: Vehicle) => {
    if (vehicle.id === activeId) return;
    setAnimating(true);
    window.setTimeout(() => {
      setActiveId(vehicle.id);
      setAnimating(false);
    }, 150);
  };

  // ---- BAND ---------------------------------------------------------------
  if (variant === "band") {
    const suggested = fitting.length > 0 ? fitting.slice(0, 3) : [vehicles[vehicles.length - 1]];
    return (
      <div className={cn("rounded-2xl border border-accent-gold/20 bg-surface/30 p-5 md:p-6", className)}>
        {heading && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent-gold-ink">{heading}</p>
        )}
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-end gap-6">
            {suggested.map((v) => (
              <VehicleThumb key={v.id} vehicle={v} />
            ))}
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <GroupSizeControl value={groupSize} onChange={setGroupSize} />
            <a
              href={waHref(suggested[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="syren-btn text-sm"
            >
              Request this transfer
            </a>
          </div>
        </div>
        {fitting.length === 0 && (
          <p className="mt-3 text-xs text-text-secondary">
            Groups larger than 14: message us and we&apos;ll arrange a coordinated convoy.
          </p>
        )}
      </div>
    );
  }

  // ---- COMPACT ------------------------------------------------------------
  if (variant === "compact") {
    return (
      <div className={cn("mt-6", className)}>
        <GroupSizeControl value={groupSize} onChange={setGroupSize} className="mb-3" />
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => setActiveId(vehicle.id)}
              className={cn(
                "flex-shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                active.id === vehicle.id
                  ? "border-accent-gold bg-accent-gold/10 text-accent-gold-ink"
                  : "border-border text-text-secondary hover:text-text-primary",
                fittingIds.has(vehicle.id) && active.id !== vehicle.id && "border-accent-gold/40"
              )}
            >
              {vehicle.name}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold text-text-primary">{active.name}</div>
                <div className="text-xs text-text-secondary">{active.vehicleClass}</div>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Users size={16} className="text-accent-gold-ink" aria-hidden /> {active.passengers}
                </span>
                <span className="flex items-center gap-1">
                  <Luggage size={16} className="text-accent-gold-ink" aria-hidden /> {active.bags}
                </span>
              </div>
            </div>
            <a
              href={waHref(active)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent-gold-ink hover:underline"
            >
              Request →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---- FULL ---------------------------------------------------------------
  return (
    <div className={cn("", className)}>
      <div className="mb-8 flex justify-center">
        <GroupSizeControl value={groupSize} onChange={setGroupSize} />
      </div>

      <div className="mb-12">
        <div className="flex justify-center gap-8 overflow-x-auto border-b border-border pb-0 md:gap-12 scrollbar-hide">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => selectVehicle(vehicle)}
              className={cn(
                "relative flex-shrink-0 border-b-2 pb-4 text-sm font-medium uppercase tracking-widest transition-all",
                active.id === vehicle.id
                  ? "border-accent-gold font-semibold text-accent-gold-ink"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {fittingIds.has(vehicle.id) && (
                <span className="absolute -top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-gold" />
              )}
              {vehicle.name}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("transition-opacity duration-300", animating ? "opacity-0" : "opacity-100")}>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center rounded-full border border-accent-gold/20 bg-accent-gold/10 px-4 py-1.5 text-xs text-accent-gold-ink">
              {active.badge || active.vehicleClass}
            </div>

            <h3 className="mt-4 font-serif text-5xl font-light text-text-primary md:text-6xl">
              {active.name}
            </h3>

            <div className="mt-4 mb-6 h-px w-12 bg-accent-gold" />

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-accent-gold-ink" aria-hidden />
                <span className="text-lg font-semibold text-text-primary">{active.passengers}</span>
                <span className="text-sm text-text-secondary">passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <Luggage size={20} className="text-accent-gold-ink" aria-hidden />
                <span className="text-lg font-semibold text-text-primary">{active.bags}</span>
                <span className="text-sm text-text-secondary">bags</span>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-text-secondary">{active.description}</p>

            <div className="mt-4 text-sm">
              <div className="text-xs uppercase tracking-widest text-accent-gold-ink">Ideal for</div>
              <div className="mt-1 italic text-text-secondary">{active.idealFor}</div>
            </div>

            <div className="mt-2 text-xs text-text-secondary/60">e.g. {active.examples}</div>

            <a
              href={waHref(active)}
              target="_blank"
              rel="noopener noreferrer"
              className="no-highlight mt-8 inline-flex items-center gap-3 rounded-full border border-accent-gold px-8 py-3.5 font-medium tracking-wide text-accent-gold-ink transition-all duration-300 hover:bg-accent-gold hover:text-black"
            >
              Book your transfer
            </a>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface shadow-inner">
              <Image
                src={active.mainImage}
                alt={active.name}
                width={800}
                height={600}
                className="h-full w-full object-contain p-6"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-16 w-20 opacity-60">
                <Image
                  src={active.smallImage}
                  alt={`${active.name} exterior view`}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-text-secondary/60">exterior view</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
