import { Suspense } from "react";
import Loading from "./loading";

export default function AlbumLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}
