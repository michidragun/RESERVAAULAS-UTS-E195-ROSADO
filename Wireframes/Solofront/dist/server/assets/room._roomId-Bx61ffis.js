import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { R as Route, u as useAuth, b as MOCK_ROOMS, L as Link } from "./router-CHelZLbF.js";
import { D as DashboardLayout, U as Users } from "./DashboardLayout-CPtruY_-.js";
import { c as createLucideIcon, B as Button, L as Label, I as Input } from "./label-CSFn5qIn.js";
import { T as Textarea } from "./textarea-BycPnic4.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CnHQwc-T.js";
import { A as ArrowLeft } from "./arrow-left-Fcw6vxBR.js";
import { C as CircleAlert } from "./circle-alert-BSVqHnB9.js";
import { C as CircleCheckBig } from "./circle-check-big-BB-DdtTE.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function RoomDetailPage() {
  const {
    roomId
  } = Route.useParams();
  const {
    user,
    addReservation
  } = useAuth();
  const room = MOCK_ROOMS.find((r) => r.id === roomId);
  const [form, setForm] = reactExports.useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    subject: "",
    studentCount: "",
    observations: ""
  });
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  if (!room || !user) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.date || !form.startTime || !form.endTime || !form.reason || !form.subject || !form.studentCount) {
      setError("Completa todos los campos obligatorios");
      return;
    }
    if (form.startTime >= form.endTime) {
      setError("La hora fin debe ser mayor a la hora inicio");
      return;
    }
    addReservation({
      roomId: room.id,
      roomName: room.name,
      userId: user.id,
      userName: user.name,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      reason: form.reason,
      subject: form.subject,
      studentCount: parseInt(form.studentCount),
      observations: form.observations
    });
    setSuccess(true);
  };
  const update = (f, v) => setForm((p) => ({
    ...p,
    [f]: v
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Volver al dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden shadow-md mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: room.images[0], alt: room.name, className: "w-full h-56 object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: room.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: room.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          "Capacidad: ",
          room.capacity
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4" }),
            "Equipos disponibles"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: room.equipment.map((eq) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shrink-0" }),
            eq
          ] }, eq)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Solicitar Reserva" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: room.status !== "habilitada" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-12 w-12 text-warning mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold", children: "Sala no disponible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            "Esta sala se encuentra ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: room.status === "mantenimiento" ? "en mantenimiento" : "suspendida" }),
            " y no acepta solicitudes por el momento."
          ] })
        ] }) : success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 animate-scale-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-16 w-16 text-success mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-lg", children: "¡Solicitud enviada!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2 text-sm", children: [
            "Estado: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "En revisión" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
              setSuccess(false);
              setForm({
                date: "",
                startTime: "",
                endTime: "",
                reason: "",
                subject: "",
                studentCount: "",
                observations: ""
              });
            }, children: "Nueva solicitud" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-requests", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Ver mis solicitudes" }) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
            error
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Fecha *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.date, onChange: (e) => update("date", e.target.value), min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hora inicio *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: form.startTime, onChange: (e) => update("startTime", e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hora fin *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: form.endTime, onChange: (e) => update("endTime", e.target.value) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Motivo de la reserva *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.reason, onChange: (e) => update("reason", e.target.value), placeholder: "Ej: Práctica de laboratorio" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Materia *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.subject, onChange: (e) => update("subject", e.target.value), placeholder: "Ej: Física I" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cantidad de estudiantes *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.studentCount, onChange: (e) => update("studentCount", e.target.value), min: "1", max: String(room.capacity) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Observaciones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.observations, onChange: (e) => update("observations", e.target.value), placeholder: "Opcional", rows: 2 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-2" }),
            "Enviar solicitud"
          ] })
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  RoomDetailPage as component
};
