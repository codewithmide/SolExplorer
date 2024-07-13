"use client";

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Transactions() {
  return (
    <DashboardLayout path="Transactions">
      <Card>
        <div className="w-full h-full center">
          Search for a transaction to see more information here
        </div>
      </Card>
    </DashboardLayout>
  );
}
