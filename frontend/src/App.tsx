import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle>TailwindCSS v4 + shadcn/ui</CardTitle>
            <CardDescription>
              최신 TailwindCSS v4와 shadcn/ui를 사용한 React 앱입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="이름을 입력하세요..." />
            </div>
            <Button className="w-full">시작하기</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
