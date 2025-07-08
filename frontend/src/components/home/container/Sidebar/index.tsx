import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  return (
    <Sidebar side="right">
      <SidebarHeader>
        {/* 헤더 영역 - 추후 로고나 제목 추가 가능 */}
      </SidebarHeader>

      <SidebarContent>
        {/* 카테고리 섹션 */}
        <SidebarGroup>
          <SidebarGroupLabel>카테고리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{/* 카테고리 아이템들이 들어갈 자리 */}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* 인기 태그 섹션 */}
        <SidebarGroup>
          <SidebarGroupLabel>인기 태그</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* 태그들이 들어갈 자리 */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* 푸터 영역 - 추후 추가 정보나 설정 버튼 */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
