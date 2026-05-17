"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import initialData from "@/data/initial-data.json";
import type { ClinicData, EntityKey } from "@/lib/types";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/client-storage";

type EntityItem<T extends EntityKey> = ClinicData[T][number];

interface DataContextValue {
  data: ClinicData;
  isLoading: boolean;
  addItem: <T extends EntityKey>(
    entity: T,
    item: Omit<EntityItem<T>, "id"> & { id?: string }
  ) => void;
  updateItem: <T extends EntityKey>(
    entity: T,
    id: string,
    updates: Partial<EntityItem<T>>
  ) => void;
  deleteItem: <T extends EntityKey>(entity: T, id: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

const defaultData = initialData as ClinicData;

function isValidClinicData(value: unknown): value is ClinicData {
  if (!value || typeof value !== "object") return false;
  const v = value as ClinicData;
  return (
    Array.isArray(v.patients) &&
    Array.isArray(v.doctors) &&
    Array.isArray(v.treatments) &&
    Array.isArray(v.appointments) &&
    Array.isArray(v.inventory) &&
    Array.isArray(v.invoices)
  );
}

function loadClinicData(): ClinicData {
  const stored = readStorage<ClinicData>(STORAGE_KEYS.clinicData);
  if (stored && isValidClinicData(stored)) return stored;
  return defaultData;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ClinicData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    setData(loadClinicData());
    hydrated.current = true;
    setIsLoading(false);
  }, []);

  const persist = useCallback((next: ClinicData) => {
    setData(next);
    writeStorage(STORAGE_KEYS.clinicData, next);
  }, []);

  useEffect(() => {
    if (!hydrated.current || isLoading) return;
    writeStorage(STORAGE_KEYS.clinicData, data);
  }, [data, isLoading]);

  const addItem = useCallback(
    <T extends EntityKey>(
      entity: T,
      item: Omit<EntityItem<T>, "id"> & { id?: string }
    ) => {
      const id =
        item.id ??
        `${entity.slice(0, 1)}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
      const newItem = { ...item, id } as EntityItem<T>;
      setData((prev) => {
        const next = {
          ...prev,
          [entity]: [...prev[entity], newItem],
        };
        writeStorage(STORAGE_KEYS.clinicData, next);
        return next;
      });
    },
    []
  );

  const updateItem = useCallback(
    <T extends EntityKey>(
      entity: T,
      id: string,
      updates: Partial<EntityItem<T>>
    ) => {
      setData((prev) => {
        const next = {
          ...prev,
          [entity]: prev[entity].map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        };
        writeStorage(STORAGE_KEYS.clinicData, next);
        return next;
      });
    },
    []
  );

  const deleteItem = useCallback(<T extends EntityKey>(entity: T, id: string) => {
    setData((prev) => {
      const next = {
        ...prev,
        [entity]: prev[entity].filter((item) => item.id !== id),
      };
      writeStorage(STORAGE_KEYS.clinicData, next);
      return next;
    });
  }, []);

  const resetData = useCallback(() => {
    writeStorage(STORAGE_KEYS.clinicData, defaultData);
    setData(defaultData);
  }, []);

  return (
    <DataContext.Provider
      value={{ data, isLoading, addItem, updateItem, deleteItem, resetData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
