import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "../lib/actions";

const ButtonLogout = () => {
  return (
    <div className="space-y-2">
      <form action={logout}>
        <Button className="w-full justify-start" variant={"destructive"} type="submit">
          <LogOut className=" mr-2 h-4 w-4" />
          Logout
        </Button>
      </form>
    </div>
  );
};

export default ButtonLogout;
