import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import DirectorMessage from "@/components/home/DirectorMessage";
import CoursesPreview from "@/components/home/CoursesPreview";
import { apiFetch } from "@/lib/api";
import { Course } from "@/lib/types";

export default async function Home() {
  const courses = await apiFetch<Course[]>("/courses").catch(() => []);

  return (
    <>
      <Hero />
      <Stats />
      <CoursesPreview courses={courses} />
      <DirectorMessage />
    </>
  );
}