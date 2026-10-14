import { Event } from "@/data/events";

export function isEventUpcoming(event: Event): boolean {
  if (!event.date) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Handle date ranges like "2026-05-07" or display dates
  // Always use the ISO date field for comparison
  const eventDate = new Date(event.date);

  // For multi-day events, try to extract end date from displayDate
  let endDate = new Date(eventDate);
  if (event.displayDate) {
    // Parse displayDate to find end date
    // Formats: "April 24–25, 2026", "October 8-11, 2026", "April–June, 2026"
    const rangeMatch = event.displayDate.match(/(\d{1,2})[-–](\d{1,2})/);
    if (rangeMatch) {
      const endDay = parseInt(rangeMatch[2], 10);
      const month = eventDate.getMonth();
      const year = eventDate.getFullYear();
      endDate = new Date(year, month, endDay);
    }
  }

  // Set end of day for comparison
  endDate.setHours(23, 59, 59, 999);

  return endDate >= today;
}

export function getUpcomingEvents(events: Event[]): Event[] {
  return events.filter(isEventUpcoming);
}

export function getPastEvents(events: Event[]): Event[] {
  return events.filter((event) => !isEventUpcoming(event));
}

export function getFeaturedUpcomingEvents(events: Event[]): Event[] {
  return events
    .filter((e) => isEventUpcoming(e) && e.isFeatured)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getUpcomingEventsByCategory(
  events: Event[],
  category: string
): Event[] {
  return events.filter(
    (e) => isEventUpcoming(e) && e.category === category
  );
}
