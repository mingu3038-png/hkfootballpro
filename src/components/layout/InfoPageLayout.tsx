import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface InfoSection {
  heading: string;
  paragraphs: string[];
}

interface InfoPageLayoutProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
  intro?: string;
  sections: InfoSection[];
}

export function InfoPageLayout({ title, breadcrumb, intro, sections }: InfoPageLayoutProps) {
  return (
    <div className="container py-8 max-w-3xl">
      <Breadcrumb items={breadcrumb} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        {intro && <p className="text-[var(--text-muted)] leading-relaxed">{intro}</p>}
      </header>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-bold mb-3 text-[var(--gold)]">{section.heading}</h2>
            <div className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
