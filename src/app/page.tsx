import HomeView, { type FaqItem } from "@/components/home/HomeView";
import {
  getPublicServices,
  getPublicSpecialists,
  getPublicTestimonials,
  getPublicFaqs,
} from "@/lib/public-data";

// Statically prerender and revalidate the public homepage hourly. All data is
// fetched from the anonymous, cookie-free Supabase client (see lib/public-data)
// so the route stays static — no per-request work, great LCP/TBT. Admin edits
// call revalidatePath('/') to refresh this on demand.
export const revalidate = 3600;

export default async function Home() {
  const [services, specialists, testimonials, faqs] = await Promise.all([
    getPublicServices(),
    getPublicSpecialists(),
    getPublicTestimonials(),
    getPublicFaqs(),
  ]);

  const faqItems: FaqItem[] = (faqs.data as Record<string, unknown>[]).map((f) => ({
    id: String(f.id),
    q: String(f.question),
    a: String(f.answer),
  }));

  return (
    <HomeView
      services={services.data as unknown as Record<string, unknown>[]}
      specialists={specialists.data as unknown as Record<string, unknown>[]}
      testimonials={testimonials.data as unknown as Record<string, unknown>[]}
      faqs={faqItems}
    />
  );
}
