import { HexColorConverter } from "@/components/tools/hex-color-converter";
import { ToolPage } from "@/components/tools/tool-page-layout";

export const metadata = {
  title: "HEX 색상 감지기 및 변환기 - ToolBitBox",
  description:
    "HEX 코드를 입력하거나 RGB 값을 조절하여 색상을 감지하고 식별하며, 실시간으로 다양한 색상 형식으로 변환합니다. 개발자와 디자이너를 위한 강력한 색상 도구입니다.",
};

export default function ColorPage() {
  return (
    <ToolPage
      title="HEX 색상 감지 및 변환기"
      description="RGB 값을 조절하거나 HEX 코드를 입력하여 색상을 식별하고 실시간으로 변환합니다."
    >
      <HexColorConverter />
    </ToolPage>
  );
}
