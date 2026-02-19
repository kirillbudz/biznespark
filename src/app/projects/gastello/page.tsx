import type { Metadata } from "next";
import { company } from "@/content/company";
import { baseUrl } from "@/lib/site-url";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import {
  GastelloAbout,
  GastelloAdvantages,
  GastelloContacts,
  GastelloGallery,
  GastelloHero,
  GastelloLocation,
  GastelloProjectNav,
  GastelloRooms,
  GastelloStylobate,
} from "@/components/gastello";
import Link from "next/link";

const url = `${baseUrl}/projects/gastello`;

export const metadata: Metadata = {
  title: `ЖК «Гастелло» — современная новостройка в Якутске | ${company.companyName}`,
  description:
    "Ищете комфортное жильё в Якутске? ЖК «Гастелло» — это современные квартиры в новостройке с продуманными планировками, благоустроенной территорией и удобным расположением. Узнайте подробности и забронируйте свою квартиру!",
  alternates: { canonical: url },
  openGraph: {
    url,
    title: `ЖК «Гастелло» — новостройка в Якутске | ${company.companyName}`,
    description:
      "ЖК «Гастелло» — современные квартиры в новостройке Якутска с продуманными планировками и благоустроенной территорией.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "ЖК Гастелло" }],
  },
};

export default function GastelloPage() {
  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Проекты", href: "/#projects" },
          { name: "ЖК Гастелло", href: "/projects/gastello" },
        ]}
      />
      <GastelloHero />
      <GastelloProjectNav />
      <GastelloAbout />
      <GastelloAdvantages />
      <GastelloStylobate />
      <GastelloGallery />
      <GastelloLocation />
      <GastelloRooms />
      <GastelloContacts />
      <div className="py-10 text-center">
        <Link
          href="/#projects"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-base font-semibold text-foreground transition-all hover:bg-muted"
        >
          Все проекты
        </Link>
      </div>
    </main>
  );
}
