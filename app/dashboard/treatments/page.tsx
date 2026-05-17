"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CrudTable } from "@/components/dashboard/CrudTable";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import { formatCurrency } from "@/lib/utils";
import type { Treatment } from "@/lib/types";

const empty: Omit<Treatment, "id"> = {
  name: "",
  category: "Preventif",
  price: 0,
  duration: 30,
  description: "",
};

export default function TreatmentsPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const { t } = useLocale();
  const { confirm } = useConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [form, setForm] = useState(empty);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({
      ...f,
      [key]: key === "price" || key === "duration" ? Number(v) || 0 : v,
    }));

  return (
    <DashboardShell title={t("pages.treatments.title")} subtitle={t("pages.treatments.subtitle")}>
      <CrudTable
        title={t("pages.treatments.list")}
        data={data.treatments}
        columns={[
          { key: "name", label: t("form.name") },
          { key: "category", label: t("form.category") },
          { key: "price", label: t("form.price"), render: (item) => formatCurrency(item.price) },
          { key: "duration", label: t("form.duration") },
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
            message: t("confirm.delete.treatment"),
            confirmLabel: t("confirm.btn.delete"),
            onConfirm: () => deleteItem("treatments", item.id),
          })
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t("pages.treatments.edit") : t("pages.treatments.add")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) updateItem("treatments", editing.id, form);
            else addItem("treatments", form);
            setModalOpen(false);
          }}
          className="space-y-4"
        >
          <FormField label={t("form.name")} name="name" value={form.name} onChange={set("name")} required />
          <FormField
            label={t("form.category")}
            name="category"
            value={form.category}
            onChange={set("category")}
            options={["Preventif", "Restoratif", "Bedah", "Estetik", "Ortodonti", "Prostodonti"].map((c) => ({
              value: c,
              label: c,
            }))}
          />
          <FormField label={t("form.priceRp")} name="price" type="number" value={form.price} onChange={set("price")} required />
          <FormField label={t("form.duration")} name="duration" type="number" value={form.duration} onChange={set("duration")} />
          <FormField label={t("form.description")} name="description" value={form.description} onChange={set("description")} rows={3} />
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 font-semibold text-white">
            {t("common.save")}
          </button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
