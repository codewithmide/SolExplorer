"use client";

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Accounts() {
  return (
    <DashboardLayout path="Accounts">
      <Card>
        <div className="w-full h-full center">
          Search for an account to see more information here
        </div>
      </Card>
    </DashboardLayout>
  );
}
