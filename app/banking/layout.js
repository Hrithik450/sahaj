import { HashScroll } from "@/components/shared/HashScroll";

export default function BankingLayout({ children }) {
  return (
    <>
      <HashScroll />
      {children}
    </>
  );
}
