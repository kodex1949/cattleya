import Link from "next/link";
import { footerColumns } from "./footer.data";

export default function FooterColumns() {
  return (
    <div className="grid grid-cols-4 gap-14">
      {footerColumns.map((column) => (
        <div key={column.title}>
          <h3 className="mb-9 font-serif text-[20px] font-light tracking-[-0.04em]">
            {column.title}
          </h3>

          <ul className="space-y-5">
            {column.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[14px] leading-[1.25] text-black/85 transition hover:text-black hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}