import { Schema, model, models } from "mongoose";

export interface IApplicant {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experienceYears?: number;
  educationLevel?: string;
  assessments?: { logic?: number; communications?: number; technical?: number };
  resumeUrl?: string;
  resumeText?: string;
  source?: "csv" | "pdf" | "manual";
  createdBy: string;
  score?: number;
  status?: "new" | "reviewed" | "shortlisted" | "rejected";
}

const ApplicantSchema = new Schema<IApplicant>(
  {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experienceYears: Number,
    educationLevel: String,
    assessments: {
      logic: Number,
      communications: Number,
      technical: Number,
    },
    resumeUrl: String,
    resumeText: String,
    source: { type: String, enum: ["csv", "pdf", "manual"], default: "manual" },
    createdBy: { type: String, required: true, index: true },
    score: Number,
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default models.Applicant ||
  model<IApplicant>("Applicant", ApplicantSchema);
