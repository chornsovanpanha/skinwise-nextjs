import { LogoutAction } from "@/actions/authentication/logout.action";
import { defaultState } from "@/app/(auth)/components/SocialButton";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { defaultUserState, userAtom } from "@/lib/atom/user.atom";
import { auth } from "@/lib/firebase/config";
import { clearGoogleLogout } from "@/utils/social/clear-auth";
import { signOut } from "firebase/auth";
import { useSetAtom } from "jotai";
import { startTransition, useState } from "react";

const MobileLogout = () => {
  const [mutateState, setMutatestate] = useState(defaultState);
  const setUserAtom = useSetAtom(userAtom);
  const { show } = useToast();
  const handleLogout = async () => {
    setMutatestate((pre) => ({
      ...pre,
      loading: true,
    }));
    await clearGoogleLogout();
    await signOut(auth);

    const { error } = await LogoutAction();
    if (!error) {
      //Case  success
      startTransition(() => {
        setMutatestate(defaultState);
        setUserAtom(defaultUserState);
        window.location.href = "/login";
      });
    } else {
      console.error(error);
      show({
        type: "error",
        message: error,
      });

      setMutatestate((pre) => ({
        ...pre,
        error: error as string,
        loading: false,
      }));
    }
  };
  return (
    <main className="my-4 z-50">
      {mutateState.loading && <Loading />}
      <Button
        className="text-error-main w-full bg-error-background hover:bg-error-background/80 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </main>
  );
};

export default MobileLogout;
