import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendar({
  events,
  onSelectSlot,
}: Pick<CalendarProps, "events" | "onSelectSlot">) {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      views={["day", "week", "month"]}
      defaultView={"week"}
      onSelectSlot={onSelectSlot}
      selectable
      step={15}
    />
  );
}
