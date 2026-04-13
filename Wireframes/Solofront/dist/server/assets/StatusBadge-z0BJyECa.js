import { U as jsxRuntimeExports } from "./worker-entry-DXb4SRss.js";
import { B as Badge } from "./badge-CjI-GRCu.js";
const statusConfig = {
  en_revision: { label: "En revisión", className: "bg-warning/15 text-warning-foreground border-warning/30" },
  aprobada: { label: "Aprobada", className: "bg-success/15 text-success border-success/30" },
  rechazada: { label: "Rechazada", className: "bg-destructive/15 text-destructive border-destructive/30" },
  cancelada: { label: "Cancelada", className: "bg-muted text-muted-foreground border-border" }
};
function StatusBadge({ status }) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: config.className, children: config.label });
}
export {
  StatusBadge as S
};
