export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bypass the main site layout - render children directly
  return <>{children}</>;
}
