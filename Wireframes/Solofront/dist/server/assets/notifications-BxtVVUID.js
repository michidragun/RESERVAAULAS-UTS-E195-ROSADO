import { U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, C as CheckCheck, B as Bell } from "./DashboardLayout-CPtruY_-.js";
import { C as Card, a as CardContent } from "./card-CnHQwc-T.js";
import { B as Button } from "./label-CSFn5qIn.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
function NotificationsPage() {
  const {
    user,
    notifications,
    markNotificationRead
  } = useAuth();
  if (!user) return null;
  const userNotifs = notifications.filter((n) => n.userId === user.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Notificaciones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          userNotifs.filter((n) => !n.read).length,
          " sin leer"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => userNotifs.forEach((n) => markNotificationRead(n.id)), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-4 w-4 mr-1" }),
        "Marcar todas como leídas"
      ] })
    ] }),
    userNotifs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No tienes notificaciones" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: userNotifs.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { onClick: () => markNotificationRead(n.id), className: `cursor-pointer transition-all hover:shadow-md ${!n.read ? "ring-1 ring-primary/20 bg-primary/5" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${n.type === "success" ? "bg-success" : n.type === "error" ? "bg-destructive" : "bg-info"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${!n.read ? "font-medium" : "text-muted-foreground"}`, children: n.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(n.createdAt).toLocaleString("es-CO") })
      ] })
    ] }) }, n.id)) })
  ] }) });
}
export {
  NotificationsPage as component
};
