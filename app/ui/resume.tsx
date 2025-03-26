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

  const skillsGrouped = groupBy(skills, (skill) => skill.type || "");
  return (
    <div className="mx-auto max-w-[21cm] border border-slate-200 bg-white @container @2xl:h-[29.7cm] @2xl:max-h-[29.7cm] print:fixed print:inset-0 print:border-none">
      <div className="flex flex-col justify-between gap-y-2 px-6 py-6 @2xl:px-10 @2xl:py-8">
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
            <div className="hidden min-h-28 min-w-28 @lg:block">
              <Image
                src={`http://localhost:8055/assets/${resume.image}`}
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
              <div className="text-xl font-semibold">Experiences</div>
              <div className="space-y-3">
                {experiences.map((experience) => {
                  const start_date = dayjs(experience.start_date);
                  const end_date =
                    experience.end_date && dayjs(experience.end_date);

                  const date_format = "MMMM YYYY";

                  let duration_months = end_date
                    ? end_date.diff(start_date, "months")
                    : dayjs().diff(start_date, "months");

                  const duration_years = Math.floor(duration_months / 12);
                  duration_months -= duration_years * 12;

                  return (
                    <div
                      key={experience.id}
                      className="flex items-center gap-x-4"
                    >
                      <div className="min-h-14 min-w-14 overflow-hidden rounded-lg">
                        <a href={experience.link || undefined} target="_blank">
                          <Image
                            src={`http://localhost:8055/assets/${experience.icon}`}
                            alt={`${experience.company}`}
                            width={56}
                            height={56}
                            quality={100}
                          />
                        </a>
                      </div>
                      <div>
                        <div className="text-lg font-semibold @2xl:text-base">
                          {experience.title}
                        </div>
                        <div className="text-base font-semibold text-[#FB513B] @2xl:text-sm">
                          {experience.company}
                        </div>
                        <div className="text-sm text-slate-500 @2xl:text-xs">
                          <span>{start_date.format(date_format)}</span>
                          <span> - </span>
                          <span>
                            {end_date
                              ? end_date.format(date_format)
                              : "present"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              {/* Projects */}
              <div className="text-xl font-semibold">Projects</div>
              <div className="space-y-3">
                {projects.map((project) => {
                  return (
                    <div key={project.id} className="flex items-center gap-x-4">
                      <div className="flex min-h-14 min-w-14 items-center justify-center overflow-hidden rounded-lg">
                        <a href={project.link || undefined} target="_blank">
                          <Image
                            src={`http://localhost:8055/assets/${project.icon}`}
                            alt={`${project.title}`}
                            width={56}
                            height={56}
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
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-2">
            {/* Skills */}
            <div className="space-y-1">
              <div className="text-xl font-semibold">Skills</div>
              <div className="space-y-2">
                {Object.entries(skillsGrouped).map(([type, skills]) => {
                  return (
                    <div key={type}>
                      <div className="text-base font-semibold capitalize @2xl:text-sm">
                        {type}
                      </div>
                      <div className="">
                        {skills.map((skill) => {
                          return (
                            <div
                              key={skill.id}
                              className="flex items-center gap-x-2"
                            >
                              {skill.icon && (
                                <div>
                                  <Image
                                    src={`http://localhost:8055/assets/${skill.icon}`}
                                    alt={`${skill.title}`}
                                    width={16}
                                    height={16}
                                  />
                                </div>
                              )}

                              <div className="text-sm text-slate-500 @2xl:text-sm">
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
            {/* Education */}
            <div className="space-y-1">
              <div className="text-xl font-semibold">Education</div>
              <div className="space-y-2">
                {educations.map((education) => {
                  const start_year = dayjs(education.start_date).format("YYYY");
                  const end_year = dayjs(education.end_date).format("YYYY");
                  return (
                    <div
                      key={education.id}
                      className="flex items-center gap-x-3"
                    >
                      <div className="min-h-12 min-w-12">
                        <a href={education.link || undefined} target="_blank">
                          <Image
                            src={`http://localhost:8055/assets/${education.icon}`}
                            alt={`${education.school}`}
                            width={48}
                            height={48}
                            quality={100}
                          />
                        </a>
                      </div>
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
            {/* Languages */}
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
                          src={`http://localhost:8055/assets/${language.icon}`}
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
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          {socials.map((social) => {
            return (
              <div key={social.id} className="min-h-7 min-w-7">
                <a href={social.link || "#"} target="_blank" rel="noreferrer">
                  <Image
                    src={`http://localhost:8055/assets/${social.icon}`}
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
