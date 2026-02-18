import { company } from "@/content/company";
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
  openGraph: {
    title: `${company.companyName} — застройщик в Якутске`,
    description:
      "Строим жильё и городскую среду в Якутске. Опыт, качество, реализованные и строящиеся проекты.",
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
