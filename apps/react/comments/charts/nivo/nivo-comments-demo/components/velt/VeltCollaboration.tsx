"use client";
import { useVeltClient, VeltComments } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();

  // [Velt] Sign out user when user logs out, getting user login state from host app
  useEffect(() => {
    if (isUserLoggedIn === false && client) {
      client.signOutUser();
    }
  }, [isUserLoggedIn, client]);

  return (
    <>
      <VeltInitializeDocument />
      {/* [Velt] Comments root. Comments are created only via the per-data-point
          tools rendered by VeltNivoChartComments (revealed on chart hover or
          while comment mode is on); those run their own chart-comment flow.
          allowedElementIds points at an id that exists nowhere on the page, so
          freestyle comment-mode clicks (chart whitespace included) never
          create a pin; nivo containers hide the SDK pin portal, which would
          leave such a composer unanchored at the page origin.
          priority adds P0-P2, autoCategorize lets AI label comments,
          commentIndex numbers pins in creation order. */}
      <VeltComments
        priority={true}
        autoCategorize={true}
        commentIndex={true}
        textMode={false}
        allowedElementIds={['veltChartCommentsOnly']}
      />

      <VeltCustomization />
    </>
  );
}
