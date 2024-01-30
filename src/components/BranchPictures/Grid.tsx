export function Grid({ children }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 pb-5 gap-2">{children}</div>
  );
}
