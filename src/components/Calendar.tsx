import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("sr", {
  week: {
    dow: 1,
    doy: 1,
  },
});

const localizer = momentLocalizer(moment);

export default function Calendar({
  events,
  onSelectSlot,
  onNavigate,
  defaultDate,
  onView,
}: Pick<
  CalendarProps,
  "events" | "onSelectSlot" | "onNavigate" | "defaultDate" | "onView"
>) {
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
      onNavigate={onNavigate}
      defaultDate={defaultDate}
      onView={onView}
    />
  );
}
