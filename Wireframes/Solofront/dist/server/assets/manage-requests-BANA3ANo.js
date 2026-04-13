import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, a as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./DashboardLayout-CPtruY_-.js";
import { S as StatusBadge } from "./StatusBadge-z0BJyECa.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-UwM-o4CB.js";
import { B as Button } from "./label-CSFn5qIn.js";
import { E as Eye } from "./eye-C0bdSY15.js";
import { C as CircleCheckBig } from "./circle-check-big-BB-DdtTE.js";
import { C as CircleX } from "./circle-x-BdrXkJbh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./badge-CjI-GRCu.js";
function ManageRequestsPage() {
  const {
    reservations,
    updateReservationStatus
  } = useAuth();
  const [detail, setDetail] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold mb-1", children: "Gestionar Solicitudes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Aprueba o rechaza las solicitudes de los docentes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Docente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Aula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Estado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: reservations.filter((r) => {
        if (r.status === "en_revision") return true;
        const oneWeekAgo = /* @__PURE__ */ new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(r.createdAt) > oneWeekAgo;
      }).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.userName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.roomName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(r.date).toLocaleDateString("es-CO") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          r.startTime,
          " - ",
          r.endTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setDetail(r), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
          r.status === "en_revision" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-success hover:text-success", onClick: () => updateReservationStatus(r.id, "aprobada"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-destructive hover:text-destructive", onClick: () => updateReservationStatus(r.id, "rechazada"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }) })
          ] })
        ] }) })
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
        ] }),
        detail.status === "en_revision" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1 bg-success hover:bg-success/90 text-success-foreground", onClick: () => {
            updateReservationStatus(detail.id, "aprobada");
            setDetail(null);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2" }),
            "Aprobar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", className: "flex-1", onClick: () => {
            updateReservationStatus(detail.id, "rechazada");
            setDetail(null);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
            "Rechazar"
          ] })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  ManageRequestsPage as component
};
