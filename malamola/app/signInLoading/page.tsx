// TO BE FIXED: This component is not working as expected. It is not redirecting to the intended route after sign-in.

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";

const LoadingAfterSignIn = () => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  //   const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);

    if (session?.user) {
      (async () => {
        // begin merging of cart if session is authenticated
        await mergeAnonymousCartIntoUserCart(session.user.id);
        setLoading(false);

        // Get the intended route before initiating sign-in
        const url = new URL(location.href);
        const intendedRoute =
          (url.searchParams.get("callbackUrl") as string) || "/"; // Default to '/' if no callbackUrl
        // Redirect back to the previous page before signIn() once done
        router.replace(intendedRoute);
        // router.back();
      })();
    }
  }, [session, router]);

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex items-center">
      {session && loading && (
        <span className="loading loading-ring loading-lg" />
      )}
    </div>
  );
};

export default LoadingAfterSignIn;
