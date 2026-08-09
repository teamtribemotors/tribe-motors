"use client";

import { useState, useEffect } from 'react';
import { FulfillmentRequest, dummyFulfillment } from './dummy-data';

const STORAGE_KEY = 'tribe_motors_fulfillment';

export function useFulfillment() {
    const [requests, setRequests] = useState<FulfillmentRequest[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setRequests(JSON.parse(stored));
        } else {
            setRequests(dummyFulfillment);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyFulfillment));
        }
        setIsLoaded(true);
    }, []);

    const addRequest = (request: FulfillmentRequest) => {
        const updated = [...requests, request];
        setRequests(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const updateRequest = (id: string, updatedFields: Partial<FulfillmentRequest>) => {
        const updated = requests.map(r => r.id === id ? { ...r, ...updatedFields } : r);
        setRequests(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteRequest = (id: string) => {
        const updated = requests.filter(r => r.id !== id);
        setRequests(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const getRequest = (id: string) => {
        return requests.find(r => r.id === id);
    };

    return {
        requests,
        isLoaded,
        addRequest,
        updateRequest,
        deleteRequest,
        getRequest
    };
}
