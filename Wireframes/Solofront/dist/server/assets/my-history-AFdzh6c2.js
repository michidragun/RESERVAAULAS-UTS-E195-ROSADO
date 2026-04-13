import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, H as History } from "./DashboardLayout-CPtruY_-.js";
import { S as StatusBadge } from "./StatusBadge-z0BJyECa.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-UwM-o4CB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dqfm1_H7.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./label-CSFn5qIn.js";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
import "./badge-CjI-GRCu.js";
function MyHistoryPage() {
  const {
    user,
    reservations
  } = useAuth();
  const [filter, setFilter] = reactExports.useState("all");
  if (!user) return null;
  const oneWeekAgo = /* @__PURE__ */ new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const history = reservations.filter((r) => r.userId === user.id).filter((r) => r.status === "aprobada" || r.status === "rechazada" || r.status === "cancelada").filter((r) => new Date(r.createdAt) <= oneWeekAgo).filter((r) => filter === "all" || r.status === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Mi Historial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Solicitudes finalizadas con más de una semana" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filter, onValueChange: setFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filtrar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "aprobada", children: "Aprobadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rechazada", children: "Rechazadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelada", children: "Canceladas" })
        ] })
      ] })
    ] }),
    history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No hay solicitudes en tu historial" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Materia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Estado" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: history.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.roomName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(r.date).toLocaleDateString("es-CO") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          r.startTime,
          " - ",
          r.endTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) })
      ] }, r.id)) })
    ] }) })
  ] }) });
}
export {
  MyHistoryPage as component
};
