'use client';
import { useEffect } from 'react';
import { useVeltClient, useCurrentUser } from '@veltdev/react';

// [Chat SDK bot] The bot user. Adding it to the contact list makes it appear in
// the @-mention dropdown so users can mention it in comments.
const BOT_CONTACT = {
  userId: 'velt-bot',
  name: 'Velt Bot',
  email: 'bot@velt.dev',
};

/**
 * Registers the bot as a mentionable contact. Uses `merge: true` so the bot is
 * added alongside the document's existing users rather than replacing them.
 */
export default function VeltInitializeBotContact() {
  const { client } = useVeltClient();
  const veltUser = useCurrentUser();

  useEffect(() => {
    if (!client || !veltUser) return;
    try {
      const contactElement = client.getContactElement();
      contactElement?.updateContactList([BOT_CONTACT], { merge: true });
    } catch {
      // no-op: contact API unavailable
    }
  }, [client, veltUser]);

  return null;
}
