"use client";

import { useInView } from "react-intersection-observer";
import clsx from "./lib/clsx";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.97,
  });

  const { ref: projectsRef, inView: projectsInView } = useInView({
    threshold: 0.1,
  });

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.1,
  });

  const { ref: experienceRef, inView: experienceInView } = useInView({
    threshold: 0.1,
  });

  return (
    <main className="relative bg-white">
      {/* Header */}
      <header
        className={clsx(
          "container fixed left-0 right-0 top-0 z-50 mx-auto flex justify-between px-8 py-6 text-black transition",
          {
            "text-white": headerInView,
          },
        )}
      >
        <div className="font-medium">Riccardo Sacco</div>
        <div className="font-medium">riccardo.sacco@itweb.dev</div>
        <div className="font-medium">1/10</div>
      </header>

      {/* Hero Section */}
      <section className="flex h-[100svh]">
        <div className="container mx-auto flex flex-col justify-center gap-40 px-8 py-6">
          <div className="text-7xl">{`Hey, I'm Riccardo Sacco.`}</div>
          <div className="text-7xl font-medium leading-tight">
            A Full Stack Developer from Italy,
            <br /> working from Switzerland
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={headerRef} className="flex h-[100svh] bg-black">
        <div className="container mx-auto flex flex-col justify-end px-8 py-6 text-white">
          <div className="text-9xl font-medium leading-tight">
            Developer
            <br />
            Portfolio
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-16 text-5xl font-medium">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div
                key={project}
                className="group relative overflow-hidden rounded-lg bg-gray-100"
              >
                <div className="aspect-video w-full bg-gray-200" />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-medium">
                    Project {project}
                  </h3>
                  <p className="text-gray-600">
                    A brief description of the project and its key features.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                      React
                    </span>
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                      Next.js
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-16 text-5xl font-medium">Skills & Expertise</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                category: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
              },
              {
                category: "Backend",
                skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
              },
              {
                category: "DevOps",
                skills: ["Docker", "AWS", "CI/CD", "Git"],
              },
            ].map((category) => (
              <div
                key={category.category}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-xl font-medium">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-8">
          <h2 className="mb-16 text-5xl font-medium">Work Experience</h2>
          <div className="space-y-12">
            {[1, 2, 3].map((exp) => (
              <div key={exp} className="flex gap-8">
                <div className="w-48 text-gray-500">2020 - Present</div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">Senior Developer</h3>
                  <h4 className="mb-4 text-lg text-gray-600">Company Name</h4>
                  <p className="text-gray-600">
                    Description of responsibilities and achievements in this
                    role. Highlight key projects and technologies used.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen bg-black py-20 text-white">
        <div className="container mx-auto px-8">
          <h2 className="mb-16 text-5xl font-medium">Get in Touch</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-8 text-xl">
                Im always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a
                    href="mailto:riccardo.sacco@itweb.dev"
                    className="text-gray-400 hover:text-white"
                  >
                    riccardo.sacco@itweb.dev
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Location:</span>
                  <span className="text-gray-400">Switzerland</span>
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <a
                  href="https://github.com/riccardosacco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/riccardosacco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://twitter.com/riccardosacco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg bg-gray-800 p-3 text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg bg-gray-800 p-3 text-white"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-lg bg-gray-800 p-3 text-white"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-gray-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 text-center text-gray-400">
        <div className="container mx-auto px-8">
          <p>
            © {new Date().getFullYear()} Riccardo Sacco. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
