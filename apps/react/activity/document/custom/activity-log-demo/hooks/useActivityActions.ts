'use client';

import { useCallback } from 'react';
import { useActivityUtils } from '@veltdev/react';

/**
 * [Velt] Thin wrapper around the Activity element used to emit CUSTOM activity
 * records for app-level events (things Velt doesn't track automatically).
 *
 * These show up in the same unified feed as comment/reaction activities,
 * giving the document a single running log of everything that happens.
 */
export function useActivityActions() {
  // [Velt] Access the activity element. Returns undefined until Velt is ready.
  const activityElement = useActivityUtils();

  // [Velt] Custom activity: the document's review status changed.
  // featureType:'custom' REQUIRES targetEntityId. Template tokens ({{...}})
  // must have matching keys in displayMessageTemplateData.
  const logStatusChanged = useCallback(
    async (status: string) => {
      await activityElement?.createActivity({
        featureType: 'custom',
        actionType: 'custom',
        targetEntityId: 'document-status',
        displayMessageTemplate: '{{actionUser.name}} marked the document as {{status}}',
        displayMessageTemplateData: { status },
      });
    },
    [activityElement],
  );

  // [Velt] Custom activity: the document was shared.
  const logShared = useCallback(async () => {
    await activityElement?.createActivity({
      featureType: 'custom',
      actionType: 'custom',
      targetEntityId: 'document-share',
      displayMessageTemplate: '{{actionUser.name}} shared the document',
    });
  }, [activityElement]);

  return { logStatusChanged, logShared };
}
