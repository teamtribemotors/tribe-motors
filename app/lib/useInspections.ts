"use client";

import { useState, useEffect } from 'react';
import { Inspection, dummyInspections } from './dummy-data';

const STORAGE_KEY = 'tribe_motors_inspections';

export function useInspections() {
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setInspections(JSON.parse(stored));
        } else {
            setInspections(dummyInspections);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyInspections));
        }
        setIsLoaded(true);
    }, []);

    const addInspection = (inspection: Inspection) => {
        const updated = [...inspections, inspection];
        setInspections(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const updateInspection = (id: string, updatedFields: Partial<Inspection>) => {
        const updated = inspections.map(i => i.id === id ? { ...i, ...updatedFields } : i);
        setInspections(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteInspection = (id: string) => {
        const updated = inspections.filter(i => i.id !== id);
        setInspections(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const getInspection = (id: string) => {
        return inspections.find(i => i.id === id);
    };

    return {
        inspections,
        isLoaded,
        addInspection,
        updateInspection,
        deleteInspection,
        getInspection
    };
}
