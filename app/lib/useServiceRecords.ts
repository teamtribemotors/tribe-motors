"use client";

import { useState, useEffect } from 'react';
import { ServiceRecord, dummyStaffRecords } from './dummy-data';

const STORAGE_KEY = 'tribe_motors_service_records';

export function useServiceRecords() {
    const [records, setRecords] = useState<ServiceRecord[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setRecords(JSON.parse(stored));
        } else {
            setRecords(dummyStaffRecords);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyStaffRecords));
        }
        setIsLoaded(true);
    }, []);

    const addRecord = (record: ServiceRecord) => {
        const updated = [...records, record];
        setRecords(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const updateRecord = (id: string, updatedFields: Partial<ServiceRecord>) => {
        const updated = records.map(r => r.id === id ? { ...r, ...updatedFields } : r);
        setRecords(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteRecord = (id: string) => {
        const updated = records.filter(r => r.id !== id);
        setRecords(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const getRecord = (id: string) => {
        return records.find(r => r.id === id);
    };

    return {
        records,
        isLoaded,
        addRecord,
        updateRecord,
        deleteRecord,
        getRecord
    };
}
