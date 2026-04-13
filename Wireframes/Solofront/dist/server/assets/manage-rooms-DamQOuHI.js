import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { b as MOCK_ROOMS } from "./router-CHelZLbF.js";
import { D as DashboardLayout, U as Users, a as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, X } from "./DashboardLayout-CPtruY_-.js";
import { C as Card, a as CardContent } from "./card-CnHQwc-T.js";
import { c as createLucideIcon, B as Button, L as Label, I as Input } from "./label-CSFn5qIn.js";
import { T as Textarea } from "./textarea-BycPnic4.js";
import { B as Badge } from "./badge-CjI-GRCu.js";
import { P as Plus, a as Pencil, T as Trash2 } from "./trash-2-CipVveiz.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./gestiuts-logo-CGZi_qNf.js";
import "./circle-check-big-BB-DdtTE.js";
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
const STATUS_OPTIONS = [{
  value: "habilitada",
  label: "Habilitada",
  className: "bg-success/15 text-success border-success/30"
}, {
  value: "mantenimiento",
  label: "En mantenimiento",
  className: "bg-warning/15 text-warning-foreground border-warning/30"
}, {
  value: "suspendida",
  label: "Suspendida",
  className: "bg-destructive/15 text-destructive border-destructive/30"
}];
function ManageRoomsPage() {
  const [rooms, setRooms] = reactExports.useState(MOCK_ROOMS);
  const [dialog, setDialog] = reactExports.useState(false);
  const [editingRoom, setEditingRoom] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    capacity: "",
    equipment: "",
    description: "",
    status: "habilitada"
  });
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const openCreate = () => {
    setEditingRoom(null);
    setForm({
      name: "",
      capacity: "",
      equipment: "",
      description: "",
      status: "habilitada"
    });
    setImagePreview(null);
    setDialog(true);
  };
  const openEdit = (room) => {
    setEditingRoom(room);
    setForm({
      name: room.name,
      capacity: String(room.capacity),
      equipment: room.equipment.join(", "),
      description: room.description,
      status: room.status
    });
    setImagePreview(room.images[0] || null);
    setDialog(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      name: form.name,
      capacity: parseInt(form.capacity),
      equipment: form.equipment.split(",").map((s) => s.trim()).filter(Boolean),
      description: form.description,
      images: imagePreview ? [imagePreview] : [],
      status: form.status
    };
    if (editingRoom) {
      setRooms((prev) => prev.map((r) => r.id === editingRoom.id ? {
        ...r,
        ...roomData
      } : r));
    } else {
      setRooms((prev) => [...prev, {
        id: `r${Date.now()}`,
        ...roomData
      }]);
    }
    setDialog(false);
  };
  const getStatusBadge = (status) => {
    const config = STATUS_OPTIONS.find((s) => s.value === status);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: config.className, children: config.label });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-heading font-bold", children: "Gestionar Aulas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          rooms.length,
          " aulas registradas"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Crear aula"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: rooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      room.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: room.images[0], alt: room.name, className: "w-full h-full object-cover", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold", children: room.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              "Capacidad: ",
              room.capacity
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => openEdit(room), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-destructive", onClick: () => setRooms((p) => p.filter((r) => r.id !== room.id)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: getStatusBadge(room.status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 line-clamp-2", children: room.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [
          room.equipment.slice(0, 3).map((eq) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-muted px-2 py-0.5 rounded-full", children: eq }, eq)),
          room.equipment.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "+",
            room.equipment.length - 3
          ] })
        ] })
      ] })
    ] }, room.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialog, onOpenChange: setDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingRoom ? "Editar Aula" : "Crear Aula" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Foto del aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: handleImageChange }),
          imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2 rounded-lg overflow-hidden h-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imagePreview, alt: "Preview", className: "w-full h-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "secondary", className: "h-7 w-7", onClick: () => fileInputRef.current?.click(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "destructive", className: "h-7 w-7", onClick: () => setImagePreview(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "mt-2 w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-8 w-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Subir imagen" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm((p) => ({
            ...p,
            name: e.target.value
          })), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Capacidad *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.capacity, onChange: (e) => setForm((p) => ({
            ...p,
            capacity: e.target.value
          })), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Equipos (separados por coma)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.equipment, onChange: (e) => setForm((p) => ({
            ...p,
            equipment: e.target.value
          })), placeholder: "PC, Proyector, Pizarra" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descripción" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.description, onChange: (e) => setForm((p) => ({
            ...p,
            description: e.target.value
          })), rows: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Estado del aula" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2", children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm((p) => ({
            ...p,
            status: opt.value
          })), className: `px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${form.status === opt.value ? opt.className + " ring-2 ring-offset-2 ring-primary/40" : "border-muted text-muted-foreground hover:border-foreground/30"}`, children: opt.label }, opt.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", children: editingRoom ? "Guardar cambios" : "Crear aula" })
      ] })
    ] }) })
  ] }) });
}
export {
  ManageRoomsPage as component
};
