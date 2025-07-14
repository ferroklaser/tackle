import { FIREBASE_DATABASE } from "../firebaseConfig";
import { useState } from "react";
import { getDocs, collection, where, query, documentId } from "firebase/firestore";

export const getWeeklyUsage = async (userID) => {
    try {
        const today = new Date();
        const dayOfWeek = today.getDay();

        const sunday = new Date(today);
        sunday.setDate(today.getDate() - dayOfWeek);

        const weekDates = Array.from({ length: 7 }, (e, i) => {
            const d = new Date(sunday);
            d.setDate(d.getDate() + i);
            return d.toISOString().slice(0, 10);
        });

        const q = query(
            collection(FIREBASE_DATABASE, 'users', userID, 'dailyUsage'),
            where (documentId(), "in", weekDates)
        );

        const snapshot = await getDocs(q)
        const usageMap = {};
        snapshot.forEach(doc => {
            const totalSeconds = doc.data().totalSeconds || 0;
            usageMap[doc.id] = totalSeconds;
        });

        const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const chartData = weekDates.map(data => {
            const date = new Date(data);
            const dayIndex = date.getDay();
            return {
                label: daysOfWeek[dayIndex],
                value: (usageMap[data] || 0) / 3600
            }
        });
        return chartData;
    } catch (error) {
        console.log('Error getting weekly usage:', error);
    }
}