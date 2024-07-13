"use client";

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Blocks() {
  return (
    <DashboardLayout path="Blocks">
      <Card>
        <div className="w-full h-full center">
          Search for a block to see more information here
        </div>
      </Card>
    </DashboardLayout>
  );
}
