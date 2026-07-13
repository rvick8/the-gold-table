import Image from "next/image";
import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link className={`brand-lockup${inverse ? " brand-lockup--inverse" : ""}`} href="/" aria-label="The Gold Table home">
    <Image className="brand-lockup__mark" src="/images/gold-table-mark.png" alt="" width={48} height={48} aria-hidden="true" />
    <span className="brand-lockup__type">
      <span className="brand-lockup__name">THE GOLD TABLE</span>
      <span className="brand-lockup__descriptor">Private valuations</span>
    </span>
  </Link>;
}
