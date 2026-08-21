import { HashScroll } from "@/components/shared/HashScroll";

export default function GovernmentLayout({ children }) {
  return (
    <>
      <HashScroll />
      {children}
    </>
  );
}
