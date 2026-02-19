import { company } from "@/content/company";

export function ContactInfoBlock() {
  return (
    <dl className="mt-8 space-y-5">
      <div>
        <dt className="text-sm font-medium text-muted-foreground">Адрес</dt>
        <dd className="mt-1 text-foreground">{company.address}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-muted-foreground">Телефон</dt>
        <dd className="mt-1">
          <a
            href={`tel:${company.phoneHref}`}
            className="text-foreground transition-colors hover:text-accent"
          >
            {company.phone}
          </a>
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-muted-foreground">Email</dt>
        <dd className="mt-1">
          <a
            href={`mailto:${company.email}`}
            className="text-foreground transition-colors hover:text-accent"
          >
            {company.email}
          </a>
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-muted-foreground">
          Режим работы
        </dt>
        <dd className="mt-1 text-foreground">{company.workHours}</dd>
      </div>
    </dl>
  );
}
