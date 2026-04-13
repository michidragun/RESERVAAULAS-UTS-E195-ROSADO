import { U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth, b as MOCK_ROOMS, L as Link } from "./router-CHelZLbF.js";
import { D as DashboardLayout, U as Users, g as Building2, h as ClipboardList } from "./DashboardLayout-CPtruY_-.js";
import { C as Card, a as CardContent } from "./card-CnHQwc-T.js";
import { c as createLucideIcon } from "./label-CSFn5qIn.js";
import { C as CircleCheckBig } from "./circle-check-big-BB-DdtTE.js";
import { C as CircleX } from "./circle-x-BdrXkJbh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function DashboardPage() {
  const {
    user,
    reservations
  } = useAuth();
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-heading font-bold mb-1", children: [
      "¡Bienvenido, ",
      user.name.split(" ")[0],
      "!"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
      user.role === "docente" && "Gestiona tus reservas de aulas especiales",
      user.role === "coordinador" && "Revisa y gestiona las solicitudes pendientes",
      user.role === "administrador" && "Panel de administración del sistema"
    ] }),
    user.role === "docente" && /* @__PURE__ */ jsxRuntimeExports.jsx(DocenteDashboard, {}),
    user.role === "coordinador" && /* @__PURE__ */ jsxRuntimeExports.jsx(CoordinadorDashboard, {}),
    user.role === "administrador" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {})
  ] }) });
}
function DocenteDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-heading font-semibold mb-4", children: "Salas Disponibles" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: MOCK_ROOMS.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/room/$roomId", params: {
      roomId: room.id
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${room.status !== "habilitada" ? "opacity-75" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-40 overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: room.images[0], alt: room.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300", loading: "lazy" }),
        room.status !== "habilitada" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold px-2 py-1 rounded-full ${room.status === "mantenimiento" ? "bg-warning text-warning-foreground" : "bg-destructive text-destructive-foreground"}`, children: room.status === "mantenimiento" ? "En mantenimiento" : "Suspendida" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-foreground", children: room.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: room.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Capacidad: ",
            room.capacity
          ] })
        ] })
      ] })
    ] }) }, room.id)) })
  ] });
}
function CoordinadorDashboard() {
  const {
    reservations
  } = useAuth();
  const pending = reservations.filter((r) => r.status === "en_revision").length;
  const approved = reservations.filter((r) => r.status === "aprobada").length;
  const rejected = reservations.filter((r) => r.status === "rechazada").length;
  const stats = [{
    label: "Pendientes",
    value: pending,
    icon: Clock,
    color: "text-warning"
  }, {
    label: "Aprobadas",
    value: approved,
    icon: CircleCheckBig,
    color: "text-success"
  }, {
    label: "Rechazadas",
    value: rejected,
    icon: CircleX,
    color: "text-destructive"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "animate-slide-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl bg-muted ${s.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-heading font-bold", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s.label })
    ] })
  ] }) }, s.label)) });
}
function AdminDashboard() {
  const {
    reservations,
    users
  } = useAuth();
  const stats = [{
    label: "Usuarios",
    value: users.length,
    icon: Users,
    color: "text-primary"
  }, {
    label: "Aulas",
    value: MOCK_ROOMS.length,
    icon: Building2,
    color: "text-info"
  }, {
    label: "Solicitudes",
    value: reservations.length,
    icon: ClipboardList,
    color: "text-warning"
  }, {
    label: "Aprobadas",
    value: reservations.filter((r) => r.status === "aprobada").length,
    icon: CircleCheckBig,
    color: "text-success"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "animate-slide-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl bg-muted ${s.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-heading font-bold", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s.label })
    ] })
  ] }) }, s.label)) });
}
export {
  DashboardPage as component
};
