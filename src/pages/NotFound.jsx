import { Link } from "react-router";
import Logo from "../components/Logo";
import { Arrow, TitleLines } from "../components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[calc(100svh-var(--header-h))] place-items-center py-20">
      <title>Lost — The Creative Creeps</title>
      <div className="wrap text-center">
        <Logo className="mx-auto w-[min(320px,70%)]" />
        <TitleLines lines={["Nothing", "to see here."]} className="mt-10 text-[clamp(2.6rem,8vw,6.5rem)]" />
        <p className="mx-auto mt-6 max-w-[40ch] text-lg text-muted">This page crept off somewhere. Let’s get you back to the good stuff.</p>
        <Link to="/" className="btn mt-8 px-[1.6em] py-[1em]">
          <span>Back home</span>
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
