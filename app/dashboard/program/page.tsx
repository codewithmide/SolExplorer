"use client";

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Validators() {
  return (
    <DashboardLayout path="Programs">
      <Card>
        <div className="w-full h-full center">
          Search for a program to see more information here
        </div>
      </Card>
    </DashboardLayout>
  );
}
