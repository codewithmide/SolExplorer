"use client";

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Tokens() {
  return (
    <DashboardLayout path="Tokens">
      <Card>
        <div className="w-full h-full center">
          Search for a token to see more information here
        </div>
      </Card>
    </DashboardLayout>
  );
}
