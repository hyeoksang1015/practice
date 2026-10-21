import ContactPage, { contactMeta } from "@/components/pages/ContactPage";

export const metadata = contactMeta("ko");

export default function Page() {
  return <ContactPage lang="ko" />;
}
