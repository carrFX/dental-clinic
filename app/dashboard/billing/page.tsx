"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CrudTable } from "@/components/dashboard/CrudTable";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { invoiceStatusKey } from "@/lib/i18n/status-label";
import { formatCurrency } from "@/lib/utils";
import type { Invoice } from "@/lib/types";

const empty: Omit<Invoice, "id"> = {
  patientId: "",
  patientName: "",
  treatmentName: "",
  amount: 0,
  paid: 0,
  status: "Belum Bayar",
  date: new Date().toISOString().slice(0, 10),
  method: "-",
};

const invoiceStatuses = ["Lunas", "Sebagian", "Belum Bayar"] as const;

export default function BillingPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const { t } = useLocale();
  const { confirm } = useConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [form, setForm] = useState(empty);

  const set = (key: keyof typeof form) => (v: string) => {
    setForm((f) => {
      const next = {
        ...f,
        [key]: key === "amount" || key === "paid" ? Number(v) || 0 : v,
      };
      if (key === "patientId") {
        const p = data.patients.find((x) => x.id === v);
        if (p) next.patientName = p.name;
      }
      return next;
    });
  };

  return (
    <DashboardShell title={t("pages.billing.title")} subtitle={t("pages.billing.subtitle")}>
      <CrudTable
        title={t("pages.billing.list")}
        data={data.invoices}
        columns={[
          { key: "patientName", label: t("form.patient") },
          { key: "treatmentName", label: t("form.treatment") },
          { key: "amount", label: t("form.amount"), render: (i) => formatCurrency(i.amount) },
          { key: "paid", label: t("form.paid"), render: (i) => formatCurrency(i.paid) },
          {
            key: "status",
            label: t("form.status"),
            render: (i) => <StatusBadge status={i.status} type="invoice" />,
          },
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
            message: t("confirm.delete.invoice"),
            confirmLabel: t("confirm.btn.delete"),
            onConfirm: () => deleteItem("invoices", item.id),
          })
        }
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t("pages.billing.edit") : t("pages.billing.add")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) updateItem("invoices", editing.id, form);
            else addItem("invoices", form);
            setModalOpen(false);
          }}
          className="space-y-4"
        >
          <FormField
            label={t("form.patient")}
            name="patientId"
            value={form.patientId}
            onChange={set("patientId")}
            options={[
              { value: "", label: t("form.select") },
              ...data.patients.map((p) => ({ value: p.id, label: p.name })),
            ]}
          />
          <FormField
            label={t("form.treatment")}
            name="treatmentName"
            value={form.treatmentName}
            onChange={set("treatmentName")}
          />
          <FormField label={t("form.totalRp")} name="amount" type="number" value={form.amount} onChange={set("amount")} />
          <FormField label={t("form.paidRp")} name="paid" type="number" value={form.paid} onChange={set("paid")} />
          <FormField
            label={t("form.status")}
            name="status"
            value={form.status}
            onChange={set("status")}
            options={invoiceStatuses.map((s) => ({
              value: s,
              label: t(invoiceStatusKey(s)),
            }))}
          />
          <FormField label={t("form.date")} name="date" type="date" value={form.date} onChange={set("date")} />
          <FormField label={t("form.method")} name="method" value={form.method} onChange={set("method")} />
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 font-semibold text-white">
            {t("common.save")}
          </button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
