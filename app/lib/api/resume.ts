import { readItem, readItems } from "@directus/sdk";
import directus from "../directus";
import { notFound } from "next/navigation";

export async function getResume(resume_id: string, version?: string) {
  try {
    return await directus.request(readItem("resume", resume_id, { version }));
  } catch (error) {
    console.error("Error fetching resume:", error);
    notFound();
  }
}

export async function getExperiences(resume_id: string, version?: string) {
  return await directus.request(
    readItems("experiences", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
        company_parent: { _null: true },
      },
      sort: ["sort"],
    }),
  );
}

export async function getExperiencesChildren(
  experience_id: string,
  version?: string,
) {
  return await directus.request(
    readItems("experiences", {
      filter: {
        company_parent: { _eq: experience_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}

export async function getProjects(resume_id: string, version?: string) {
  return await directus.request(
    readItems("projects", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}
export async function getSkills(resume_id: string, version?: string) {
  return await directus.request(
    readItems("skills", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}

export async function getEducations(resume_id: string, version?: string) {
  return await directus.request(
    readItems("education", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}

export async function getTongues(resume_id: string, version?: string) {
  return await directus.request(
    readItems("tongues", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}

export async function getSocials(resume_id: string, version?: string) {
  return await directus.request(
    readItems("social", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}

export async function getCertifications(resume_id: string, version?: string) {
  return await directus.request(
    readItems("certifications", {
      filter: {
        resume: { _eq: resume_id },
        status: { _eq: "published" },
      },
      sort: ["sort"],
      version,
    }),
  );
}
