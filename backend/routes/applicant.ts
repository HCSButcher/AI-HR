import express from "express";
import Applicant from "../models/Applicant.js";
import { parseResumeAI, scoreApplicantAI } from "../services/aiService.js";

const router = express.Router();

// Add new applicant
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, resumeText, createdBy } = req.body;

    // Use AI to parse resume text for skills, experience, education
    const parsedData = await parseResumeAI(resumeText);

    const applicant = new Applicant({
      name,
      email,
      phone,
      skills: parsedData.skills,
      experienceYears: parsedData.experienceYears,
      educationLevel: parsedData.educationLevel,
      resumeText,
      createdBy,
      assessments: parsedData.assessments,
      score: await scoreApplicantAI(parsedData),
    });

    await applicant.save();
    res.status(201).json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applicants
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
