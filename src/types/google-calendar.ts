
export interface CalendarEvent {
  id: string;
  summary: string;
  htmlLink: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
}
