'use client';

import { useEffect, useState } from 'react';

export default function useFinanceData(startDate, endDate) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/finance');
        const json = await res.json();

        let filtered = json;

        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);

          filtered = json.filter((d) => {
            const current = new Date(d.data);
            return current >= start && current <= end;
          });
        }

        setData(filtered);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { data, loading };
}
