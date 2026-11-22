import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
export function PageFrame({ crumbs, title, intro, children }: {
  crumbs: Crumb[]; title: string; intro?: string; children: React.ReactNode;
}) {
  return <div className="shell page-frame"><Breadcrumbs items={crumbs}/>
    <div className="page-heading"><h1>{title}</h1>{intro && <p>{intro}</p>}</div>
    {children}
  </div>;
}
