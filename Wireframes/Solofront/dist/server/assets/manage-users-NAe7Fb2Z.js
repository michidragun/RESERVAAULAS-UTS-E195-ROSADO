import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { u as useAuth } from "./router-CHelZLbF.js";
import { D as DashboardLayout, a as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./DashboardLayout-CPtruY_-.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-UwM-o4CB.js";
import { B as Button, L as Label, I as Input } from "./label-CSFn5qIn.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dqfm1_H7.js";
import { B as Badge } from "./badge-CjI-GRCu.js";
import { P as Plus, a as Pencil, T as Trash2 } from "./trash-2-CipVveiz.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
function ManageUsersPage() {
  const {
    users,
    addUser,
    deleteUser
  } = useAuth();
  const [dialog, setDialog] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    role: "docente"
  });
  const handleCreate = (e) => {
    e.preventDefault();
    addUser(form);
    setDialog(false);
    setForm({
      name: "",
      email: "",
      role: "docente"
    });
  };
  const roleBadge = (role) => {
    const colors = {
      docente: "bg-primary/10 text-primary",
      coordinador: "bg-warning/15 text-warning-foreground",
      administrador: "bg-info/15 text-info"
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: colors[role], children: role });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Gestionar Usuarios" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          users.length,
          " usuarios registrados"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setDialog(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Crear usuario"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nombre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Correo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Rol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: roleBadge(u.role) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-destructive", onClick: () => deleteUser(u.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, u.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialog, onOpenChange: setDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Crear Usuario" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm((p) => ({
            ...p,
            name: e.target.value
          })), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Correo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm((p) => ({
            ...p,
            email: e.target.value
          })), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rol" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.role, onValueChange: (v) => setForm((p) => ({
            ...p,
            role: v
          })), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "docente", children: "Docente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "coordinador", children: "Coordinador" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "administrador", children: "Administrador" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", children: "Crear usuario" })
      ] })
    ] }) })
  ] }) });
}
export {
  ManageUsersPage as component
};
