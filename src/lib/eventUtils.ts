import { Event } from "@/data/events";

export function isEventUpcoming(event: Event): boolean {
  if (!event.date) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Handle date ranges like "2026-05-07" or display dates
  // Always use the ISO date field for comparison
  const eventDate = new Date(event.date);

  // For multi-day events use the last day
  // If date is a range we use the end date
  // For single day events the event is hidden the day after
  const endDate = new Date(eventDate);
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
