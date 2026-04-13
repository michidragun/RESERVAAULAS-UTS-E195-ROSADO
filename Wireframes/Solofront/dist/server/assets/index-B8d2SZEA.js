import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth, a as useNavigate, L as Link } from "./router-CHelZLbF.js";
import { c as createLucideIcon, L as Label, I as Input, B as Button } from "./label-CSFn5qIn.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-CnHQwc-T.js";
import { g as gestiutsLogo, L as Lock } from "./gestiuts-logo-CGZi_qNf.js";
import { C as CircleAlert } from "./circle-alert-BSVqHnB9.js";
import { M as Mail } from "./mail-CMW5_H2x.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function LoginPage() {
  const {
    login,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  if (user) {
    navigate({
      to: "/dashboard"
    });
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email no válido");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate({
        to: "/dashboard"
      });
    } catch {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gestiutsLogo, alt: "GESTIUTS Logo", width: 80, height: 80, className: "mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-heading font-bold text-foreground", children: "GESTIUTS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Sistema de Reservas de Aulas Especiales" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-lg border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-heading font-semibold text-center", children: "Iniciar Sesión" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
          error
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Correo electrónico" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "correo@uts.edu.co", value: email, onChange: (e) => setEmail(e.target.value), className: "pl-10" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), className: "pl-10" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4 mr-2" }),
          loading ? "Ingresando..." : "Ingresar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-primary hover:underline", children: "¿Olvidaste tu contraseña?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-primary hover:underline", children: "Registrarse" })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
