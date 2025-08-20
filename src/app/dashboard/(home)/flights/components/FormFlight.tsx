"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormFlight = () => {
  return (
    <form action={}>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="planeId">Choose airplane</Label>
            <Select name="planeId">
              <SelectTrigger id="planeId">
                <SelectValue placeholder="Choose airplane" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Ticket Price</Label>
            <Input
              placeholder="Ticket Price..."
              name="price"
              id="price"
              type="number"
              min={0}
              required
            />
            <span className="text-xs text-gray-900">
              Price for bussiness class increases Rp 500.000 & First class increases Rp 750.000
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormFlight;
