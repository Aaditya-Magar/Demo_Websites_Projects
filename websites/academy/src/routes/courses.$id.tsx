import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Clock, IndianRupee, ArrowRight, BookOpen, Sparkles, ChevronLeft } from "lucide-react";
import { courses } from "../data/site";
import { PageHeader } from "./courses";

export const Route = createFileRoute("/courses/$id")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — ExcelEdge Academy` },
          { name: "description", content: loaderData.course.short },
          { property: "og:title", content: loaderData.course.title },
          { property: "og:description", content: loaderData.course.short },
        ]
      : [],
  }),
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="min-h-screen pt-32 px-6 text-center">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <Link to="/courses" className="text-primary mt-4 inline-block">Back to courses</Link>
    </div>
  ),
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  return (
    <>
      <PageHeader title={course.title} subtitle={course.short} />
      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-primary font-semibold story-link">
            <ChevronLeft className="h-4 w-4" /> All courses
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold mb-3">About this program</h2>
            <p className="text-foreground/80 leading-relaxed">{course.description}</p>
          </motion.div>

          <Block title="Key Features" icon={Sparkles} items={course.features} />
          <Block title="Benefits" icon={Check} items={course.benefits} />
          <Block title="Syllabus" icon={BookOpen} items={course.syllabus} />
          <Block title="Study Material" icon={BookOpen} items={course.material} />
        </div>

        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-2xl bg-card border border-border shadow-glow p-7">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground font-bold">
                {course.exam}
              </span>
              <span className="text-xs text-muted-foreground">Class {course.classLevel}</span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground">{course.fee}</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-foreground/80">
                <Clock className="h-4 w-4 text-primary" /> Duration: {course.duration}
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <IndianRupee className="h-4 w-4 text-accent" /> Scholarship available
              </div>
            </div>
            <Link
              to="/admission"
              className="mt-6 group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform"
            >
              Enroll Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="mt-3 w-full inline-flex items-center justify-center px-6 py-3 rounded-full border border-border font-semibold hover:bg-secondary transition"
            >
              Talk to a Counsellor
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}

function Block({ title, items, icon: Icon }: { title: string; items: string[]; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" /> {title}
      </h3>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 p-4 rounded-xl bg-secondary/60 border border-border">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-foreground/80">{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
