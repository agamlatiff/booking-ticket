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
import SubmitButtonForm from "../../_components/SubmitFormButton";

const FormFlight = () => {
  return (
    <form  className="space-y-6">
      
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
            Price for bussiness class increases Rp 500.000 & First class
            increases Rp 750.000
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Departure City</Label>
          <Input
            placeholder="Departure City..."
            name="departureCity"
            id="departureCity"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            placeholder="Departure Date..."
            name="departureDate"
            id="departureDate"
            required
            type="datetime-local"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Departure City Code</Label>
          <Input
            placeholder="Departure City Code..."
            name="departureCityCode"
            id="departureCityCode"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Destination City</Label>
          <Input
            placeholder="Destination City..."
            name="destinationCity"
            id="destinationCity"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Arrival Date</Label>
          <Input
            placeholder="Arrival Date..."
            name="arrivalDate"
            id="arrivalDate"
            required
            type="datetime-local"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Destination City Code</Label>
          <Input
            placeholder="Destination City Code..."
            name="destinationCityCode"
            id="destinationCityCode"
            required
          />
        </div>
      </div>
      
      <SubmitButtonForm/>
    </form>
  );
};

export default FormFlight;
