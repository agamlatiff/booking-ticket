import type { FC } from "react";
import type { FlightColumn } from "./ColumnsFlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ColumnSeatPriceProps {
  flight: FlightColumn;
}

const ColumnSeatPrice: FC<ColumnSeatPriceProps> = ({ flight }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger>Economy</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary mr-2">Ticket price</span>
              Rp 150.000
            </div>
            <div className="font-medium">
              <span className="text-primary  mr-2">Remaining seats</span>
              10/20
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger>Bussiness</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary mr-2">Ticket price</span>
              Rp 150.000
            </div>
            <div className="font-medium">
              <span className="text-primary mr-2">Remaining seats</span>
              10/20
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary  mr-2">Ticket price</span>
              Rp 150.000
            </div>
            <div className="font-medium">
              <span className="text-primary  mr-2">Remaining seats</span>
              10/20
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColumnSeatPrice;
