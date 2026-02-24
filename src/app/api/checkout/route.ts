import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { experiences } from "@/data/experiences";
import { excursions } from "@/data/excursions";

// Placeholder pricing map as requested
const PRICING_MAP: Record<string, number> = {
  // Experiences
  "cairo-after-dark": 149900,
  "nile-signature": 0, // custom quote
  "red-sea-serenity": 249900,
  "luxor-undiscovered": 189900,
  "cairo-exclusive-luxury": 499900,
  "the-signature-nile-journey": 389900,
  
  // Excursions
  "hurghada-luxor-day-trip": 11900,
  "hurghada-cairo-day-trip": 19900,
  "hurghada-jeep-safari": 4500,
  "mahmya-island-snorkeling": 9900,
  "giftun-island-snorkeling": 8900,
  "paradise-island-snorkeling": 5500,
  "hurghada-quad-bike": 3000,

  // Migrated Cairo Tours
  "cairo-in-a-day-from-hurghada": 28500,
  "nile-maxim-dinner-cruise": 9900,
  "cairo-beyond-the-pyramids": 12900,
  "tanoura-night-old-cairo": 4300,
  "cairo-private-photo-session": 22000,
  "alexandria-day-trip-from-cairo": 12900,
  "saqqara-dahshur-pyramids": 12500,
  "giza-pyramids-grand-egyptian-museum": 12000,
};

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Checkout is temporarily unavailable." },
        { status: 501 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const { itemType, slug } = await req.json();

    if (!itemType || !slug) {
      return NextResponse.json(
        { error: "Missing itemType or slug" },
        { status: 400 }
      );
    }

    let item;
    if (itemType === "experience") {
      item = experiences.find((e) => e.slug === slug);
    } else if (itemType === "excursion") {
      item = excursions.find((e) => e.slug === slug);
    } else {
      return NextResponse.json(
        { error: "Invalid itemType" },
        { status: 400 }
      );
    }

    if (!item) {
      return NextResponse.json(
        { error: `${itemType} not found` },
        { status: 404 }
      );
    }

    // Get price from map; only fall back when slug is not present in the map
    const hasMappedPrice = Object.prototype.hasOwnProperty.call(PRICING_MAP, slug);
    const mapped = hasMappedPrice ? PRICING_MAP[slug] : undefined;
    const unitAmount =
      mapped !== undefined
        ? mapped
        : itemType === "excursion"
          ? 9900
          : 149900;

    // Block checkout for items intentionally marked as custom-quote (0)
    if (unitAmount === 0) {
      return NextResponse.json(
        { error: "This item requires a custom quote. Please contact our team." },
        { status: 400 }
      );
    }

    // Get site URL dynamically or from env
    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              description: "description" in item ? item.description : item.shortDescription,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        itemType,
        slug,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
