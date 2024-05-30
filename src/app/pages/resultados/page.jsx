// src/app/resultados/page.js
"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const ResultsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2/?search=${searchParams.get('search')}`);
        const data = await response.json();
        setResults(data.applist.apps);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div>
      <h1>Resultados de búsqueda</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.appid}>
              <h2>{result.name}</h2>
              {/* Agrega más información del juego aquí */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default ResultsPage;