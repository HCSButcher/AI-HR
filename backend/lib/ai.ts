import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseResumeAI(resumeText: string) {
  if (!resumeText)
    return { skills: [], experienceYears: 0, educationLevel: "" };
  const prompt = `
You are an HR assistant. Extract skills, years of experience, and education from this resume:
${resumeText}
Return JSON { skills: [], experienceYears: number, educationLevel: string }.
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    return JSON.parse(response.choices[0].message?.content || "{}");
  } catch {
    return { skills: [], experienceYears: 0, educationLevel: "" };
  }
}

export async function scoreApplicantAI(parsedData: {
  skills: string[];
  experienceYears: number;
  educationLevel: string;
}) {
  const prompt = `
Score applicant out of 100 based on skills (${parsedData.skills.join(
    ", "
  )}), experience (${parsedData.experienceYears} years), education (${
    parsedData.educationLevel
  }). Return only number.
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const score = parseInt(
    response.choices[0].message?.content.replace(/\D/g, ""),
    10
  );
  return isNaN(score) ? 0 : score;
}
