"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CrudTable } from "@/components/dashboard/CrudTable";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import type { Doctor } from "@/lib/types";
import { images } from "@/lib/images";

const empty: Omit<Doctor, "id"> = {
  name: "",
  specialization: "",
  email: "",
  phone: "",
  schedule: "",
  status: "Aktif",
  avatar: images.dentistTeam1,
};

export default function DoctorsPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const { t } = useLocale();
  const { confirm } = useConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState(empty);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  return (
    <DashboardShell title={t("pages.doctors.title")} subtitle={t("pages.doctors.subtitle")}>
      <CrudTable
        title={t("pages.doctors.list")}
        data={data.doctors}
        columns={[
          { key: "name", label: t("form.name") },
          { key: "specialization", label: t("form.specialization") },
          { key: "phone", label: t("form.phone") },
          { key: "schedule", label: t("form.schedule") },
          { key: "status", label: t("form.status") },
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
            message: t("confirm.delete.doctor"),
            confirmLabel: t("confirm.btn.delete"),
            onConfirm: () => deleteItem("doctors", item.id),
          })
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t("pages.doctors.edit") : t("pages.doctors.add")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) updateItem("doctors", editing.id, form);
            else addItem("doctors", form);
            setModalOpen(false);
          }}
          className="space-y-4"
        >
          <FormField label={t("form.name")} name="name" value={form.name} onChange={set("name")} required />
          <FormField label={t("form.specialization")} name="specialization" value={form.specialization} onChange={set("specialization")} />
          <FormField label={t("form.email")} name="email" type="email" value={form.email} onChange={set("email")} />
          <FormField label={t("form.phone")} name="phone" value={form.phone} onChange={set("phone")} />
          <FormField label={t("form.schedule")} name="schedule" value={form.schedule} onChange={set("schedule")} />
          <FormField
            label={t("form.status")}
            name="status"
            value={form.status}
            onChange={set("status")}
            options={[
              { value: "Aktif", label: t("status.aktif") },
              { value: "Cuti", label: "Cuti" },
            ]}
          />
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 font-semibold text-white">
            {t("common.save")}
          </button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
