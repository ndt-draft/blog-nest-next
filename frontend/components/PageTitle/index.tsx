import { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

type PageTitleProps = {
  type: "h2" | "h3" | null;
  children: ReactNode;
};

export const PageTitle = ({ type = "h2", children }: PageTitleProps) => {
  switch (type) {
    case "h2":
    default:
      return <H2>{children}</H2>;
    case "h3":
      return <H3>{children}</H3>;
  }
};

export default PageTitle;
