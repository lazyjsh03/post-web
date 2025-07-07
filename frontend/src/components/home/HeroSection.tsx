import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center text-center space-y-2">
            <CardTitle className="text-4xl">
              🎉 게시판 앱에 오신 것을 환영합니다!
            </CardTitle>
            <CardDescription className="text-lg">
              자유롭게 의견을 나누고 소통해보세요
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p>환영 메시지</p>
          </CardContent>

          <CardFooter className="justify-center gap-4">
            <Button>새 글 작성</Button>
            <Button variant="outline">전체 게시판 보기</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;
