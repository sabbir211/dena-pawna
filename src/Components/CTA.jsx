import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";

export default function CTA() {
  return (
    <section className="animate-fade-up bg-primary px-6 py-16 text-primary-content md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Stop losing track. Start settling up.
        </h2>
        <p className="mt-3 text-primary-content/80">
          Join DenaPawna and know exactly where you stand with everyone — for free.
        </p>

        <Link
          to="/register"
          className="btn btn-lg mt-8 gap-2 bg-primary-content text-primary hover:bg-primary-content/90"
        >
          Get Started Free
          <FiArrowRight />
        </Link>

        <p className="mt-4 text-sm text-primary-content/70">
          No credit card required
        </p>
      </div>
    </section>
  );
}