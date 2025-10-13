"use server";
import { skinConcernDummy } from "@/app/(features)/(main)/profile/data";
import geminiAi from "@/lib/gemini/google-gemini";
import { ResponseAnalyse } from "@/types/response";
import { fromGeminiToJson } from "@/utils/formatter";
type AnalyseParams = {
  productPrimaryName?: string;
  productSecondaryName?: string;
  productBrandPrimary?: string;
  productBrandSecondary?: string;
  keyPrimary?: string;
  keySecondary?: string;
};
type Params = {
  skinConcerns: string;
  userSkinType?: string;
  name: string;
};
export const getProductUserAnalyse = async ({
  skinConcerns,
  userSkinType,
  name,
}: Params) => {
  console.log("Analysis data is", userSkinType, name, skinConcerns);
  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
Please analysis this skin care product giving score by provide :
Now start:
Product Name: is ${name}
User Skin Type: ${userSkinType ?? "Unknown"}
User Main Concern: ${skinConcerns ?? ""}

Pls response back as 1 value JSON object value

also dont answer back i only need a code
example response: remove word json as well
response the same pattern example

scoreDesc must response the same pattern as:

condition score is :

(if there a pattern like bad give a 50 score or less pls unless it good  would be fine base on the condition product, user skin type and concern as well )


65-0 :Bad Match
70-75  Normal Match
80-95: Good Match
95- 100 :Perfect Match
And also a short description like:
pls response in this pattern 1 json value only

average score must be  50 - 90  
description score and short desc must be ( 50 letters or less)
{   
“score”:"",
 "scoreDesc":"" ,
“shortDesc:""

  } `,
  });

  return fromGeminiToJson(response.text ?? "");
};

export const getUserIngredientAnalyse = async ({
  skinConcerns,
  userSkinType,
  name,
}: Params) => {
  console.log("Analysis data is", userSkinType);
  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
Please analysis this skin care ingredient giving score by provide :
Now start:
Ingredient name ${name}
User Skin Type: ${userSkinType ?? "Oily"}
User Main Concern: ${skinConcerns ?? ""}
also dont answer back i only need a code
example response: remove word json as well
response the same pattern example
condition score is :

(if there a pattern like bad give a 50 score or less pls unless it good  would be fine base on the condition product, user skin type and concern as well )


65-0 :Bad Match
70-75  Normal Match
80-95: Good Match
95- 100 :Perfect Match
And also a short description like:
pls response in this pattern 1 json value only

average score must be  50 - 90  

description score and short desc must be ( 50 letters or less)
{   
“score”:"",
 "scoreDesc":"" ,
“shortDesc:""

  }`,
  });

  return fromGeminiToJson(response.text ?? "");
};

export const analysisProductComparison = async (
  {
    keyPrimary,
    keySecondary,
    productBrandPrimary,
    productBrandSecondary,
    productPrimaryName,
    productSecondaryName,
  }: AnalyseParams,
  userId?: string
): Promise<ResponseAnalyse | null> => {
  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
Please analysis summaries between these two products giving :
example:

-Summary What they are ( 25 words or less )
-Best for ( 60 words or less )
-Feature (Special feat of these two products )
i will provide detail  bellow:

key active between these two ingredients

primary: ${keyPrimary} ingredient 
secondary: ${keySecondary} ingreident

Product name:

primary: ${productPrimaryName}
secondary: ${productSecondaryName}

Brand name :

primary: ${productBrandPrimary}
secondary: ${productBrandSecondary}


response back as json object key value  summary, recommendation, feature  follow the pattern 
Pls response back as 1 value combine together JSON object value
also dont answer back i only need a code
remove word 1 object json only 1 object value only:
example response pattern : 
{   
"summary":They’re both likely to be good for dry skin,
"recommendation":"They're both likely to be good for anti aging, dry skin, brightening skin, sensitive skin and scar healing",
"feature":”They both do not contain any harsh alcohols, common allergens, fragrances or parabens
”,} `,
  });

  if (userId) return fromGeminiToJson(response.text ?? "");

  return null;
};

export const analysisUserQuiz = async ({ answers }: { answers: string[] }) => {
  const skinConcerns = skinConcernDummy?.map((data) => data.value)?.toString();
  const response = await geminiAi.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
Please analysis user skin type and skin concern giving

for skin type only choose between :
Normal

Well-balanced (not too oily or too dry)

Few imperfections

Barely visible pores

Healthy, radiant complexion

 Dry

Lacks moisture and natural oils

Feels tight, rough, or flaky

May show more visible fine lines

Often dull in appearance

Oily

Produces excess sebum (oil)

Shiny appearance, especially on T-zone (forehead, nose, chin)

Enlarged pores

Prone to acne and blackheads

Combination

Mix of both dry and oily areas

Typically oily in the T-zone, dry or normal on cheeks

Requires balanced care for both areas

Sensitive

Easily irritated or inflamed

Reacts to products, fragrances, or weather changes

May feel itchy, red, or burning.

I will provide quiz that user has selected

here this are there answer

${answers?.toString()}

i want skinType , skinTypeDesc, SkinConcerns ( only 2 data max )

for skinType:
enum SkinType {
  OILY
  DRY
  COMBINATION
  NORMAL
  SENSITIVE
} following this 
also dont answer back i only need a code
example response: remove word json as well

for  SkinConcerns ( only 2 data max ): please use from ${skinConcerns?.toString()}
pls response in this pattern 1 json format only
response the same pattern example:
{   
skinType:Oily,
 "skinTypeDesc":"You skin products an above average amount of oil",
SkinConcerns :["Acnhe","Blemishes"]} `,
  });

  return fromGeminiToJson(response.text ?? "");
};
