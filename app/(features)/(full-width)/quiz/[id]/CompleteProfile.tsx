import { QuizRoutineBg, SkinwiseLogoLight } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CompleteProfileCard } from "./ProfileComplete";
import Link from "next/link";

const CompleteProfile = () => {
  return (
    <main>
      <Link prefetch={false} href={"/"}>
        <PageHeader
          title=""
          customDesc={
            <Image
              alt="img-quiz-result-cover"
              src={SkinwiseLogoLight}
              width={200}
              height={200}
            />
          }
          showBackgroundImg={true}
          backgroundImage={QuizRoutineBg}
        />
      </Link>
      <Wrapper className="flex">
        <CompleteProfileCard />
      </Wrapper>
    </main>
  );
};

export default CompleteProfile;
