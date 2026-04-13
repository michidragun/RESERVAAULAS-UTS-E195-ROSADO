import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth, a as useNavigate, L as Link, M as MOCK_USERS, V as VALID_TEACHER_IDS } from "./router-CHelZLbF.js";
import { c as createLucideIcon, L as Label, I as Input, B as Button } from "./label-CSFn5qIn.js";
import { C as Card, a as CardContent, b as CardHeader } from "./card-CnHQwc-T.js";
import { u as utsLogo } from "./uts-logo-CtyeQvGk.js";
import { C as CircleCheckBig } from "./circle-check-big-BB-DdtTE.js";
import { C as CircleAlert } from "./circle-alert-BSVqHnB9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function RegisterPage() {
  const {
    register
  } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    teacherId: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.teacherId || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Email no válido");
      return;
    }
    if (MOCK_USERS.some((u) => u.email === form.email)) {
      setError("Este correo ya está registrado");
      return;
    }
    if (!VALID_TEACHER_IDS.includes(form.teacherId)) {
      setError("La identificación docente no existe en la base de datos");
      return;
    }
    if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      setError("La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula y símbolo");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    await register({
      name: form.name,
      email: form.email,
      teacherId: form.teacherId,
      password: form.password
    });
    setSuccess(true);
    setTimeout(() => navigate({
      to: "/"
    }), 2e3);
  };
  const update = (field, value) => setForm((prev) => ({
    ...prev,
    [field]: value
  }));
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-md shadow-lg animate-scale-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-16 w-16 text-success mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-heading font-semibold", children: "¡Registro exitoso!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Redirigiendo al login..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: utsLogo, alt: "UTS Logo", width: 64, height: 64, className: "mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Registro de Docente" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-lg border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-heading font-semibold text-center", children: "Crear cuenta" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
          error
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre completo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => update("name", e.target.value), placeholder: "Juan Pérez" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Correo electrónico" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => update("email", e.target.value), placeholder: "correo@uts.edu.co" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Identificación docente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.teacherId, onChange: (e) => update("teacherId", e.target.value), placeholder: "DOC-2024-004" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: form.password, onChange: (e) => update("password", e.target.value), placeholder: "Mínimo 8 caracteres" }),
          form.password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mt-2 p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1.5", children: "Requisitos de seguridad:" }),
            [{
              ok: form.password.length >= 8,
              label: "Mínimo 8 caracteres"
            }, {
              ok: /[A-Z]/.test(form.password),
              label: "Al menos una mayúscula"
            }, {
              ok: /[a-z]/.test(form.password),
              label: "Al menos una minúscula"
            }, {
              ok: /[^A-Za-z0-9]/.test(form.password),
              label: "Al menos un símbolo (!@#$...)"
            }].map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 text-xs transition-colors ${req.ok ? "text-success" : "text-muted-foreground"}`, children: [
              req.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: req.label })
            ] }, req.label))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Confirmar contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: form.confirmPassword, onChange: (e) => update("confirmPassword", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 mr-2" }),
          "Registrarse"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
          "¿Ya tienes cuenta? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary hover:underline", children: "Iniciar sesión" })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
