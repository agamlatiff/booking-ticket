import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Button><Link href={'/dashboard/signin'}>Click Me</Link></Button>
    </div>
  );
};

export default Home;
