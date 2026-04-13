import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, H as History, a as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./DashboardLayout-CPtruY_-.js";
import { S as StatusBadge } from "./StatusBadge-z0BJyECa.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-UwM-o4CB.js";
import { I as Input, B as Button } from "./label-CSFn5qIn.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dqfm1_H7.js";
import { E as Eye } from "./eye-C0bdSY15.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
import "./badge-CjI-GRCu.js";
function RequestHistoryPage() {
  const {
    reservations
  } = useAuth();
  const [detail, setDetail] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const oneWeekAgo = /* @__PURE__ */ new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const history = reservations.filter((r) => r.status === "aprobada" || r.status === "rechazada").filter((r) => new Date(r.createdAt) <= oneWeekAgo).filter((r) => statusFilter === "all" || r.status === statusFilter).filter((r) => search === "" || r.userName.toLowerCase().includes(search.toLowerCase()) || r.roomName.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold mb-1", children: "Historial de Solicitudes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Solicitudes aprobadas o rechazadas con más de una semana de antigüedad" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por docente o aula...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-xs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Estado" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "aprobada", children: "Aprobadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rechazada", children: "Rechazadas" })
        ] })
      ] })
    ] }),
    history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No hay solicitudes en el historial" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Docente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Estado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: history.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.userName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.roomName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(r.date).toLocaleDateString("es-CO") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          r.startTime,
          " - ",
          r.endTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setDetail(r), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) })
      ] }, r.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!detail, onOpenChange: () => setDetail(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Detalle de Solicitud" }) }),
      detail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Docente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.userName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Aula" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.roomName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Fecha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: new Date(detail.date).toLocaleDateString("es-CO") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Horario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              detail.startTime,
              " - ",
              detail.endTime
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Materia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Estudiantes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.studentCount })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Motivo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.reason })
        ] }),
        detail.observations && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Observaciones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.observations })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Estado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: detail.status })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  RequestHistoryPage as component
};
