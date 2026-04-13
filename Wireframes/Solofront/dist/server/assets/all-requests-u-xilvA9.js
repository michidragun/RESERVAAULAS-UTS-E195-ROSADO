import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, h as ClipboardList } from "./DashboardLayout-CPtruY_-.js";
import { S as StatusBadge } from "./StatusBadge-z0BJyECa.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-UwM-o4CB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dqfm1_H7.js";
import { I as Input } from "./label-CSFn5qIn.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
import "./badge-CjI-GRCu.js";
function AllRequestsPage() {
  const {
    reservations
  } = useAuth();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const filtered = reservations.filter((r) => statusFilter === "all" || r.status === statusFilter).filter((r) => search === "" || r.userName.toLowerCase().includes(search.toLowerCase()) || r.roomName.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold mb-1", children: "Todas las Solicitudes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Vista global de todas las reservas del sistema" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por docente o aula...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-xs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Estado" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "en_revision", children: "En revisión" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "aprobada", children: "Aprobadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rechazada", children: "Rechazadas" })
        ] })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No se encontraron solicitudes" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Docente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Motivo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Estado" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.userName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.roomName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(r.date).toLocaleDateString("es-CO") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          r.startTime,
          " - ",
          r.endTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-[200px] truncate", children: r.reason }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) })
      ] }, r.id)) })
    ] }) })
  ] }) });
}
export {
  AllRequestsPage as component
};
