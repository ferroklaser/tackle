import { onSnapshot, collection, where, query, documentId } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FIREBASE_DATABASE } from "../firebaseConfig";
import { useState, useEffect } from "react";

export function useWeeklyFocusData() {
    const { user } = useAuth();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        setLoading(true);

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
            collection(FIREBASE_DATABASE, "users", user.uid, "dailyUsage"), 
            where (documentId(), "in", weekDates));
        
        const unsubscribe = onSnapshot(q, snapshot => {
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
            })
            setData(chartData);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [user])

    return { data, loading };
}