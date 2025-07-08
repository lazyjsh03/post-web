import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  //   NavigationMenuContent,
  //   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, Plus, CircleUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const Header = () => {
  const { isInstallable, handleInstallClick } = useInstallPrompt();
  const isOnline = useOnlineStatus();
  return (
    <header className="flex justify-between h-24 items-center mr-10 ml-10 border-b-2 border-gray-500">
      <div className="flex gap-10">
        <Link to="/">
          <span className="text-6xl">게시판 앱</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="!text-3xl">
                  홈
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/posts" className="!text-3xl">
                  게시판
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/posts" className="!text-3xl">
                  인기글
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div className="flex gap-2">
          <Input type="text" placeholder="게시글 검색" />
          <Button>
            <Search />
          </Button>
        </div>
        <Button asChild>
          <Link to="/">
            <Plus />
            글쓰기
          </Link>
        </Button>
        {isInstallable && (
          <Button onClick={handleInstallClick} variant="outline">
            📱 앱 설치
          </Button>
        )}
        <Avatar className="flex h-12 w-12 items-center justify-center">
          <AvatarImage src="/user.jpg" alt="User" />
          <AvatarFallback>
            <CircleUser className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
      </div>
      {!isOnline && (
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md">
          <span className="text-sm">🔄 오프라인 모드</span>
        </div>
      )}
    </header>
  );
};

export default Header;
