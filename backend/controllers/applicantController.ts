import { dbConnect } from '@/lib/mongodb';
import { dbConnect
import Applicant from "../models/Applicant";
import { parseResumeAI, scoreApplicantAI } from "@/lib/ai";

export async function createApplicant(req: any, res: any) {
  await dbConnect();
  const { name, email, phone, resumeText, createdBy } = req.body;
  const parsedData = await parseResumeAI(resumeText);
  const score = await scoreApplicantAI(parsedData);

  const newApplicant = await Applicant.create({
    name,
    email,
    phone,
    resumeText,
    skills: parsedData.skills,
    experienceYears: parsedData.experienceYears,
    educationLevel: parsedData.educationLevel,
    score,
    createdBy,
  });

  res.status(201).json(newApplicant);
}
