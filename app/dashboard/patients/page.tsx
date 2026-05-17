"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CrudTable } from "@/components/dashboard/CrudTable";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import type { Patient } from "@/lib/types";

const emptyPatient: Omit<Patient, "id"> = {
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "Laki-laki",
  address: "",
  bloodType: "O",
  allergies: "",
  notes: "",
  registeredAt: new Date().toISOString().slice(0, 10),
};

export default function PatientsPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const { t } = useLocale();
  const { confirm } = useConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);
  const [form, setForm] = useState(emptyPatient);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyPatient);
    setModalOpen(true);
  };

  const openEdit = (item: Patient) => {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateItem("patients", editing.id, form);
    else addItem("patients", form);
    setModalOpen(false);
  };

  const handleDelete = (item: Patient) => {
    confirm({
      title: t("confirm.title.delete"),
      message: t("confirm.delete.patient", { name: item.name }),
      confirmLabel: t("confirm.btn.delete"),
      onConfirm: () => deleteItem("patients", item.id),
    });
  };

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  return (
    <DashboardShell title={t("pages.patients.title")} subtitle={t("pages.patients.subtitle")}>
      <CrudTable
        title={t("pages.patients.list")}
        data={data.patients}
        columns={[
          { key: "name", label: t("form.name") },
          { key: "phone", label: t("form.phone") },
          { key: "email", label: t("form.email") },
          { key: "gender", label: t("form.gender") },
          { key: "bloodType", label: t("form.bloodType") },
        ]}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t("pages.patients.edit") : t("pages.patients.add")}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label={t("form.name")} name="name" value={form.name} onChange={set("name")} required />
          <FormField label={t("form.email")} name="email" type="email" value={form.email} onChange={set("email")} />
          <FormField label={t("form.phone")} name="phone" value={form.phone} onChange={set("phone")} required />
          <FormField label={t("form.birthDate")} name="birthDate" type="date" value={form.birthDate} onChange={set("birthDate")} />
          <FormField
            label={t("form.gender")}
            name="gender"
            value={form.gender}
            onChange={set("gender")}
            options={[
              { value: "Laki-laki", label: t("form.genderMale") },
              { value: "Perempuan", label: t("form.genderFemale") },
            ]}
          />
          <FormField label={t("form.address")} name="address" value={form.address} onChange={set("address")} />
          <FormField label={t("form.bloodType")} name="bloodType" value={form.bloodType} onChange={set("bloodType")} />
          <FormField label={t("form.allergies")} name="allergies" value={form.allergies} onChange={set("allergies")} />
          <FormField label={t("form.notes")} name="notes" value={form.notes} onChange={set("notes")} rows={2} />
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 font-semibold text-white">
            {t("common.save")}
          </button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
