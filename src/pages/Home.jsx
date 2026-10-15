import { Link } from "react-router";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import ProcessCards from "../components/ProcessCards";
import ServiceRows from "../components/ServiceRows";
import Testimonial from "../components/Testimonial";
import ContactSection from "../components/ContactSection";
import { Arrow, Reveal, SectionLabel } from "../components/ui";

function MoreLink({ to, children, light = false }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 rounded-full border px-6 py-3.5 font-bold transition-colors duration-300 ${
        light ? "border-cream/40 hover:border-lime hover:bg-lime hover:text-ink" : "border-ink/30 hover:border-ink hover:bg-ink hover:text-cream"
      }`}
    >
      {children}
      <Arrow className="group-hover:translate-x-1" />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <title>The Creative Creeps — Ideas That Creep Differently</title>
      <Hero />
      <Philosophy />

      {/* Process */}
      <section aria-labelledby="process-title" className="pb-[clamp(88px,13vw,180px)]">
        <div className="wrap">
          <ProcessCards
            intro={
              <>
                <SectionLabel num="02">Process</SectionLabel>
                <div className="mb-[clamp(0px,5vw,64px)] mt-[clamp(28px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
                  <Reveal as="h2" id="process-title" className="font-display text-[clamp(2.6rem,6.5vw,6rem)] font-black uppercase leading-[.88] tracking-[-.045em]">
                    How we <span className="font-extralight [font-stretch:110%]">creep</span>
                  </Reveal>
                  <p className="label max-w-[32ch] text-muted">Four phases. Every project, big or small. No black boxes, no surprise reveals.</p>
                </div>
              </>
            }
          />
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="bg-ink py-[clamp(88px,13vw,180px)] text-cream [--focus:var(--color-lime)] max-lg:py-[clamp(48px,8vw,88px)]">
        <ServiceRows
          heading={
            <div>
              <SectionLabel num="03">Services</SectionLabel>
              <Reveal
                as="h2"
                id="services-title"
                className="mt-[clamp(20px,4vw,56px)] font-display text-[clamp(2.6rem,8vw,8rem)] font-black uppercase leading-[.84] tracking-[-.05em] [font-stretch:85%]"
              >
                What we
                <br />
                <span className="text-lime">conjure.</span>
              </Reveal>
            </div>
          }
          aside={
            <div className="grid gap-6">
              <p className="max-w-[40ch] text-lg text-cream/70">
                Six disciplines, one studio. From the first sketch to the last line of code — so your brand looks, sounds and behaves like one thing.
              </p>
              <div>
                <MoreLink to="/services" light>
                  All services
                </MoreLink>
              </div>
            </div>
          }
        />
      </section>

      <Testimonial />
      <ContactSection />
    </>
  );
}
