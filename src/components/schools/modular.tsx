import React from "react";
import Schools from "../cards/schools";
import Invoices from "../cards/Invoices";
import Collections from "../cards/Collections";

export default function Modular() {
  return (
    <>
      <div className="flex flex-row gap-3">
        <Schools />
        <Invoices />
        <Collections />
      </div>
    </>
  );
}
