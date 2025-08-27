// Simulated AI logic; replace with OpenAI or your chosen AI
export async function parseResumeAI(resumeText) {
  // Dummy parsing example
  return {
    skills: ["JavaScript", "React", "Node.js"],
    experienceYears: 3,
    educationLevel: "Bachelor's",
    assessments: {
      logic: 7,
      communications: 8,
      technical: 9,
    },
  };
}

export async function scoreApplicantAI(parsedData) {
  const { assessments } = parsedData;
  // Simple scoring algorithm
  return Math.round(
    (assessments.logic + assessments.communications + assessments.technical) / 3
  );
}
