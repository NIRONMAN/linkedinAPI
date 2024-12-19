import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized/User id not found.' }, { status: 401 });
    }

    const { content, token } = await request.json();

    if (!content) {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      console.error('LinkedIn API profile fetch error:', errorData);
      return NextResponse.json({ message: 'Failed to fetch LinkedIn profile', error: errorData }, { status: 500 });
    }

    const profileData = await profileResponse.json();
    const providerUserId = profileData.sub;

    if (!providerUserId) {
      return NextResponse.json({ message: 'LinkedIn user ID not found' }, { status: 400 });
    }

    console.log('LinkedIn provider user ID:', providerUserId);

    const linkedInResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: `urn:li:person:${providerUserId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: content },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });

    if (!linkedInResponse.ok) {
      const errorData = await linkedInResponse.json();
      console.error('LinkedIn API post error:', errorData);
      return NextResponse.json({ message: 'LinkedIn API error', error: errorData }, { status: 500 });
    }

    const responseData = await linkedInResponse.json();
    return NextResponse.json({
      message: 'Posted successfully',
      data: responseData,
    }, { status: 200 });

  } catch (error) {
    console.error('Error posting to LinkedIn:', error);
    return NextResponse.json({
      message: 'Failed to post to LinkedIn',
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
