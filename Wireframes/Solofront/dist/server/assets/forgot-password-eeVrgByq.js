import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { L as Link } from "./router-CHelZLbF.js";
import { L as Label, I as Input, B as Button } from "./label-CSFn5qIn.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-CnHQwc-T.js";
import { u as utsLogo } from "./uts-logo-CtyeQvGk.js";
import { C as CircleCheckBig } from "./circle-check-big-BB-DdtTE.js";
import { M as Mail } from "./mail-CMW5_H2x.js";
import { A as ArrowLeft } from "./arrow-left-Fcw6vxBR.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ForgotPasswordPage() {
  const [email, setEmail] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: utsLogo, alt: "UTS Logo", width: 64, height: 64, className: "mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Recuperar Contraseña" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-lg border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 animate-scale-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-16 w-16 text-success mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: "¡Enlace enviado!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2 text-sm", children: [
          "Se ha enviado un enlace de recuperación a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block mt-4 text-primary hover:underline text-sm", children: "Volver al login" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Correo electrónico" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "correo@uts.edu.co", className: "pl-10", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", children: "Enviar enlace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center justify-center gap-1 text-sm text-primary hover:underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
          "Volver al login"
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ForgotPasswordPage as component
};
