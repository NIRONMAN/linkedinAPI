"use client";
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Page() {
  const { user } = useUser();
  const [post, setPost] = useState('Hi, this is a test post');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    try {
        const token=  localStorage.getItem("token");
      const response = await fetch('/api/sharepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: post ,token}),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      setPost('');
      alert('Posted successfully to LinkedIn!');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };
  const handleLogin = () => {
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=email%20w_member_social%20profile%20openid`;
    window.location.href = linkedInAuthUrl;
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Share Post to LinkedIn</h1>
        <button
        className=' my-4'
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
            Authenticate with LinkedIn
        </button>

      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Write your post here..."
        className="w-full max-w-lg h-32 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />
      {
        user?(<button
            onClick={handlePost}
            disabled={isPosting || !post.trim()}
            className={`px-6 py-2 text-white font-medium rounded-md transition ${
              isPosting || !post.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPosting ? 'Posting...' : 'Post to LinkedIn'}
          </button>):<Link href={"/"}>Log in first</Link>
      }
    </div>
  );
}
