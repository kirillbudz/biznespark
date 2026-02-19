import type { Metadata } from "next";
import { company } from "@/content/company";
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

export const metadata: Metadata = {
  title: `ЖК «Гастелло» — современная новостройка в Якутске | ${company.companyName}`,
  description:
    "Ищете комфортное жильё в Якутске? ЖК «Гастелло» — это современные квартиры в новостройке с продуманными планировками, благоустроенной территорией и удобным расположением. Узнайте подробности и забронируйте свою квартиру!",
};

export default function GastelloPage() {
  return (
    <main>
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
