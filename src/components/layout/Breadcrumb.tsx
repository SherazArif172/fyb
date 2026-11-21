import Link from "next/link";
import { Fragment } from "react";

/* Top-bar subtitle breadcrumb: "My projects  /  New project" */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <span className="whitespace-pre">
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {i > 0 && "  /  "}
          {it.href ? (
            <Link href={it.href} className="hover:text-teal-700 hover:underline">
              {it.label}
            </Link>
          ) : (
            it.label
          )}
        </Fragment>
      ))}
    </span>
  );
}
