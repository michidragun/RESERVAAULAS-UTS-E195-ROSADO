import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, F as FileText, a as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, f as DialogFooter } from "./DashboardLayout-CPtruY_-.js";
import { S as StatusBadge } from "./StatusBadge-z0BJyECa.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-UwM-o4CB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dqfm1_H7.js";
import { B as Button } from "./label-CSFn5qIn.js";
import { C as CircleX } from "./circle-x-BdrXkJbh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
import "./badge-CjI-GRCu.js";
function MyRequestsPage() {
  const {
    user,
    reservations,
    updateReservationStatus
  } = useAuth();
  const [filter, setFilter] = reactExports.useState("all");
  const [cancelTarget, setCancelTarget] = reactExports.useState(null);
  if (!user) return null;
  const myReservations = reservations.filter((r) => r.userId === user.id).filter((r) => filter === "all" || r.status === filter);
  const handleCancel = () => {
    if (cancelTarget) {
      updateReservationStatus(cancelTarget.id, "cancelada");
      setCancelTarget(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Mis Solicitudes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Historial de reservas realizadas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filter, onValueChange: setFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filtrar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "en_revision", children: "En revisión" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "aprobada", children: "Aprobadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rechazada", children: "Rechazadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelada", children: "Canceladas" })
        ] })
      ] })
    ] }),
    myReservations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No hay solicitudes" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Materia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Estado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: myReservations.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.roomName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(r.date).toLocaleDateString("es-CO") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          r.startTime,
          " - ",
          r.endTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: r.status === "en_revision" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "text-destructive hover:text-destructive", onClick: () => setCancelTarget(r), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-1" }),
          " Cancelar"
        ] }) })
      ] }, r.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!cancelTarget, onOpenChange: () => setCancelTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Cancelar Solicitud" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "¿Estás seguro de que deseas cancelar la solicitud para ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: cancelTarget?.roomName }),
        " del",
        " ",
        cancelTarget && new Date(cancelTarget.date).toLocaleDateString("es-CO"),
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setCancelTarget(null), children: "No, volver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: handleCancel, children: "Sí, cancelar" })
      ] })
    ] }) })
  ] }) });
}
export {
  MyRequestsPage as component
};
