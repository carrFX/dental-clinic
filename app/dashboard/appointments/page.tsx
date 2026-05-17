"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CrudTable } from "@/components/dashboard/CrudTable";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import { appointmentStatusKey } from "@/lib/i18n/status-label";
import type { Appointment } from "@/lib/types";

const emptyAppt: Omit<Appointment, "id"> = {
  patientId: "",
  patientName: "",
  doctorId: "",
  doctorName: "",
  treatmentId: "",
  treatmentName: "",
  date: new Date().toISOString().slice(0, 10),
  time: "09:00",
  status: "Menunggu",
  notes: "",
};

const statusValues = ["Menunggu", "Diproses", "Selesai", "Dibatalkan"] as const;

export default function AppointmentsPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const { t } = useLocale();
  const { confirm } = useConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [form, setForm] = useState(emptyAppt);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyAppt);
    setModalOpen(true);
  };

  const openEdit = (item: Appointment) => {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateItem("appointments", editing.id, form);
    else addItem("appointments", form);
    setModalOpen(false);
  };

  const set = (key: keyof typeof form) => (v: string) => {
    setForm((f) => {
      const next = { ...f, [key]: v };
      if (key === "patientId") {
        const p = data.patients.find((x) => x.id === v);
        if (p) next.patientName = p.name;
      }
      if (key === "doctorId") {
        const d = data.doctors.find((x) => x.id === v);
        if (d) next.doctorName = d.name;
      }
      if (key === "treatmentId") {
        const tr = data.treatments.find((x) => x.id === v);
        if (tr) next.treatmentName = tr.name;
      }
      return next;
    });
  };

  return (
    <DashboardShell
      title={t("pages.appointments.title")}
      subtitle={t("pages.appointments.subtitle")}
    >
      <CrudTable
        title={t("pages.appointments.list")}
        data={data.appointments}
        columns={[
          { key: "patientName", label: t("form.patient") },
          { key: "doctorName", label: t("form.doctor") },
          { key: "treatmentName", label: t("form.treatment") },
          { key: "date", label: t("form.date") },
          { key: "time", label: t("form.time") },
          {
            key: "status",
            label: t("form.status"),
            render: (a) => (
              <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium">
                {t(appointmentStatusKey(a.status))}
              </span>
            ),
          },
        ]}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={(item) =>
          confirm({
            title: t("confirm.title.delete"),
            message: t("confirm.delete.appointment"),
            confirmLabel: t("confirm.btn.delete"),
            onConfirm: () => deleteItem("appointments", item.id),
          })
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t("pages.appointments.edit") : t("pages.appointments.add")}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label={t("form.patient")}
            name="patientId"
            value={form.patientId}
            onChange={set("patientId")}
            options={[
              { value: "", label: t("form.selectPatient") },
              ...data.patients.map((p) => ({ value: p.id, label: p.name })),
            ]}
            required
          />
          <FormField
            label={t("form.doctor")}
            name="doctorId"
            value={form.doctorId}
            onChange={set("doctorId")}
            options={[
              { value: "", label: t("form.selectDoctor") },
              ...data.doctors.map((d) => ({ value: d.id, label: d.name })),
            ]}
            required
          />
          <FormField
            label={t("form.treatment")}
            name="treatmentId"
            value={form.treatmentId}
            onChange={set("treatmentId")}
            options={[
              { value: "", label: t("form.selectTreatment") },
              ...data.treatments.map((tr) => ({ value: tr.id, label: tr.name })),
            ]}
            required
          />
          <FormField label={t("form.date")} name="date" type="date" value={form.date} onChange={set("date")} required />
          <FormField label={t("form.time")} name="time" type="time" value={form.time} onChange={set("time")} required />
          <FormField
            label={t("form.status")}
            name="status"
            value={form.status}
            onChange={set("status")}
            options={statusValues.map((s) => ({
              value: s,
              label: t(appointmentStatusKey(s)),
            }))}
          />
          <FormField label={t("form.notes")} name="notes" value={form.notes} onChange={set("notes")} rows={2} />
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 font-semibold text-white">
            {t("common.save")}
          </button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
