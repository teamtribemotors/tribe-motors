"use client";

import { useState, useEffect } from 'react';
import { Vehicle, dummyInventory } from './dummy-data';

const STORAGE_KEY = 'tribe_motors_inventory';

export function useInventory() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Run only on client
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setVehicles(JSON.parse(stored));
        } else {
            setVehicles(dummyInventory);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyInventory));
        }
        setIsLoaded(true);
    }, []);

    const addVehicle = (vehicle: Vehicle) => {
        const newVehicles = [vehicle, ...vehicles];
        setVehicles(newVehicles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
    };

    const updateVehicle = (id: string, updatedVehicle: Partial<Vehicle>) => {
        const newVehicles = vehicles.map(v =>
            v.id === id ? { ...v, ...updatedVehicle } : v
        );
        setVehicles(newVehicles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
    };

    const deleteVehicle = (id: string) => {
        const newVehicles = vehicles.filter(v => v.id !== id);
        setVehicles(newVehicles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
    };

    const getVehicle = (id: string) => {
        return vehicles.find(v => v.id === id);
    };

    return {
        vehicles,
        isLoaded,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        getVehicle
    };
}
