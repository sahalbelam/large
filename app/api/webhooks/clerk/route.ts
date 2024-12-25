import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/utils/db'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  try {
    // Get the raw body
    const rawBody = await req.text();
    console.log('Received webhook body:', rawBody);

    const wh = new Webhook(SIGNING_SECRET);

    let evt: WebhookEvent;

    try {
      // Verify the webhook
      evt = wh.verify(rawBody, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return new NextResponse('Webhook verification failed', { status: 400 });
    }

    // Handle the webhook event
    if (evt.type === 'user.created') {
      const { id, username } = evt.data;
      try {
        await prisma.user.create({
          data: {
            clerk_id: id,
            username: username || ''
          },
        });
        return new NextResponse('User created', { status: 200 });
      } catch (err) {
        console.error('Database error:', err);
        return new NextResponse('Database error', { status: 500 });
      }
    }

    return new NextResponse('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return new NextResponse(
      `Webhook error: ${err instanceof Error ? err.message : 'Unknown error'}`, 
      { status: 400 }
    );
  }
}