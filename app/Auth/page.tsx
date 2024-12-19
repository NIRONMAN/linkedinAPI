


'use client';

export default function Page() {
    const handleLogin = () => {
        const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=w_member_social`;
        window.location.href = linkedInAuthUrl;
    };

    return (
        <button
            style={{
                backgroundColor: '#0073b1',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
            }}
            onClick={handleLogin}
        >
            Login with LinkedIn
        </button>
    );
}

