import { ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { TeacherSidebar } from "./TeacherSidebar";

interface TeacherLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function TeacherLayout({ children, title, description }: TeacherLayoutProps) {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <TeacherSidebar />
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
