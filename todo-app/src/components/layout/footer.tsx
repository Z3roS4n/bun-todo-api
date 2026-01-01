import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function Footer() {
  return (
    <footer>
      <Card className="w-full">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center font-normal">Powered by <a href="https://www.msworks.it">M's Works</a></CardTitle>
            <CardDescription className="text-center">
              <div className="flex flex-row justify-center gap-1 mt-2">
                <Badge variant={"outline"}>React</Badge>
                <Badge variant={"outline"}>Bun</Badge>
                <Badge variant={"outline"}>TypeScript</Badge>
                <Badge variant={"outline"}>TanStack Query</Badge>
              </div>
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </footer>
  );
}