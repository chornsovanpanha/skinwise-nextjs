import { QuizRoutineBg, SkinwiseLogoLight } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CompleteProfileCard } from "./ProfileComplete";

const CompleteProfile = () => {
  return (
    <main>
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
      <Wrapper className="flex">
        <CompleteProfileCard />
      </Wrapper>
    </main>
  );
};

export default CompleteProfile;
