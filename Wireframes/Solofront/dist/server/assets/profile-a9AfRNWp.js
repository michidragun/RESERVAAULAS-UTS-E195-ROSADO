import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, A as Avatar, e as AvatarFallback } from "./DashboardLayout-CPtruY_-.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CnHQwc-T.js";
import { c as createLucideIcon, L as Label, I as Input, B as Button } from "./label-CSFn5qIn.js";
import { C as CircleCheckBig } from "./circle-check-big-BB-DdtTE.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
const __iconNode = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode);
function ProfilePage() {
  const {
    user
  } = useAuth();
  const [name, setName] = reactExports.useState(user?.name || "");
  const [saved, setSaved] = reactExports.useState(false);
  if (!user) return null;
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold mb-6", children: "Mi Perfil" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-20 w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-2xl font-heading font-bold", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3.5 w-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary capitalize mt-1", children: user.role })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre completo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Correo electrónico" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: user.email, disabled: true, className: "bg-muted" })
        ] }),
        user.teacherId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ID Docente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: user.teacherId, disabled: true, className: "bg-muted" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", children: saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2" }),
          "Guardado"
        ] }) : "Guardar cambios" })
      ] }) })
    ] })
  ] }) });
}
export {
  ProfilePage as component
};
