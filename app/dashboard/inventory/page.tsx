"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CrudTable } from "@/components/dashboard/CrudTable";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import type { InventoryItem } from "@/lib/types";

const empty: Omit<InventoryItem, "id"> = {
  name: "",
  category: "APD",
  quantity: 0,
  unit: "pcs",
  minStock: 10,
  supplier: "",
  expiryDate: "",
};

export default function InventoryPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const { t } = useLocale();
  const { confirm } = useConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState(empty);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({
      ...f,
      [key]: key === "quantity" || key === "minStock" ? Number(v) || 0 : v,
    }));

  return (
    <DashboardShell title={t("pages.inventory.title")} subtitle={t("pages.inventory.subtitle")}>
      <CrudTable
        title={t("pages.inventory.list")}
        data={data.inventory}
        columns={[
          { key: "name", label: t("form.itemName") },
          { key: "category", label: t("form.category") },
          {
            key: "quantity",
            label: t("form.stock"),
            render: (i) => (
              <span className={i.quantity <= i.minStock ? "font-semibold text-[var(--danger)]" : ""}>
                {i.quantity} {i.unit}
              </span>
            ),
          },
          { key: "supplier", label: t("form.supplier") },
          { key: "expiryDate", label: t("form.expiry") },
        ]}
        onAdd={() => {
          setEditing(null);
          setForm(empty);
          setModalOpen(true);
        }}
        onEdit={(item) => {
          setEditing(item);
          setForm({ ...item });
          setModalOpen(true);
        }}
        onDelete={(item) =>
          confirm({
            title: t("confirm.title.delete"),
            message: t("confirm.delete.inventory"),
            confirmLabel: t("confirm.btn.delete"),
            onConfirm: () => deleteItem("inventory", item.id),
          })
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t("pages.inventory.edit") : t("pages.inventory.add")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) updateItem("inventory", editing.id, form);
            else addItem("inventory", form);
            setModalOpen(false);
          }}
          className="space-y-4"
        >
          <FormField label={t("form.itemName")} name="name" value={form.name} onChange={set("name")} required />
          <FormField label={t("form.category")} name="category" value={form.category} onChange={set("category")} />
          <FormField label={t("form.quantity")} name="quantity" type="number" value={form.quantity} onChange={set("quantity")} />
          <FormField label={t("form.unit")} name="unit" value={form.unit} onChange={set("unit")} />
          <FormField label={t("form.minStock")} name="minStock" type="number" value={form.minStock} onChange={set("minStock")} />
          <FormField label={t("form.supplier")} name="supplier" value={form.supplier} onChange={set("supplier")} />
          <FormField label={t("form.expiry")} name="expiryDate" type="date" value={form.expiryDate} onChange={set("expiryDate")} />
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 font-semibold text-white">
            {t("common.save")}
          </button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
