import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const coursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>Nuevo curso</Button>
      </Link>
    </div>
  );
};

export default coursesPage;
