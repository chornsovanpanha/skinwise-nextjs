"use client";
import { LoginAction } from "@/actions/authentication/login.action";
import Loading from "@/app/loading";
import { FacebookSvg } from "@/assets";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { userAtom } from "@/lib/atom/user.atom";
import { auth } from "@/lib/firebase/config";
import { clearGoogleLogout } from "@/utils/social/clear-auth";
import { FirebaseError } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { redirect } from "next/navigation";
import { startTransition, useState } from "react";

export const defaultState = {
  loading: false,
  error: "",
};
const SocialButton = () => {
  const setUserAtom = useSetAtom(userAtom);

  const [mutateState, setMutatestate] = useState(defaultState);
  const { show } = useToast();

  const handleGoogleLogin = async () => {
    try {
      await clearGoogleLogout();
      const googleprovider = new GoogleAuthProvider();

      googleprovider.addScope("email");
      googleprovider.addScope("profile");

      const result = await signInWithPopup(auth, googleprovider);

      console.log("Google result", result);
      await result.user.reload();
      const idToken = await result.user?.getIdToken();

      const userData = result.user?.providerData;
      const photoUrl = userData?.[0]?.photoURL ?? "";
      if (result.user && idToken) {
        setMutatestate((pre) => ({ ...pre, loading: true }));

        const { data, error, success } = await LoginAction({
          email: userData?.[0]?.email ?? "",
          name: result?.user?.displayName ?? "",
          password: "gmail",
          loginBy: "gmail",
          idToken: idToken,
          photoUrl,
        });

        if (data && success) {
          console.log("Response from server", data);
          startTransition(() => {
            setUserAtom({ ...data, id: data?.id?.toString() });
            setMutatestate(defaultState);
            show({
              type: "success",
              message: `Welcome back ${data?.name}`,
            });
            redirect("/");
          });
        } else {
          throw new Error(error!);
        }
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (
          err.code === "auth/popup-closed-by-user" ||
          err.code === "auth/cancelled-popup-request"
        ) {
          console.log("User cancelled the popup login.");
          setMutatestate((pre) => ({ ...pre, loading: false }));
          return;
        }

        show({
          type: "error",
          message: err.message,
        });
        setMutatestate((pre) => ({
          ...pre,
          error: err.message,
          loading: false,
        }));
      } else {
        console.error(err);
        show({
          type: "error",
          message: "Login Failed",
        });
        setMutatestate((pre) => ({
          ...pre,
          error: "Login failed",
          loading: false,
        }));
      }
    } finally {
      setMutatestate((pre) => ({ ...pre, loading: false }));
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const facebookprovider = new FacebookAuthProvider();
      facebookprovider.addScope("email");
      facebookprovider.addScope("public_profile");

      const result = await signInWithPopup(auth, facebookprovider);
      await result.user.reload();
      const idToken = await result.user?.getIdToken();

      const userData = result.user?.providerData;
      const photoUrl = userData?.[0]?.photoURL ?? "";

      if (result.user && idToken) {
        setMutatestate((pre) => ({ ...pre, loading: true }));

        const { data, error, success } = await LoginAction({
          email: userData?.[0]?.email ?? "",
          name: result?.user?.displayName ?? "",
          password: "facebook",
          loginBy: "facebook",
          idToken: idToken,
          photoUrl,
        });

        if (data && success) {
          startTransition(() => {
            setUserAtom({ ...data, id: data?.id?.toString() });
            setMutatestate(defaultState);
            show({
              type: "success",
              message: `Welcome back ${data?.name}`,
            });
            redirect("/");
          });
        } else {
          throw new Error(error!);
        }
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (
          err.code === "auth/popup-closed-by-user" ||
          err.code === "auth/cancelled-popup-request"
        ) {
          console.log("User cancelled the popup login.");
          setMutatestate((pre) => ({ ...pre, loading: false }));
          return;
        }

        show({
          type: "error",
          message: err.message,
        });
        setMutatestate((pre) => ({
          ...pre,
          error: err.message,
          loading: false,
        }));
      } else {
        console.error(err);
        show({
          type: "error",
          message: "Login Failed",
        });
        setMutatestate((pre) => ({
          ...pre,
          error: "Login failed",
          loading: false,
        }));
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {mutateState.loading && <Loading />}
      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleGoogleLogin}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">Login with Google</span>
      </Button>
      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleFacebookLogin}
      >
        <Image src={FacebookSvg} alt="facebook-svg" height={20} width={20} />
        <span className="sr-only">Login with Meta</span>
      </Button>
    </div>
  );
};

export default SocialButton;
