import { Suspense } from "react";
import Loading from "./loading";

export default function PlaylistLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}
