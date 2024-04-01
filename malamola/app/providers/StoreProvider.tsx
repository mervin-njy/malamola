"use client";

import { Provider } from "react-redux"; // wrap around everything to provide redux store to all components
import { store } from "@/app/state/store"; // import store from state folder

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
