"use client";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import {
  format,
  startOfDay,
  startOfWeek,
  getDay,
  differenceInMinutes,
  parse,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import Swal from "sweetalert2";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../../styles/calendar.css";
import { useRouter } from "next/navigation";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) =>
    format(date, formatStr, { ...options, locale: ptBR }),
  parse: (str, format) => parse(str, format, new Date(), { locale: ptBR }),
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  allDay: "Dia todo",
  previous: "❮",
  next: "❯",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Nenhum evento neste período.",
  showMore: (total) => `+ (${total})`,
};

const formats = {
  dateFormat: "dd",
  dayFormat: (date, culture, localizer) =>
    localizer.format(date, "EEEE", culture),
  dayHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, "EEEE, MMMM dd", culture),
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, "MMMM dd", culture)} - ${localizer.format(
      end,
      "MMMM dd",
      culture
    )}`,
  agendaDateFormat: "dd/MM/yyyy",
  agendaTimeFormat: "HH:mm",
  agendaHeaderFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, "MMMM dd", culture)} - ${localizer.format(
      end,
      "MMMM dd",
      culture
    )}`,
};

interface Event {
  start: Date;
  end: Date;
  title: string;
  email?: string;
  value?: number;
}

export default function PodcastStudioCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const calculateValue = (start: Date, end: Date) => {
    const durationInMinutes = differenceInMinutes(end, start);
    const durationInHalfHours = Math.ceil(durationInMinutes / 30);
    const totalValue = durationInHalfHours * 40;
    return totalValue;
  };

  const handleSelectSlot = async ({
    start,
    end,
    action,
  }: {
    start: Date;
    end: Date;
    action: "click" | "select" | "doubleClick";
  }) => {
    const today = new Date();

    if (start < startOfDay(today)) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não é possível agendar eventos em datas passadas.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#EA5E53",
      });
      return;
    }

    if (start < today) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Você precisa agendar com 1 dia de antecedência.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#EA5E53",
      });
      return;
    }

    if (getDay(start) === 0) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não é possível agendar eventos aos domingos.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#EA5E53",
      });
      return;
    }

    const isSlotOccupied = events.some(
      (event) => start < event.end && end > event.start
    );

    if (isSlotOccupied) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Já existe um evento marcado neste horário.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#EA5E53",
      });
      return;
    }

    if (view === Views.MONTH && (action === "click" || action === "select")) {
      setView(Views.DAY);
      setDate(startOfDay(start));
      return;
    }

    const { value: title } = await Swal.fire({
      title: "Nome do evento",
      input: "text",
      inputLabel: "Digite o nome do evento",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Salvar",
      confirmButtonColor: "#EA5E53",
      inputValidator: (value) => {
        if (!value) {
          return "Você precisa digitar algo!";
        }
      },
    });

    if (title) {
      const { value: email } = await Swal.fire({
        title: "E-mail do locatário",
        input: "email",
        inputLabel: "Digite o seu e-mail",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Salvar",
        confirmButtonColor: "#EA5E53",
        inputValidator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            return "Você precisa digitar um e-mail!";
          }
          if (!emailRegex.test(value)) {
            return "Por favor, digite um e-mail válido!";
          }
        },
      });

      if (email) {
        const eventValue = calculateValue(start, end);
        const newEvent: Event = { start, end, title, email, value: eventValue };
        setEvents([...events, newEvent]);
        setSelectedEvent(newEvent);
        Swal.fire({
          icon: "success",
          title: "Evento adicionado",
          text: 'Clique em "Reservar" para ir ao pagamento.',
          confirmButtonText: "Ok",
          confirmButtonColor: "#EA5E53",
        });
      }
    }
  };

  const handleReserveSubmit = async () => {
    try {
      if (!selectedEvent) {
        throw new Error(
          "Você deve selecionar uma data e horário para reservar o espaço."
        );
      }

      const eventValue = calculateValue(selectedEvent.start, selectedEvent.end);

      router.push(`/payment?valorReserva=${eventValue}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Atenção",
        text: error.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#EA5E53",
      });
    }
  };

  return (
    <form className="calendar-container" onSubmit={(e) => e.preventDefault()}>
      <Calendar
        localizer={localizer}
        messages={messages}
        formats={formats}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        step={30}
        timeslots={2}
        view={view}
        date={date}
        onView={(view) => setView(view)}
        onNavigate={(date) => setDate(date)}
        views={["month", "day"]}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor:
              event.title === "Reservado" ? "#868686" : "#EE7A3C",
            borderRadius: "5px",
            opacity: 0.8,
            color: "white",
            cursor: event.title === "Reservado" ? "not-allowed" : "pointer",
          },
        })}
        longPressThreshold={false}
      />
      <button
        type="submit"
        className="shadow-md mt-8 xs:mt-6 xs:mb-2 mx-auto w-[200px] h-[30px] bg-[#EA5E53] text-white text-sm font-bold rounded-[50px]"
        onClick={handleReserveSubmit}
      >
        Reservar
      </button>
    </form>
  );
}
