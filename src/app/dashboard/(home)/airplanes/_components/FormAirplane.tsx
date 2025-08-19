"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormAirplane = () => {
  return <form className="w-[40%] space-y-4">
    <div className="space-y-2">
      <Label htmlFor="code">
        Airplane Code
      </Label>
      <Input placeholder="Airplanes Code..." name="code" id="code" required/>
    </div>
     <div className="space-y-2">
      <Label htmlFor="name">
        Airplane Name
      </Label>
      <Input placeholder="Airplanes Name..." name="name" id="name" required/>
    </div>
     <div className="space-y-2">
      <Label htmlFor="image">
        Upload Photo
      </Label>
      <Input placeholder="Upload Photo..." name="image" id="image" required type="file"/>
    </div>
    <Button type="submit" className="w-full">Submit</Button>
  </form>;
};

export default FormAirplane;
