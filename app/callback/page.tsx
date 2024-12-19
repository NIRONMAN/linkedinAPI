'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const CallbackContent = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [accessToken, setAccessToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (code) {
            fetch('/api/linkedin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                    localStorage.setItem("token", data.access_token);
                })
                .catch((error) => console.error('Error fetching access token:', error));
        }
    }, [code]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            {accessToken ? (
                <button className='bg-blue-600 rounded-lg p-2 text-white' onClick={() => router.push("/Dashboard")}>
                    Start Posting
                </button>
            ) : (
                <p>Exchanging code for access token...</p>
            )}
        </div>
    );
};

export default function Callback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
