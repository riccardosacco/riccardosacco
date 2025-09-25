import parse from "html-react-parser";
import Image from "next/image";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

import { groupBy } from "@/app/lib/utils";

import {
  getResume,
  getEducations,
  getExperiences,
  getLanguages,
  getProjects,
  getSkills,
  getSocials,
  getCertifications,
} from "@/app/lib/api/resume";

import { FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa6";

export type ResumeProps = {
  id: string;
};

export default async function Resume({ id }: ResumeProps) {
  const resume = await getResume(id);

  if (!resume.id) {
    return notFound();
  }

  const experiences = await getExperiences(resume.id);
  const projects = await getProjects(resume.id);
  const skills = await getSkills(resume.id);
  const educations = await getEducations(resume.id);
  const languages = await getLanguages(resume.id);
  const socials = await getSocials(resume.id);
  const certifications = await getCertifications(resume.id);

  const skillsGrouped = groupBy(skills, (skill) => skill.type || "");
  return (
    <div className="mx-auto max-w-[21cm] border border-slate-200 bg-white @container @2xl:h-[29.7cm] @2xl:max-h-[29.7cm] print:inset-0 print:border-none">
      <div className="flex flex-col justify-between gap-y-2 px-6 py-6 @2xl:px-10 @2xl:py-8 print:px-0 print:py-0">
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-2 @2xl:flex-row">
            <div>
              <div className="text-3xl font-bold">
                {resume.firstname} {resume.lastname}
              </div>
              <div className="text-lg font-semibold text-[#FB513B]">
                {resume.headline}
              </div>
            </div>
            <div className="flex flex-col text-sm @2xl:items-end">
              {resume.phone && (
                <a
                  href={`tel:${resume.phone}`}
                  className="flex items-center gap-x-2 text-slate-500 hover:text-slate-600 active:text-slate-700"
                >
                  <div>
                    <FaPhone size={12} />
                  </div>
                  <div>{resume.phone}</div>
                </a>
              )}
              {resume.phone_alt && (
                <a
                  href={`tel:${resume.phone_alt}`}
                  className="flex items-center gap-x-2 text-slate-500 hover:text-slate-600 active:text-slate-700"
                >
                  <div>
                    <FaPhone size={12} />
                  </div>
                  <div>{resume.phone_alt}</div>
                </a>
              )}
              {resume.email && (
                <a
                  href={`mailto:${resume.email}`}
                  className="flex items-center gap-x-2 text-slate-500 hover:text-slate-600 active:text-slate-700"
                >
                  <div>
                    <FaEnvelope size={12} />
                  </div>
                  <div>{resume.email}</div>
                </a>
              )}
              {resume.website && (
                <a
                  href={resume.website}
                  className="flex items-center gap-x-2 text-slate-500 hover:text-slate-600 active:text-slate-700"
                >
                  <div>
                    <FaGlobe size={12} />
                  </div>
                  <div>{resume.website}</div>
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 @lg:flex-row">
            <div className="hidden min-h-28 min-w-28 overflow-hidden rounded-full @lg:block">
              <Image
                src={`https://api.riccardosacco.com/assets/${resume.image}`}
                alt={`${resume.firstname} ${resume.lastname}`}
                width={128}
                height={128}
                quality={100}
              />
            </div>
            {resume.biography && (
              <div className="text-sm text-slate-500">
                {parse(resume.biography)}
              </div>
            )}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-6 @2xl:grid-cols-[7fr_3fr]">
          {/* Left */}
          <div className="space-y-4">
            <div className="space-y-2">
              {/* Experiences */}
              {experiences.length > 0 && (
                <>
                  <div className="text-xl font-semibold">Experiences</div>
                  <div className="space-y-3">
                    {experiences.map((experience) => {
                      const start_date = dayjs(experience.start_date);
                      const end_date =
                        experience.end_date && dayjs(experience.end_date);

                      const date_format = "MM.YYYY";

                      let duration_months = end_date
                        ? end_date.diff(start_date, "months")
                        : dayjs().diff(start_date, "months");

                      const duration_years = Math.floor(duration_months / 12);
                      duration_months -= duration_years * 12;

                      return (
                        <div
                          key={experience.id}
                          className="flex items-start gap-x-4"
                        >
                          {experience.icon && (
                            <div className="min-h-10 min-w-10 overflow-hidden rounded-lg">
                              <a
                                href={experience.link || undefined}
                                target="_blank"
                              >
                                <Image
                                  src={`https://api.riccardosacco.com/assets/${experience.icon}`}
                                  alt={`${experience.company}`}
                                  width={256}
                                  height={256}
                                  quality={100}
                                  className="h-10 w-10"
                                />
                              </a>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex flex-col justify-between @2xl:flex-row @2xl:items-start">
                              <div>
                                <div className="text-lg font-semibold @2xl:text-base">
                                  {experience.title}
                                </div>
                                <div className="flex items-baseline gap-x-1">
                                  <div className="text-base font-semibold text-[#FB513B] @2xl:text-sm">
                                    {experience.company}
                                  </div>
                                  {experience.location ? (
                                    <div className="text-[11px] text-slate-400">
                                      ({experience.location})
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="text-sm text-slate-500 @2xl:text-right @2xl:text-xs">
                                <div>
                                  <span>{start_date.format(date_format)}</span>
                                  <span> – </span>
                                  <span>
                                    {end_date
                                      ? end_date.format(date_format)
                                      : "present"}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {end_date &&
                                    duration_years > 0 &&
                                    `${duration_years} year${duration_years > 1 ? "s" : ""}`}
                                  {end_date &&
                                    duration_years > 0 &&
                                    duration_months > 0 &&
                                    " "}
                                  {end_date &&
                                    duration_months > 0 &&
                                    `${duration_months} month${duration_months > 1 ? "s" : ""}`}
                                </div>
                              </div>
                            </div>
                            {experience.description && (
                              <div className="prose mt-1 text-sm text-slate-600 @2xl:text-xs">
                                {parse(experience.description)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {projects.length > 0 && (
              <div className="space-y-2">
                {/* Projects */}
                <div className="text-xl font-semibold">Projects</div>
                <div className="space-y-3">
                  {projects.map((project) => {
                    return (
                      <div
                        key={project.id}
                        className="flex items-start gap-x-4"
                      >
                        <div className="flex min-h-10 min-w-10 items-center justify-center overflow-hidden rounded-lg">
                          <a href={project.link || undefined} target="_blank">
                            <Image
                              src={`https://api.riccardosacco.com/assets/${project.icon}`}
                              alt={`${project.title}`}
                              width={40}
                              height={40}
                              quality={100}
                            />
                          </a>
                        </div>
                        <div>
                          <div className="text-lg font-semibold @2xl:text-base">
                            {project.title}
                          </div>
                          <div className="text-sm text-slate-500 @2xl:text-xs">
                            {project.subtitle}
                          </div>
                          {project.description && (
                            <div className="prose mt-1 text-sm text-slate-600 @2xl:text-xs">
                              {parse(project.description)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="space-y-2">
            {/* Skills */}
            {Object.keys(skillsGrouped).length > 0 && (
              <div className="space-y-1">
                <div className="text-xl font-semibold">Skills</div>
                <div className="space-y-2">
                  {Object.entries(skillsGrouped).map(([type, skills]) => {
                    return (
                      <div key={type}>
                        <div className="space-y-1 text-base font-semibold capitalize @2xl:text-sm">
                          {type}
                        </div>
                        <div className="space-y-0.5">
                          {skills.map((skill) => {
                            return (
                              <div
                                key={skill.id}
                                className="flex items-center gap-x-2"
                              >
                                {skill.icon && (
                                  <div>
                                    <Image
                                      src={`https://api.riccardosacco.com/assets/${skill.icon}`}
                                      alt={`${skill.title}`}
                                      width={16}
                                      height={16}
                                    />
                                  </div>
                                )}

                                <div className="text-sm text-slate-500 @2xl:text-xs">
                                  {skill.title}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Education */}
            {educations.length > 0 && (
              <div className="space-y-1">
                <div className="text-xl font-semibold">Education</div>
                <div className="space-y-2">
                  {educations.map((education) => {
                    const start_year = dayjs(education.start_date).format(
                      "YYYY",
                    );
                    const end_year = dayjs(education.end_date).format("YYYY");
                    return (
                      <div
                        key={education.id}
                        className="flex items-center gap-x-3"
                      >
                        {education.icon && (
                          <div className="min-h-10 min-w-10">
                            <a
                              href={education.link || undefined}
                              target="_blank"
                            >
                              <Image
                                src={`https://api.riccardosacco.com/assets/${education.icon}`}
                                alt={`${education.school}`}
                                width={40}
                                height={40}
                                quality={100}
                              />
                            </a>
                          </div>
                        )}
                        <div>
                          <div className="text-base font-semibold @2xl:text-sm">
                            {education.degree}
                          </div>
                          <div className="text-sm font-medium text-[#FB513B] @2xl:text-xs">
                            {education.school}
                          </div>
                          <div className="text-xs text-slate-500">
                            <span>{start_year}</span>
                            {end_year && (
                              <>
                                <span> - </span>
                                <span>{end_year}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="space-y-1">
                <div className="text-xl font-semibold">Languages</div>
                <div className="space-y-1 @2xl:space-y-0">
                  {languages.map((language) => {
                    return (
                      <div
                        key={language.id}
                        className="flex items-center gap-x-2"
                      >
                        <div className="min-h-5 min-w-5">
                          <Image
                            src={`https://api.riccardosacco.com/assets/${language.icon}`}
                            alt={`${language.language}`}
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className="space-x-1">
                          <span className="font-medium @2xl:text-sm">
                            {language.language}
                          </span>
                          <span className="text-sm text-slate-500 @2xl:text-xs">
                            ({language.level})
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="space-y-1">
                <div className="text-xl font-semibold">Certifications</div>
                <div className="space-y-2">
                  {certifications.map((certification) => {
                    const date = dayjs(certification.date).format("YYYY");
                    return (
                      <div
                        key={certification.id}
                        className="flex items-center gap-x-3"
                      >
                        {certification.icon && (
                          <div className="min-h-10 min-w-10">
                            <a
                              href={certification.link || undefined}
                              target="_blank"
                            >
                              <Image
                                src={`https://api.riccardosacco.com/assets/${certification.icon}`}
                                alt={`${certification.title}`}
                                width={40}
                                height={40}
                                quality={100}
                              />
                            </a>
                          </div>
                        )}
                        <div>
                          <div className="text-base font-semibold @2xl:text-sm">
                            {certification.title}
                          </div>
                          <div className="text-sm font-medium text-[#FB513B] @2xl:text-xs">
                            {certification.company}
                          </div>
                          <div className="text-xs text-slate-500">{date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-2">
          {socials.map((social) => {
            return (
              <div key={social.id} className="min-h-7 min-w-7">
                <a href={social.link || "#"} target="_blank" rel="noreferrer">
                  <Image
                    src={`https://api.riccardosacco.com/assets/${social.icon}`}
                    alt={`${social.name}`}
                    width={28}
                    height={28}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
