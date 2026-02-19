import { company } from "@/content/company";
import { baseUrl } from "@/lib/site-url";
import { AboutCompanySection } from "@/components/AboutCompanySection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { CompanyHero } from "@/components/CompanyHero";
import { HomeContactsSection } from "@/components/HomeContactsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${company.companyName} — застройщик в Якутске`,
  description:
    "Строим жильё и городскую среду в Якутске. Опыт, качество, реализованные и строящиеся проекты: ЖК Крепость, ЖК Гастелло.",
  alternates: { canonical: baseUrl },
  openGraph: {
    url: baseUrl,
    title: `${company.companyName} — застройщик в Якутске`,
    description:
      "Строим жильё и городскую среду в Якутске. Опыт, качество, реализованные и строящиеся проекты.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: company.companyName }],
  },
};

export default function HomePage() {
  return (
    <main>
      <CompanyHero />
      <AboutCompanySection />
      <AdvantagesSection />
      <ProjectsSection />
      <HomeContactsSection />
    </main>
  );
}
