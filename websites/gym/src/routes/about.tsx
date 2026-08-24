import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { TIMELINE } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Iron Peak Circle" },
      { name: "description", content: "Founded 2015. Three locations. 500+ members. The Iron Peak Circle story." },
      { property: "og:title", content: "About Iron Peak Circle" },
      { property: "og:description", content: "From an 800 sqft basement to Mumbai's premium gym chain." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden grain pt-20">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600"
          alt="Iron Peak Circle athlete"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 h-full flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-6"
          >
            ◆ Since 2015
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-7xl md:text-9xl lg:text-[12rem] text-white leading-[0.85]"
          >
            We Were Built<br /><span className="text-[#E8192C]">Differently.</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ Our Story</p>
            <h2 className="font-display text-5xl lg:text-6xl text-white leading-[0.95] mb-6">
              From a basement<br />to <span className="text-[#E8192C]">Mumbai's best.</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>Iron Peak Circle started in 2015 as an 800 sqft basement gym in Andheri. One trainer, twelve members, and a stubborn refusal to compromise on equipment or coaching.</p>
              <p>A decade later, we run three flagship locations across Mumbai, host 50+ classes a week, and serve over 500 active members. The basement is gone. The standards aren't.</p>
              <p>We don't sell quick fixes or magic transformations. We build athletes — slowly, intelligently, and with a coaching staff that genuinely cares about your progress.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-3 -left-3 -right-3 -bottom-3 border-2 border-[#E8192C]" />
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900"
              alt="Iron Peak Circle gym"
              className="relative aspect-[4/5] object-cover w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ The Journey</p>
            <h2 className="font-display text-5xl lg:text-7xl text-white">Ten Years In The Making</h2>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5 }}
              style={{ originY: 0 }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E8192C] via-[#E8192C] to-transparent"
            />
            <div className="space-y-16">
              {TIMELINE.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`relative grid grid-cols-9 items-center gap-4`}
                  >
                    <div className={`col-span-9 md:col-span-4 ${left ? "md:text-right md:order-1" : "md:order-3"}`}>
                      <div className="bg-[#111] border border-white/10 p-6 inline-block max-w-md">
                        <div className="font-display text-4xl text-[#E8192C]">{m.year}</div>
                        <h3 className="font-display text-2xl tracking-wider text-white mt-1">{m.title}</h3>
                        <p className="text-white/60 text-sm mt-2 leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex col-span-1 justify-center md:order-2">
                      <span className="h-4 w-4 rounded-full bg-[#E8192C] ring-4 ring-black" />
                    </div>
                    <div className="hidden md:block col-span-4" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ Our Values</p>
            <h2 className="font-display text-5xl lg:text-7xl text-white">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Discipline", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80", text: "Showing up when you don't feel like it. Every. Single. Time." },
              { title: "Community", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80", text: "Train hard, lift each other up. Always." },
              { title: "Excellence", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=900&q=80", text: "Good enough is the enemy. We refuse it." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[4/5] overflow-hidden group"
              >
                <img src={v.img} alt={v.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-5xl tracking-wider text-white">{v.title}</h3>
                  <p className="text-white/70 mt-2">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ Behind The Brand</p>
            <h2 className="font-display text-5xl lg:text-6xl text-white">The Founders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rohan Kapoor", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600", bio: "Former state-level powerlifter turned entrepreneur. Built Iron Peak Circle out of frustration with Mumbai's existing gyms." },
              { name: "Tara Mehta", role: "Co-Founder, Operations", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600", bio: "Ex-McKinsey, now full-time obsessed with member experience and operational excellence." },
              { name: "Sameer Bhatia", role: "Co-Founder, Coaching", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600", bio: "10+ years coaching Olympic-level athletes. Heads our certification and curriculum programs." },
            ].map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111] border border-white/10"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl tracking-wider text-white">{f.name}</h3>
                  <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs mt-1">{f.role}</p>
                  <p className="text-white/60 text-sm mt-3 leading-relaxed">{f.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
