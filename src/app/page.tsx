"use client";

import { api } from "../../convex/_generated/api";
import { useQueryClient } from "@tanstack/react-query";
import { useObservableSyncedQuery } from "@legendapp/state/sync-plugins/tanstack-react-query";
import { convexQuery } from "@convex-dev/react-query";
import { observer } from "@legendapp/state/react";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

const Home = observer(() => {
  const queryClient = useQueryClient();
  const state$ = useObservableSyncedQuery({
    queryClient,
    query: convexQuery(api.tasks.get, {}),
    persist: {
      name: "persistKey",
      // Choose where to save it
      plugin: ObservablePersistLocalStorage,
    },
  });

  // Call get to start the sync
  const state = state$.get();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {state$
        .get()
        ?.map((item, index) => (
          <div key={index}>{(item as { text: string }).text}</div>
        ))}
    </main>
  );
});

export default Home;
